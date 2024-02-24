window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)| iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check;}

const isMobile = window.mobilecheck();
const mobileStyles = ["homeButt","header","mainTopicTitle","display","displayMenu","mainContain","sourceList","topicID","topicDesc","promptContainer"];
var displayOn = "";
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
		"sources":relatedTopics,
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
		if (sources !== null)
		{
			for (let i=0;i<sources[0].length;i++)
			{
				const tempDiv = document.createElement("div");
				tempDiv.setAttribute("class","sourceDiv"); 
				const tempPreview = document.createElement("img");
				tempPreview.setAttribute("class","sourcePreview");
				tempPreview.setAttribute("src","../../res/misc/documents.png");
				tempDiv.appendChild(tempPreview);
				const tempDesc = document.createElement("a");
				tempDesc.innerHTML = sources[0][i][1];
				tempDesc.setAttribute("onclick","openSource(false,"+i+",'"+type+"')")
				tempDesc.setAttribute("href","#");
				tempDesc.setAttribute("class","sourceDesc")
				tempDiv.appendChild(tempDesc);
				const tempOpen = document.createElement("input");
				tempOpen.setAttribute("src","../../res/misc/download.png");
				tempOpen.setAttribute("type","image");
				tempOpen.setAttribute("class","openDown");
				tempOpen.setAttribute("onclick","downloadFile("+i+",'"+type+"')");
				tempDiv.appendChild(tempOpen);
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
					const tempDiv = document.createElement("div");
					tempDiv.setAttribute("class","sourceDiv");
					const tempPreview = document.createElement("img");
					tempPreview.setAttribute("alt","Page Icon");
					tempPreview.setAttribute("class","sourcePreview");
					tempPreview.setAttribute("src",baseLocation+"/favicon.ico");
					tempDiv.appendChild(tempPreview);
					const tempDesc = document.createElement("a");
					tempDesc.innerHTML = sourcePair[1];
					tempDesc.setAttribute("onclick","openSource(true,"+i+",'"+type+"')")
					tempDesc.setAttribute("href","#");
					tempDesc.setAttribute("class","sourceDesc")
					tempDiv.appendChild(tempDesc);
					const tempOpen = document.createElement("input");
					tempOpen.setAttribute("src","../../res/misc/openLink.png");
					tempOpen.setAttribute("type","image");
					tempOpen.setAttribute("class","openDown");
					tempOpen.setAttribute("onclick","openLink("+i+",'"+type+"')");
					tempDiv.appendChild(tempOpen);
					displayList.appendChild(document.createElement('li').appendChild(tempDiv));
				}
			}
		}
		if (type != "R")
		{
			const addSourceButt = document.createElement("input");
			addSourceButt.setAttribute("class","addSourceButt");
			addSourceButt.setAttribute("type","button");
			addSourceButt.setAttribute("onclick","addSource('"+type+"')");
			addSourceButt.setAttribute("value","Add Source");
			displayList.appendChild(document.createElement('li').appendChild(addSourceButt));
		}
		else
		{
			const addRelatedButt = document.createElement("input");
			addRelatedButt.setAttribute("class","addSourceButt");
			addRelatedButt.setAttribute("type","button");
			addRelatedButt.setAttribute("onclick","addRelated()");
			addRelatedButt.setAttribute("value","Add Related Topic");
			displayList.appendChild(document.createElement('li').appendChild(addRelatedButt));
		}
	}
	else
	{
		displayOn = "";
		display.style["box-shadow"] = "inset 0 0 10px 0 black";
		const topicID = document.createElement("span");
		topicID.innerHTML = "ID: "+attributes[0];
		topicID.setAttribute("id","topicID");
		topicID.setAttribute("class","topicID"+((isMobile) ? "Mobile":""));
		displayList.appendChild(document.createElement("li").appendChild(topicID));
		const topicDesc = document.createElement("p");
		topicDesc.innerHTML = "<span>Description:</span>"+attributes[2];
		topicDesc.setAttribute("id","topicDesc");
		topicDesc.setAttribute("class","topicDesc"+((isMobile) ? "Mobile":""));
		displayList.appendChild(document.createElement("li").appendChild(topicDesc));
	}
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
	const searchBar = document.createElement("input");
	searchBar.setAttribute("type","search");
	searchBar.setAttribute("onkeydown","if(event.keyCode == 13) {searchRelatedTopics()}");
	searchBar.setAttribute("id","search");
	searchBar.setAttribute("class","RTSearchBar");
	searchBar.setAttribute("name","search");
	searchBar.setAttribute("placeholder","Search Topics");
	searchBar.setAttribute("form",POSTForm.name);
	promptContainer.appendChild(searchBar);
	const searchDiv = document.createElement("div");
	searchDiv.setAttribute("class","searchDiv");
	searchDiv.setAttribute("id","searchDiv");
	searchDiv.setAttribute("style","");
	promptContainer.appendChild(searchDiv);
	promptOpen = true;
}

function searchRelatedTopics()
{
	const search = document.getElementById("search");
	const value = encodeURIComponent(search.value.trim());
	if (value != "")
	{
		const POSTForm = document.getElementById("mainForm");
		POSTForm.setAttribute("action","../../res/php/search.php");
		POSTForm.setAttribute("target","targetFrame");
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
		const tmpDiv = document.createElement("div");
		tmpDiv.setAttribute("class","resultDiv");
		const tmpA = document.createElement("a");
		tmpA.setAttribute("href","#");
		tmpA.setAttribute("onclick","relateTopic("+resultKey+")");
		tmpA.innerHTML = results[resultKey];
		tmpDiv.appendChild(tmpA);
		const tmpSpan = document.createElement("span");
		tmpSpan.innerHTML = resultKey;
		tmpDiv.appendChild(tmpSpan);
		searchDiv.appendChild(tmpDiv);
	}
	document.getElementById("searchDiv").style["opacity"] = "1";
}

function relateTopic(ID)
{}

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
	const title = document.createElement("h2");
	title.setAttribute("class","promptTitle"+((isMobile) ? "Mobile":""));
	title.innerHTML = "Add a "+(isPrimary ? "Primary":"Secondary")+" Source";
	promptContainer.appendChild(title);
	promptContainer.setAttribute("class",("promptContainer"+((isMobile) ? "Mobile":""))+" "+(isPrimary ? "pPrompt":"sPrompt"));
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
	const fileInput = document.createElement("input");
	fileInput.setAttribute("type","file");
	fileInput.setAttribute("name","sourceFile");
	fileInput.setAttribute("value","");
	fileInput.setAttribute("id","sourceFile");
	fileInput.setAttribute("form",POSTForm.name);
	fileInput.setAttribute("accept",".pdf,.png,.mp3,.mp4,.jpg,.jpeg");
	fileInput.setAttribute("class","sourceFile"+((isMobile) ? "Mobile":""));
	linkFileDiv.appendChild(fileInput);
	linkFileDiv.appendChild(document.createElement("hr"));
	promptContainer.appendChild(linkFileDiv);
	const sourceDesc = document.createElement("textarea");
	sourceDesc.setAttribute("class","sourceDescPrompt"+((isMobile) ? "Mobile":""));
	sourceDesc.setAttribute("required","");
	sourceDesc.setAttribute("style","");
	sourceDesc.setAttribute("name","sDesc");
	sourceDesc.setAttribute("id","sourceDescPrompt");
	sourceDesc.addEventListener("input", function (e){
		this.style["height"] = "3.3em";
		this.style["height"] = this.scrollHeight+"px";
	});
	sourceDesc.setAttribute("placeholder","Source Description");
	sourceDesc.setAttribute("form",POSTForm.name);
	promptContainer.appendChild(sourceDesc);
	const subTopic = document.createElement("input");
	subTopic.setAttribute("type","button");
	subTopic.setAttribute("value","Submit Source");
	subTopic.setAttribute("onclick","submitSource()");
	subTopic.setAttribute("class","topicSubButt"+((isMobile) ? "Mobile":""));
	promptContainer.appendChild(subTopic);
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
	promptBG.style["z-index"] = (promptOpen ? "-100":"100");
	promptBG.style["filter"] = (promptOpen ? "opacity(0)":"opacity(1)");
	const sourceArr = SIDs[type]["sources"][((linkoFile) ? 1:0)];
	const previewDiv = document.createElement("div");
	previewDiv.setAttribute("class","previewDiv");
	let preview = null;
	let desc = "";
	let urlPath = "";
	if (linkoFile)
	{
		urlPath = sourceArr[index].split("#;#")[0];
		desc = sourceArr[index].split("#;#")[1];
		preview = document.createElement("iframe");
		preview.setAttribute("class","previewIframe");
		preview.setAttribute("allowfullscreen","false");
		preview.setAttribute("scrolling","no");
		preview.setAttribute("allowpaymentrequest","false");
		preview.setAttribute("loading","lazy");
		if (!urlPath.includes("http://") && !urlPath.includes("https://"))
			urlPath = "https://"+urlPath;
		preview.setAttribute("src",urlPath);
	}
	else
	{
		desc = sourceArr[index][1];
		urlPath = type+"/"+sourceArr[index][0];
		if (sourceArr[index][0].includes(".png"))//image
		{
			preview = document.createElement("img");
			preview.setAttribute("class","previewImg");
			preview.setAttribute("src",urlPath);
		}
	}
	preview.setAttribute("id","preview");
	previewDiv.appendChild(preview);
	promptContainer.appendChild(previewDiv);
	const descDiv = document.createElement("div");
	descDiv.setAttribute("class","descDiv");
	descDiv.setAttribute("id","descDiv");
	const descP = document.createElement("p");
	descP.setAttribute("class","descP");
	descP.setAttribute("id","descP");
	descP.setAttribute("style","");
	descP.innerHTML = desc;
	descDiv.appendChild(descP);
	promptContainer.appendChild(descDiv);
	centerDescP(descDiv,descP);
	const sourceButtMenu = document.createElement("div");
	sourceButtMenu.setAttribute("class","sourceButtMenu");
	const openButt = document.createElement("input");
	openButt.setAttribute("src","../../res/misc/"+((linkoFile) ? "openLink.png":"download.png"));
	openButt.setAttribute("type","image");
	openButt.setAttribute("class","openDownSource");
	openButt.setAttribute("onclick",((linkoFile) ? "openLink":"downloadFile")+"("+index+",'"+type+"')");
	sourceButtMenu.appendChild(openButt);//add more buttons for sharing, relating to other topics and more
	promptContainer.appendChild(sourceButtMenu);
	promptOpen = true;
}

function centerDescP(div,p)
{
	p.style["height"] = (div.clientHeight - 30)+"px";
}

function load()
{
	document.getElementById("mainTopicTitle").innerHTML = attributes[1];
	document.title = attributes[1];
	const display = document.getElementById("display");
	const displayList = document.getElementById("sourceList");
	const topicID = document.createElement("span");
	topicID.innerHTML = "ID: "+attributes[0];
	topicID.setAttribute("id","topicID");
	displayList.appendChild(document.createElement("li").appendChild(topicID));
	const topicDesc = document.createElement("p");
	topicDesc.innerHTML = "<span>Description:</span>"+attributes[2];
	topicDesc.setAttribute("id","topicDesc");
	displayList.appendChild(document.createElement("li").appendChild(topicDesc));
	for (const style of mobileStyles)
		document.getElementById(style).setAttribute("class",style+((isMobile) ? "Mobile":""));
}