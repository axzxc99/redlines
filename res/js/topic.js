const mobileStyles = ["header","mainTopicTitle","display","displayMenu","mainContain","sourceList","topicID","topicDesc","promptContainer"];
var displayOn = "";
var refreshChatInterval = null;
var promptOpen = false;
const SIDs = 
{
	"P":{
		"sources":pSources,
		"color":"red"//potentially more
	},
	"S":{
		"sources":sSources,
		"color":"blue"//potentially more
	},
	"R":{
		"sources":rTopics,
		"color":"green"//potentially more
	}
}

function switchDisplay(type,butt)
{
	const display = document.getElementById("display");
	const displayList = document.getElementById("sourceList");
	displayList.innerHTML = "";
	const displayMenu = document.getElementById("displayMenu");
	for (let input of displayMenu.children)
		input.style["box-shadow"] = "none";
	if (displayOn != type)
	{
		butt.style["box-shadow"] = "inset 0 0 5px 0 black";
		displayOn = type;
		display.style["box-shadow"] = "inset 0 0 10px 0 "+SIDs[type]["color"];
		const sources = SIDs[type]["sources"];
		if (type != "R")
		{
			for (let i=0;i<sources[0].length;i++)
			{
				const tempDiv = createElement("div",["class","sourceDiv"],["data-selected","false"]); 
				tempDiv.appendChild(createElement("img",["class","sourcePreview"],["src","../../res/misc/documents.png"]));
				const tempDesc = createElement("a",["href","#"],["class","sourceDesc"]);
				tempDesc.innerHTML = sources[0][i][1];
				tempDesc.onclick = function()
				{
					openSource(false,i,type);
					const sDivs = document.getElementsByClassName("sourceDiv");
					Array.from(sDivs).forEach((div) => {
						div.setAttribute("data-selected", "false");
					});
					tempDiv.setAttribute("data-selected","true");
				}
				tempDiv.appendChild(tempDesc);
				tempDiv.appendChild(createElement("input",["src","../../res/misc/download.png"],["type","image"],["class","openDown"],["onclick","downloadFile("+i+",'"+type+"')"]));
				displayList.appendChild(document.createElement('li').appendChild(tempDiv));
			}
			if (sources[1] !== null)
			{
				for (let i=0;i<sources[1].length;i++)
				{
					const sourcePair = sources[1][i].split("#;#");
					let baseLocation = sourcePair[0].split("/").splice(0,3).join("/");
					if (!baseLocation.includes("http://") && !baseLocation.includes("https://"))
						baseLocation = "https://"+baseLocation;
					const tempDiv = createElement("div",["class","sourceDiv"],["data-selected","false"]); 
					tempDiv.appendChild(createElement("img",["alt","Page Icon"],["class","sourcePreview"],["src",baseLocation+"/favicon.ico"]));
					const tempDesc = createElement("a",["href","#"],["class","sourceDesc"]);
					tempDesc.innerHTML = sourcePair[1];
					tempDesc.onclick = function()
					{
						openSource(true,i,type);
						const sDivs = document.getElementsByClassName("sourceDiv");
						Array.from(sDivs).forEach((div) => {
							div.setAttribute("data-selected", "false");
						});
						tempDiv.setAttribute("data-selected","true");
					}
					tempDiv.appendChild(tempDesc);
					tempDiv.appendChild(createElement("input",["src","../../res/misc/openLink.png"],["type","image"],["class","openDown"],["onclick","openLink("+i+",'"+type+"')"]));
					displayList.appendChild(createElement('li').appendChild(tempDiv));
				}
			}
			displayList.appendChild(createElement('li').appendChild(createElement("input",["class","addSourceButt"],["type","button"],["onclick","addSource('"+type+"')"],["value","Add Source"])));
		}
		else
		{
			for (const rTopic of rTopics)
			{
				const tmpDiv = createElement("div",["class","relatedDiv"]);
				const tmpA = createElement("a",["href","#"],["onclick","openTopic("+rTopic[0]+")"]);
				tmpA.innerHTML = rTopic[1];
				tmpDiv.appendChild(tmpA);
				const tmpSpan = createElement("span");
				tmpSpan.innerHTML = rTopic[0];
				tmpDiv.appendChild(tmpSpan);
				displayList.appendChild(createElement('li').appendChild(tmpDiv));
			}
			displayList.appendChild(createElement('li').appendChild(createElement("input",["class","addSourceButt"],["type","button"],["onclick","addRelated()"],["value","Add Related Topic"])));
		}
	}
	else
	{
		displayOn = "";
		display.style["box-shadow"] = "inset 0 0 10px 0 black";
		const homeTopicDiv = createElement("div",["class","homeTopicDiv"+((isMobile) ? "Mobile":"")]); 
		const backHome = createElement("input",
			["class","homeButt"+((isMobile) ? "Mobile":"")],
			["type","image"],
			["id","homeButt"],
			["title","Return Home"],
			["src","../../res/misc/home.png"]
		);
		backHome.onclick=function ()
		{
			window.open(location.origin+'/RedLines','_self');
		};
		homeTopicDiv.appendChild(backHome);
		const topicID = createElement("span",["id","topicID"],["class","topicID"+((isMobile) ? "Mobile":"")]);
		topicID.innerHTML = "ID: "+attributes[0];
		homeTopicDiv.appendChild(topicID);
		displayList.appendChild(createElement("li").appendChild(homeTopicDiv));
		const topicDesc = createElement("p",["id","topicDesc"],["class","topicDesc"+((isMobile) ? "Mobile":"")]);
		topicDesc.innerHTML = "<span>Description:</span>"+attributes[2];
		displayList.appendChild(document.createElement("li").appendChild(topicDesc));
	}
}

function openTopic(topicID)
{
	window.open("../../topics/"+topicID,"_self");
}

function openLink(index,type)
{
	
	let baseLocation = SIDs[type]["sources"][1][index].split("#;#")[0];
	if (!baseLocation.includes("http://") && !baseLocation.includes("https://"))
		baseLocation = "https://"+baseLocation;
	window.open(baseLocation,"_blank");
}

function downloadFile(index,type)
{
	window.open(type+"/"+SIDs[type]["sources"][0][index][0],"_blank");
}

function addRelated()
{
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	const POSTForm = document.getElementById("mainForm");
	promptContainer.innerHTML = "";
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	promptContainer.appendChild(createElement("input",["type", "search"],["onkeydown", "if(event.keyCode == 13) {searchRelatedTopics()}"],["id", "search"],["class", "RTSearchBar"],["name", "search"],["placeholder", "Search Topics"],["form", POSTForm.name]));
	promptContainer.appendChild(createElement("div", ["class", "searchDiv"], ["id", "searchDiv"], ["style", ""]));
	promptOpen = true;
}

function searchRelatedTopics() {
    const searchValue = encodeURIComponent(document.getElementById("search").value.trim());
    if (searchValue !== "") {
        const POSTForm = document.getElementById("mainForm");
        POSTForm.action = "../../res/php/search.php";
        POSTForm.target = "targetFrame";
        POSTForm.submit();
    }
}

function showResults(results)
{
	const resultKeys = Object.keys(results);
	const searchDiv = document.getElementById("searchDiv");
	searchDiv.innerHTML = "";
	for (const resultKey of resultKeys)
	{
		if (resultKey == attributes[0])
			continue;
		const tmpDiv = createElement("div",["class","resultDiv"]);
		const tmpA = document.createElement("a",["href","#"],[]);
		tmpA.setAttribute();
		tmpA.onclick = function() {
            if (!relateTopic(resultKey)) {
                window.alert('Topic already related!');
            }
            return false; // Prevent default action of anchor tag
        };
		tmpA.innerHTML = results[resultKey];
		tmpDiv.appendChild(tmpA);
		const tmpSpan = document.createElement("span");
		tmpSpan.innerHTML = resultKey;
		tmpDiv.appendChild(tmpSpan);
		searchDiv.appendChild(tmpDiv);
	}
	searchDiv.style["opacity"] = "1";
}

function relateTopic(ID)
{
	for (const relatedTopic of rTopics)
		if (ID == relatedTopic)
			return false;
	const mainForm = document.getElementById("mainForm");
	const input1 = document.getElementById("input1");
	const input2 = document.getElementById("input2");
	mainForm.action = "../../res/php/relateTopic.php";
	input1.value = attributes[0];
	input2.value = ID;
	mainForm.submit();
	return true;
}

function addSource(type)
{
	const isPrimary = (type=="P");
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	const POSTForm = document.getElementById("mainForm");
	POSTForm.setAttribute("action","../../res/php/addSource.php");
	document.getElementById("input1").value = isPrimary;
	document.getElementById("input2").value = attributes[0];
	const title = createElement("h2",["class","promptTitle"+((isMobile) ? "Mobile":"")]);
	title.innerHTML = "Add a "+(isPrimary ? "Primary":"Secondary")+" Source";
	promptContainer.appendChild(title);
	promptContainer.setAttribute("class",("promptContainer"+((isMobile) ? "Mobile":""))+" "+(isPrimary ? "pPrompt":"sPrompt"));
	const linkFileDiv = createElement("div",["class","linkFileDiv"+((isMobile) ? "Mobile":"")]);
	linkFileDiv.appendChild(createElement("input",["type","url"],["name","link"],["id","topicLink"],["placeholder","Source Link"],["value",""],["form",POSTForm.name],["class","topicLink"+((isMobile) ? "Mobile":"")]));
	let acceptList = "";
	const formatKeys = Object.keys(formatTypes);
	for (const key of formatKeys)
	{
		const types = formatTypes[key].split(",");
		for (const type of types)
			acceptList += "."+type+","
	}
	acceptList = acceptList.substr(0,acceptList.length-1);
	linkFileDiv.appendChild(createElement("input",["type","file"],["name","sourceFile"],["value",""],["id","sourceFile"],["form",POSTForm.name],["accept",acceptList],["class","sourceFile"+((isMobile) ? "Mobile":"")]));
	linkFileDiv.appendChild(document.createElement("hr"));
	promptContainer.appendChild(linkFileDiv);
	const sourceDesc = createElement("textarea",["class","sourceDescPrompt"+((isMobile) ? "Mobile":"")],["required",""],["style",""],["name","sDesc"],["id","sourceDescPrompt"],["placeholder","Source Description"],["form",POSTForm.name]);
	sourceDesc.addEventListener("input", function (e){
		this.style["height"] = "3.3em";
		this.style["height"] = this.scrollHeight+"px";
	});
	promptContainer.appendChild(sourceDesc);
	promptContainer.appendChild(createElement("input",["type","button"],["value","Submit Source"],["onclick","submitSource()"],["class","topicSubButt"+((isMobile) ? "Mobile":"")]));
	promptOpen = true;
}

function submitSource()
{
	let canSubmit = true;
	const topicLink = document.getElementById('topicLink');
	const sourceFile = document.getElementById('sourceFile');
	const sourceDescPrompt = document.getElementById('sourceDescPrompt');
	if ((topicLink === undefined || topicLink === null) || (sourceFile === undefined || sourceFile === null))
		canSubmit = false;
	canSubmit = ((topicLink.value.trim() != "" || sourceFile.value != "") && sourceDescPrompt.value.trim() != "");
	if (!canSubmit)
	{
		window.alert('Title and Description are REQUIRED.\\nAlso you must use a link or file to add a source!');
		return;
	}
	topicLink.value = encodeURIComponent(topicLink.value);
	document.getElementById('mainForm').submit();
	closePrompt();
}

function closePrompt()
{
	if (!promptOpen)
		return;
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	promptContainer.innerHTML = "";
	promptContainer.setAttribute("class","promptContainer"+((isMobile) ? "Mobile":""));
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	promptOpen = false;
}

function openSource(linkoFile,index,type)
{
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	const nextButt = document.getElementById("nextButt");
	nextButt.onclick = function()
	{
 		const sDivs = document.getElementsByClassName("sourceDiv");
		for (let i=0;i<sDivs.length-1;i++)
		{
			if (sDivs[i].getAttribute("data-selected") == "true")
			{
				sDivs[i].setAttribute("data-selected","false");
				closePrompt();
				sDivs[i+1].children[1].click();
				break;
			}
		}
	}
	nextButt.style["display"] = "block";
	const prevButt = document.getElementById("prevButt");
	prevButt.onclick = function()
	{
 		const sDivs = document.getElementsByClassName("sourceDiv");
		for (let i=1;i<sDivs.length;i++)
		{
			if (sDivs[i].getAttribute("data-selected") == "true")
			{
				sDivs[i].setAttribute("data-selected","false");
				closePrompt();
				sDivs[i-1].children[1].click();
				break;
			}
		}
	}
	prevButt.style["display"] = "block";
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	const sourceArr = SIDs[type]["sources"][((linkoFile) ? 1:0)];
	const previewDiv = createElement("div",["class","previewDiv"]);
	let preview = null;
	let desc = "";
	let urlPath = "";
	if (linkoFile)
	{
		urlPath = sourceArr[index].split("#;#")[0];
		desc = sourceArr[index].split("#;#")[1];
		if (!urlPath.includes("http://") && !urlPath.includes("https://"))
			urlPath = "https://"+urlPath;
		preview = createElement("iframe",["class","previewIframe"],["allowfullscreen","false"],["scrolling","no"],["allowpaymentrequest","false"],["loading","lazy"],["src",urlPath]);
	}
	else
	{
		desc = sourceArr[index][1];
		urlPath = type+"/"+sourceArr[index][0];
		const formatKeys = Object.keys(formatTypes);
		let formatType = "";
		for (const key of formatKeys)
		{
			const types = formatTypes[key].split(",");
			for (const type of types)
			{
				if (sourceArr[index][0].includes(type))
				{
					formatType = key;
					break;
				}
			}
			if (formatType != "")
				break;
		}
		if (formatType == "image")
		{
			preview = createElement("img",
				["class","previewImg"],
				["src",urlPath]
			);
		}
		else if (formatType == "video")
		{
			preview = createElement("video",
				["class","previewVid"],
				["src",urlPath],
				["controls",""],
				["autoplay",""],
				["loop",""],
				["muted",""]
			);
		}
		else if (formatType == "audio")
		{
			preview = createElement("audio",
				["class","previewAud"],
				["src",urlPath],
				["controls",""],
				["autoplay",""],
				["loop",""],
				["muted",""]
			);
		}
		else if (formatType == "other")
		{
			preview = createElement("embed",
				["src",urlPath],
				["class","previewOth"],
			);
		}
	}
	preview.setAttribute("id","preview");
	previewDiv.appendChild(preview);
	promptContainer.appendChild(previewDiv);
	const descDiv = createElement("div",["class","descDiv"],["id","descDiv"]);
	const descP = createElement("p",["class","descP"],["id","descP"],["style",""]);
	descP.innerHTML = desc;
	descDiv.appendChild(descP);
	promptContainer.appendChild(descDiv);
	centerDescP(descDiv,descP);
	const sourceButtMenu = createElement("div",["class","sourceButtMenu"]);
	sourceButtMenu.appendChild(createElement("input",["src","../../res/misc/"+((linkoFile) ? "openLink.png":"download.png")],["type","image"],["class","openDownSource"],["onclick",((linkoFile) ? "openLink":"downloadFile")+"("+index+",'"+type+"')"]));//add more buttons for sharing, relating to other topics and more
	promptContainer.appendChild(sourceButtMenu);
	promptOpen = true;
}


function centerDescP(div,p)
{
	p.style["height"] = (div.clientHeight - 30)+"px";
}

function promptLogin()
{
	const aButtDiv = document.getElementById("accountDiv");
	if (loggedIn)
	{
		const logoff = document.getElementById("logoff");
		if (aButtDiv.style["opacity"] == "0")
		{
			logoff.disabled = false;
			aButtDiv.style["opacity"] = "1";
		}
		else
		{
			logoff.disabled = true;
			aButtDiv.style["opacity"] = "0";
		}
	}
	else
	{
		const login = document.getElementById("tryLoginButt");
		const register = document.getElementById("registerButt");
		if (aButtDiv.style["opacity"] == "0")
		{
			login.disabled = false;
			register.disabled = false;
			aButtDiv.style["opacity"] = "1";
		}
		else
		{
			login.disabled = true;
			register.disabled = true;
			aButtDiv.style["opacity"] = "0";
		}
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function refreshChat()
{
	document.getElementById("subForm").submit();
}

function updateChat(chatLog)
{
	//console.log(chatLog);
	//return;
	const commentChat = document.getElementById("commentChat");
	commentChat.innerHTML = "";
	for (const chat of chatLog)
	{
		if (chat.length < 4)
			continue;
		const timestamp = new Date(parseInt(chat[0]));
		const chatBubble = createElement("div",["class","chatBubble"],["style","background-color:"+chat[3]+"80"],["title",timestamp.toString()]);
		const user = createElement("span",["class","chatUser"]);
		user.innerHTML = chat[1];
		chatBubble.appendChild(user);
		const chatMess = createElement("span",["class","chatMess"]);
		chatMess.innerHTML = chat[2];
		chatBubble.appendChild(chatMess);
		commentChat.appendChild(chatBubble);
	}
}

function load()
{
	document.title = attributes[1];
	for (const style of mobileStyles)
		document.getElementById(style).setAttribute("class",style+((isMobile) ? "Mobile":""));
	document.getElementById("homeButt").onclick= function ()
	{
		window.open(location.origin+'/RedLines','_self');
	};
	refreshChat();
	refreshChatInterval = setInterval(refreshChat,30000);
	const mainForm = document.getElementById("mainForm");
	const login = document.getElementById("tryLoginButt");
	const register = document.getElementById("registerButt");
	if (loggedIn)
	{
		const commentChat = document.getElementById("commentChat");
		commentChat.style["height"] = "calc(85% - 2em - 20px)";
		const respondDiv = document.getElementById("respondDiv");
		respondDiv.style["height"] = "15%";
		const textBox = document.getElementById("textBox");
		textBox.disabled = false;
		const sendButton = document.getElementById("sendButton");
		sendButton.disabled = false;
		sendButton.onclick = function()
		{
			mainForm.action = "../../res/php/sendMess.php";
			document.getElementById("input1").value = JSON.stringify(account);
			const textBox = document.getElementById("textBox");
			document.getElementById("input2").value = encodeURIComponent(textBox.value);
			document.getElementById("input3").value = attributes[0];
			mainForm.submit();
			textBox.value = "";
		}
		const logButt = document.getElementById("loginButt");
		logButt.title = account.username;
		logButt.style["background-color"] = account.color;
		const accountDiv = document.getElementById("accountDiv");
		accountDiv.innerHTML = "";
		const accountKeys = Object.keys(account);
		for (const detail of accountKeys)
		{
			const tmpInfoDiv = document.createElement("div");
			const tmpDetailLabel = createElement("span",["class","accountInfoLabel"]);
			tmpDetailLabel.innerHTML = detail;
			const tmpDetail = createElement("span",["class","accountInfo"]);
			tmpDetail.innerHTML = account[detail];
			tmpInfoDiv.appendChild(tmpDetailLabel);
			tmpInfoDiv.appendChild(tmpDetail);
			accountDiv.appendChild(tmpInfoDiv);
		}
		const logoff = createElement("input",
			["type","button"],
			["id","logoff"],
			["disabled",""],
			["class","logoff"],
			["value","Log Off"],
		);
		logoff.onclick = function ()
		{
			mainForm.action = "../../res/php/logoff.php";
			mainForm.submit();
		}
		accountDiv.appendChild(logoff);
	}
	else
	{
		login.onclick = function ()
		{
			mainForm.action = "../../res/php/auth.php";
			mainForm.submit();
		}
		register.onclick = function ()
		{
			const promptBG = document.getElementById("promptBGContainer");
			const promptContainer = document.getElementById("promptContainer");
			promptBG.style["z-index"] = (promptOpen ? "-100":"100");
			promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
			mainForm.action = "../../res/php/register.php";
			const regDiv = createElement("div",["class","regDiv"]);
			regDiv.appendChild(createElement("input",["required",""],["maxlength","15"],["name","user"],["form",mainForm.name],["type","text"],["placeholder","Username"],["id","regUser"],["value",""]));
			regDiv.appendChild(createElement("input",
				["type","password"],
				["required",""],
				["maxlength","30"],
				["minlength","8"],
				["form",mainForm.name],
				["name","pass"],
				["id","regPass"],
				["placeholder","Password"],
				["value",""]
			));
			const verPassInput = createElement("input",
				["type","password"],
				["required",""],
				["maxlength","30"],
				["minlength","8"],
				["id","verPass"],
				["placeholder","Re-type Password"],
				["value",""],
				["style",""]
			);
			verPassInput.onkeyup = function()
			{
				const pass = document.getElementById("regPass");
				this.style["background-color"] = (pass.value == this.value) ? "transparent":"rgb(255 0 0 / 50%)";
			}
			regDiv.appendChild(verPassInput);
			const colorDiv = createElement("div",["class","colorDiv"]);
			const colorLabel = createElement("label",["for","color"]);
			colorLabel.innerHTML = "Choose a color: ";
			colorDiv.appendChild(colorLabel);
			colorDiv.appendChild(createElement("input",["type","color"],["id","color"],["form",mainForm.name],["name","color"],["value",""]));
			regDiv.appendChild(colorDiv);
			promptContainer.innerHTML = "";
			promptContainer.style["padding"] = "10px";
			promptContainer.style["width"] = "fit-content";
			promptContainer.appendChild(regDiv);
			const submitLogin = createElement("input",
				["type","button"],
				["value","Register"],
				["class","regSubmit"],
				["form",mainForm.name]
			);
			submitLogin.onclick = function()
			{
				let canSubmit = true;
				const passRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]+$/; 
				const userRegex = /^[a-zA-Z0-9]+$/;
				const regPass = document.getElementById("regPass");
				const verPass = document.getElementById("verPass");
				const regUser = document.getElementById("regUser");
				canSubmit = (
					(regPass.value == verPass.value) &&
					(passRegex.test(regPass.value)) &&
					(userRegex.test(regUser.value)) &&
					(regPass.value.length >= 8) &&
					(regUser.value.length <= 15) &&
					(regPass.value.length <= 30)
				);
				if (!canSubmit)
					window.alert("Your password must contain:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least 8 characters\n- At least one of the following symbols: ! @ # $ % ^ & * ( ) _ + { } [ ] : ; < > , . ? / ~ `");
				else
					mainForm.submit();
				//regPass
			}
			promptContainer.appendChild(submitLogin);
			promptOpen = true;
		}
	}
}
