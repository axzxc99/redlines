<?php
	//echo "♠";
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Red Lines - Connect the Dots</title>
		<link rel="stylesheet" type="text/css" href="res/misc/style.css">
		<script src="res/js/init.js"></script>
	</head>
	<body onload="load()">
		<div id="bg"></div>
		<input type="search" id="topicSearch" placeholder="Search Topics" onkeydown="if(event.keyCode == 13) {searchTopics()}" name="topicSearch" form="searchForm" >
		<div id="startSourceDiv">
			<div class="startSource">
				<p class="startTitle pSource">Start a topic with a <span>Primary Source</span></p>
				<input type="button" value="+" onclick="sourcePrompt(true)">
			</div><div class="startSource">
				<p class="startTitle sSource">Start a topic with a <span>Secondary Source</span></p>
				<input type="button" value="+" onclick="sourcePrompt(false)">
			</div>
		</div>
		<div id="topicsPull">
			<input style="" id="TPHandle" type="button" value="=" onclick="toggleTP()" data-toggled="false">
			<div style="" id="TPMain"></div>
		</div>
		<form name="searchForm" id="searchForm" method="GET" action="res/php/search.php"></form>
	</body>
</html>