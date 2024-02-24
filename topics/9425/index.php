<?php
	if (!function_exists('str_contains')) {
		function str_contains(string $haystack, string $needle): bool
		{
			return '' === $needle || false !== strpos($haystack, $needle);
		}
	}
	function retrieveSources($folder)
	{
		if (is_dir($folder))
		{
			$sources = scandir($folder);
			$fileSources = array();
			$linkSources = null;
			foreach ($sources as &$source)
			{
				if ($source != ".htLinks" && !str_contains($source, '.desc') && $source != "." && $source != "..")
				{
					$sourceArr = explode(".",$source);
					$ext = array_pop($sourceArr);
					$fileDesc = file_get_contents($folder . "/" . implode(".",$sourceArr) . ".desc");
					array_push($fileSources,[$source,$fileDesc]);
				}
				elseif ($source == ".htLinks")
				{
					$linkSources = array();
					$linksFile = fopen("$folder/.htLinks","r");
					while (($line = fgets($linksFile)) !== false)
						array_push($linkSources,trim($line));
					fclose($linksFile);
				}
			}
			return array($fileSources,$linkSources);
		}
		else
			return null;
	}
	$attriFile = fopen(".htAttributes","r");
	$attributes = array();
	while (($line = fgets($attriFile)) !== false)
		array_push($attributes,trim($line));
	fclose($attriFile);
	echo "<script>const pSources = " . json_encode(retrieveSources("P")) . ";const sSources = " . json_encode(retrieveSources("S")) . ";const attributes = " . json_encode($attributes) . ";const relatedTopics = null</script>"
?>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../../res/misc/topic.css">
		<script src="../../res/js/topic.js"></script>
	</head>
	<body>
		<div id="bg"></div>
		<div id="header">
			<input title="Return Home" type="image" onclick="window.open(location.origin+'/RedLines','_self')" src="../../res/misc/home.png" id="homeButt">
			<span id="mainTopicTitle"></span>
		</div>
		<div id="mainContain"><div id="display" style=""><ul id="sourceList"></ul></div>
			<div id="displayMenu">
				<input title="Click to show Primary Sources" class="DMButt" onclick="switchDisplay('P',this)" style="border-bottom-left-radius:30px" value="Primary" type="button">
				<input title="Click to show Secondary Sources" class="DMButt" onclick="switchDisplay('S',this)" style="" value="Secondary" type="button">
				<input title="Click to show Related Topics" class="DMButt" onclick="switchDisplay('R',this)" style="border-bottom-right-radius:30px" value="Related" type="button">
			</div>
		</div>
		<div style="z-index:-100" class="promptBGContainer" onclick="if (event.target === this) {closePrompt()}" id="promptBGContainer">
			<div id="promptContainer"></div>
		</div>
		<form enctype="multipart/form-data" target="targetFrame" id="mainForm" style="display:none" action="" name="mainForm" method="POST">
			<input type="hidden" value="" id="input1" name="input1" form="mainForm">
			<input type="hidden" value="" id="input2" name="input2" form="mainForm">
		</form>
		<iframe id="targetFrame" name="targetFrame" src="" style="display:none"></iframe>
		<script>load()</script>
	</body>
</html>