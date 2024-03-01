 <?php
	session_start();
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
	$relatedFile = fopen(".htRelated","r");
	$relatedTopics = array();
	while (($line = fgets($relatedFile)) !== false)
	{
		$rTopic = trim($line);
		if ($rTopic != "")
		{
			$rAttFile = fopen("../$rTopic/.htAttributes","r");
			fgets($rAttFile);
			$rTitle = trim(fgets($rAttFile));
			fclose($rAttFile);
			array_push($relatedTopics,array($rTopic,$rTitle));
		}
	}
	fclose($relatedFile);
	$loggedIn = isset($_SESSION['id']);
	$user = ($loggedIn ? $_SESSION['id']:"");
	$accountInfo = array();
	if ($loggedIn)
	{
		$accountFile = fopen("../../accounts/" . md5($user),"r");
		$accountInfo["username"] = trim(fgets($accountFile));
		$accountInfo["color"] = trim(fgets($accountFile));
		$accountInfo["type"] = trim(fgets($accountFile));
		fclose($accountFile);
	}
	echo "<script>const account = " . ($loggedIn ? json_encode($accountInfo):"[]") . ";const loggedIn = " . ($loggedIn ? 'true':'false') . ";const rTopics = " . json_encode($relatedTopics) . ";const pSources = " . json_encode(retrieveSources("P")) . ";const sSources = " . json_encode(retrieveSources("S")) . ";const attributes = " . json_encode($attributes) . ";const relatedTopics = null</script>"
?>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../../res/misc/topic.css">
		<script src="../../res/js/const.js"></script>
		<script src="../../res/js/topic.js"></script>
	</head>
	<body>
		<div id="bg"></div>
		<div id="header">
			<span id="mainTopicTitle" title="<?php echo $attributes[0]?>"><?php echo $attributes[1]?></span>
			<div id="accountDiv" style="opacity:0" class="accountDiv">
				<input type="button" style="" disabled id="tryLoginButt" value="Login" class="accountButt">
				<input type="button" style="" disabled id="registerButt" value="Register" class="accountButt">
			</div>
			<input type="image" id="loginButt" style="" title="Click to log in" onclick="promptLogin()" src="../../res/misc/guest.png" class="loginButt">
		</div>
		<div id="mainContain">
			<div class="wholeDisplay">
				<div id="display" style="">
					<ul id="sourceList">
						<div class="homeTopicDiv">
							<input id="homeButt" class="homeButt" type="image" title="Return Home" src="../../res/misc/home.png">
							<span id="topicID" class="topicID">ID: <?php echo $attributes[0]?></span>
						</div>
						<p id="topicDesc" class="topicDesc"><span>Description:</span><?php echo $attributes[2]?></p>
					</ul>
				</div>
				<div id="displayMenu">
					<input title="Click to show Primary Sources" class="DMButt" onclick="switchDisplay('P',this)" style="border-bottom-left-radius:30px" value="Primary" type="button">
					<input title="Click to show Secondary Sources" class="DMButt" onclick="switchDisplay('S',this)" style="" value="Secondary" type="button">
					<input title="Click to show Related Topics" class="DMButt" onclick="switchDisplay('R',this)" style="border-bottom-right-radius:30px" value="Related" type="button">
				</div>
			</div>
			<div class="commentsDiv">
				<span class="commenstTitle">Topic Comments</span>
				<ul id="commentChat" class="commentChat"></ul>
				<div id="respondDiv" class="respondDiv">
					<textarea data-ctrl="false" disabled maxlength=300 value="" wrap="soft" placeholder="Send a Message"  autofocus style="" class="textBox" id="textBox"></textarea>
					<input disabled type="button" value="➤" id="sendButton" class="sendButton">
				</div>
			</div>
		</div>
		<div style="z-index:-100" class="promptBGContainer" onclick="if (event.target === this) {closePrompt()}" id="promptBGContainer">
			<div id="promptContainer"></div>
			<input type="button" id="nextButt" onclick="" style="right:0;display:none" class="skipButt" value=">">
			<input type="button" id="prevButt" onclick="" style="left:0;display:none" class="skipButt" value="<">
		</div>
		<form enctype="multipart/form-data" target="targetFrame" id="mainForm" style="display:none" action="" name="mainForm" method="POST">
			<input type="hidden" value="" id="input1" name="input1" form="mainForm">
			<input type="hidden" value="" id="input2" name="input2" form="mainForm">
			<input type="hidden" value="" id="input3" name="input3" form="mainForm">
		</form>
		<iframe id="targetFrame" name="targetFrame" src="" style="display:none"></iframe>
		<iframe id="refreshFrame" name="refreshFrame" src="" style="display:none"></iframe>
		<form id="subForm" style="display:none" name="subForm" target="refreshFrame" action="../../res/php/getChat.php" method="POST">
			<input type="hidden" value="<?php echo $attributes[0]?>" id="subInput1" name="input1" form="subForm">
		</form>
		<script>load()</script>
	</body>
</html>