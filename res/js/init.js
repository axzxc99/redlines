const mobileStyles = ["topicSearch","startSourceDiv","TPHandle","TPMain","promptContainer","targetFrame"];
var promptOpen = false;

function sourcePrompt(isPrimary)
{
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	const POSTForm = document.getElementById("POSTForm");
	POSTForm.setAttribute("action","res/php/startTopic.php");
	document.getElementById("POSTInput1").value = isPrimary;
	const title = document.createElement("h2");
	title.setAttribute("class","promptTitle"+((isMobile) ? "Mobile":""));
	title.innerHTML = "Start with a  "+(isPrimary ? "Primary":"Secondary")+" Source";
	promptContainer.appendChild(title);
	promptContainer.setAttribute("class",promptContainer.getAttribute("class")+" "+(isPrimary ? "pPrompt":"sPrompt"));
	const titleDescDiv = document.createElement("div");
	titleDescDiv.setAttribute("class","titleDescDiv"+((isMobile) ? "Mobile":""));
	const topicTitle = document.createElement("input");
	topicTitle.setAttribute("type","text");
	topicTitle.setAttribute("required","");
	topicTitle.setAttribute("name","title");
	topicTitle.setAttribute("id","topicTitle");
	topicTitle.setAttribute("form",POSTForm.name);
	topicTitle.setAttribute("placeholder","Topic Title");
	topicTitle.setAttribute("class","topicTitle"+((isMobile) ? "Mobile":""));
	titleDescDiv.appendChild(topicTitle);
	titleDescDiv.appendChild(document.createElement("hr"));
	const topicDesc = document.createElement("textarea");
	topicDesc.setAttribute("class","topicDesc"+((isMobile) ? "Mobile":""));
	topicDesc.setAttribute("required","");
	topicDesc.setAttribute("style","");
	topicDesc.setAttribute("name","desc");
	topicDesc.setAttribute("id","topicDesc");
	topicDesc.addEventListener("input", function (e){
		this.style["height"] = "3.3em";
		this.style["height"] = this.scrollHeight+"px";
	});
	topicDesc.setAttribute("placeholder","Topic Description");
	topicDesc.setAttribute("form",POSTForm.name);
	titleDescDiv.appendChild(topicDesc);
	promptContainer.appendChild(titleDescDiv);
	const linkFileDiv = document.createElement("div");
	linkFileDiv.setAttribute("class","linkFileDiv"+((isMobile) ? "Mobile":""));
	const topicLink = document.createElement("input");
	topicLink.setAttribute("type","url");
	topicLink.setAttribute("name","link");
	topicLink.setAttribute("id","topicLink");
	topicLink.setAttribute("placeholder","Source Link");
	topicLink.setAttribute("value","");
	topicLink.setAttribute("form",POSTForm.name);
	topicLink.setAttribute("class","topicLink"+((isMobile) ? "Mobile":""));
	linkFileDiv.appendChild(topicLink);
	linkFileDiv.appendChild(document.createElement("hr"));
	const fileInput = document.createElement("input");
	fileInput.setAttribute("type","file");
	fileInput.setAttribute("name","sourceFile");
	fileInput.setAttribute("value","");
	fileInput.setAttribute("id","sourceFile");
	fileInput.setAttribute("form",POSTForm.name);
	let acceptList = "";
	const formatKeys = Object.keys(formatTypes);
	for (const key of formatKeys)
	{
		const types = formatTypes[key].split(",");
		for (const type of types)
			acceptList += "."+type+","
	}
	acceptList = acceptList.substr(0,acceptList.length-1);
	fileInput.setAttribute("accept",acceptList);
	fileInput.setAttribute("class","sourceFile"+((isMobile) ? "Mobile":""));
	linkFileDiv.appendChild(fileInput);
	linkFileDiv.appendChild(document.createElement("hr"));
	const sourceDesc = document.createElement("textarea");
	sourceDesc.setAttribute("class","sourceDesc"+((isMobile) ? "Mobile":""));
	sourceDesc.setAttribute("required","");
	sourceDesc.setAttribute("style","");
	sourceDesc.setAttribute("name","sDesc");
	sourceDesc.setAttribute("id","sourceDesc");
	sourceDesc.addEventListener("input", function (e){
		this.style["height"] = "3.3em";
		this.style["height"] = this.scrollHeight+"px";
	});
	sourceDesc.setAttribute("placeholder","Source Description");
	sourceDesc.setAttribute("form",POSTForm.name);
	linkFileDiv.appendChild(sourceDesc);
	promptContainer.appendChild(linkFileDiv);
	const subTopic = document.createElement("input");
	subTopic.setAttribute("type","button");
	subTopic.setAttribute("value","Submit Topic");
	subTopic.setAttribute("onclick","submitSource()");
	subTopic.setAttribute("class","topicSubButt"+((isMobile) ? "Mobile":""));
	promptContainer.appendChild(subTopic);
	//document.getElementById("POSTInput1").value = "";//title
	promptOpen = true;
}

function submitSource()
{
	let canSubmit = true;
	const topicLink = document.getElementById('topicLink');
	const sourceFile = document.getElementById('sourceFile');
	const topicTitle = document.getElementById('topicTitle');
	const topicDesc = document.getElementById('topicDesc');
	const sourceDesc = document.getElementById('sourceDesc');
	if ((topicLink === undefined || topicLink === null) || (sourceFile === undefined || sourceFile === null))
		canSubmit = false;
	canSubmit = ((topicLink.value.trim() != "" || sourceFile.value != "") && topicTitle.value.trim() != "" && topicDesc.value.trim() != "" && sourceDesc.value.trim() != "");
	if (!canSubmit)
	{
		window.alert('Title and Description are REQUIRED.\\nAlso you must use a link or file to create a topic!');
		return;
	}
	topicLink.value = encodeURIComponent(topicLink.value);
	document.getElementById('POSTForm').submit();
	closePrompt();
}

function closePrompt()
{
	const promptBG = document.getElementById("promptBGContainer");
	const promptContainer = document.getElementById("promptContainer");
	promptContainer.innerHTML = "";
	promptContainer.setAttribute("class","promptContainer"+((isMobile) ? "Mobile":""));
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	promptOpen = false;
}

function searchTopics()
{
	const topicSearch = document.getElementById("topicSearch");
	const getForm = document.getElementById("GETForm");
	const value = encodeURIComponent(topicSearch.value.trim());
	if (value != "")
	{
		getForm.setAttribute("action","search.php");
		getForm.submit();
	}
}

function toggleTP()
{
	const TP = document.getElementById("TPMain");
	const TPHandle = document.getElementById("TPHandle");
	const isClosed = ((TPHandle.getAttribute("data-toggled") == "false") ? true:false);
	TPHandle.style["bottom"] = (isClosed ? (TP.clientHeight+"px"):"0px");
	TP.style["bottom"] = (isClosed ? "0px":("-"+TP.clientHeight+"px"));
	TPHandle.setAttribute("data-toggled",(isClosed ? "true":"false"));
}

function openTopic(ID)
{
	window.open("topics/"+ID,"_self");
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

function load()
{
	for (const style of mobileStyles)
		document.getElementById(style).setAttribute("class",style+((isMobile) ? "Mobile":""));
	const TPMain = document.getElementById("TPMain");
	topicValues = Object.values(topics);
	topicKeys = Object.keys(topics);
	for (let i=0;i<topicValues.length;i++)
	{
		const tmpDiv = document.createElement("div");
		tmpDiv.setAttribute("class","topicListDiv");
		const tmpA = document.createElement("a");
		tmpA.setAttribute("href","#");
		tmpA.setAttribute("title",topicValues[i][1]);
		tmpA.setAttribute("onclick","openTopic("+topicKeys[i]+")");
		tmpA.innerHTML = topicValues[i][0];
		const tmpSpan = document.createElement("span");
		tmpSpan.innerHTML = topicKeys[i];
		tmpA.appendChild(tmpSpan);
		tmpDiv.appendChild(tmpA);
		TPMain.appendChild(tmpDiv);
	}	
	const mainForm = document.getElementById("POSTForm");
	const login = document.getElementById("tryLoginButt");
	const register = document.getElementById("registerButt");
	if (loggedIn)
	{
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
			mainForm.action = "res/php/logoff.php";
			mainForm.submit();
		}
		accountDiv.appendChild(logoff);
	}
	else
	{
		login.onclick = function ()
		{
			mainForm.action = "res/php/auth.php";
			mainForm.submit();
		}
		register.onclick = function ()
		{
			const promptBG = document.getElementById("promptBGContainer");
			const promptContainer = document.getElementById("promptContainer");
			promptBG.style["z-index"] = (promptOpen ? "-100":"100");
			promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
			mainForm.action = "res/php/register.php";
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
