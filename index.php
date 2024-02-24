<?php
	//echo "♠";
	$topicIDs = array_values(array_diff(scandir("topics"), array('.', '..')));
	$topicCount = count($topicIDs);
	$loadLimit = 10;
	$topics = array();
	for ($i = 0; ($i < count($topicIDs) && $i <= $loadLimit);$i++)
	{
		$attFile = fopen("topics/" . $topicIDs[$i] . "/.htAttributes","r");
		fgets($attFile);
		$tmpTitle = trim(fgets($attFile));
		$tmpDesc = trim(fgets($attFile));
		$topics[$topicIDs[$i]] = array($tmpTitle,$tmpDesc);
		fclose($attFile);
	}
	echo "<script>const topics = " . json_encode($topics) . ";const topicCount = $topicCount</script>";
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Red Lines - Connect the Dots</title>
		<link rel="stylesheet" type="text/css" href="res/misc/style.css">
		<script src="res/js/init.js"></script>
	</head>
	<body>
		<div id="bg"></div>
		<input type="search" id="topicSearch" placeholder="Search Topics" onkeydown="if(event.keyCode == 13) {searchTopics()}" name="search" form="GETForm" >
		<div id="startSourceDiv">
			<div class="startSource">
				<p class="startTitle pSource">Start topic with a <span>Primary Source</span></p>
				<input type="button" value="+" onclick="sourcePrompt(true)">
			</div><div class="startSource">
				<p class="startTitle sSource">Start topic with a <span>Secondary Source</span></p>
				<input type="button" value="+" onclick="sourcePrompt(false)">
			</div>
		</div>
		<div id="topicsPull">
			<input style="" id="TPHandle" type="button" value="=" onclick="toggleTP()" data-toggled="false">
			<div style="" id="TPMain"></div>
		</div>
		<div style="z-index:-100" class="promptBGContainer" onclick="if (event.target === this) {closePrompt()}" id="promptBGContainer">
			<div id="promptContainer"></div>
		</div>
		<form style="display:none" name="GETForm" target="_self" id="GETForm" method="GET" action=""></form>
		<form enctype="multipart/form-data" target="targetFrame" style="display:none" name="POSTForm" id="POSTForm" method="POST" action="">
			<input type="hidden" name="POSTInput1" value="" id="POSTInput1" form="POSTForm">
			<input type="hidden" name="POSTInput2" value="" id="POSTInput2" form="POSTForm">
		</form>
		<iframe id="targetFrame" name="targetFrame"></iframe>
		<script>load()</script>
	</body>
</html>