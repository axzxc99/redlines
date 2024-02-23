window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)| iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check;}

const isMobile = window.mobilecheck();
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
	fileInput.setAttribute("accept",".pdf,.png,.mp3,.mp4,.jpg,.jpeg");
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
	subTopic.setAttribute("onclick","if (!canSubmit()) {window.alert('Title and Description are REQUIRED.\\nAlso you must use a link or file to create a topic!')}else{document.getElementById('POSTForm').submit();closePrompt()}");
	subTopic.setAttribute("class","topicSubButt"+((isMobile) ? "Mobile":""));
	promptContainer.appendChild(subTopic);
	//document.getElementById("POSTInput1").value = "";//title
	promptOpen = true;
}

function canSubmit()
{
	const topicLink = document.getElementById('topicLink');
	const sourceFile = document.getElementById('sourceFile');
	const topicTitle = document.getElementById('topicTitle');
	const topicDesc = document.getElementById('topicDesc');
	const sourceDesc = document.getElementById('sourceDesc');
	if ((topicLink === undefined || topicLink === null) || (sourceFile === undefined || sourceFile === null))
		return false;
	return ((topicLink.value.trim() != "" || sourceFile.value != "") && topicTitle.value.trim() != "" && topicDesc.value.trim() != "" || sourceDesc.value.trim() != "");
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

function load()
{
	for (const style of mobileStyles)
		document.getElementById(style).setAttribute("class",style+((isMobile) ? "Mobile":""));
	console.log("I'm better than you");
}