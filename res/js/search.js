const mobileStyles = ["resultsContainer","searchTitle","homeButt"];
const resultKeys = Object.keys(results);

function openTopic(ID)
{
	window.open("topics/"+ID,"_self");
}

function load()
{	
	const searchTitle = document.getElementById("searchTitle");
	searchTitle.innerHTML = "Results for<br>'"+query+"'";
	document.title="Search - "+query;
	const resultsContainer = document.getElementById("resultsContainer");
	if (resultKeys.length > 0)
	{
		for (const resultKey of resultKeys)
		{
			const tmpDiv = document.createElement("div");
			tmpDiv.setAttribute("class","resultDiv");
			const tmpA = document.createElement("a");
			tmpA.setAttribute("href","#");
			tmpA.setAttribute("onclick","openTopic("+resultKey+")");
			tmpA.innerHTML = results[resultKey];
			tmpDiv.appendChild(tmpA);
			const tmpSpan = document.createElement("span");
			tmpSpan.innerHTML = resultKey;
			tmpDiv.appendChild(tmpSpan);
			resultsContainer.appendChild(tmpDiv);
		}
	}
	else
	{
		const tmpSpan = document.createElement("span");
		tmpSpan.innerHTML = "No Results!";
		tmpSpan.setAttribute("class","noResults");
		resultsContainer.appendChild(tmpSpan);
	}
	for (const style of mobileStyles)
		document.getElementById(style).setAttribute("class",style+((isMobile) ? "Mobile":""));
}
