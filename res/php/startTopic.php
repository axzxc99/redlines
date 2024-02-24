<?php
	$title = $_POST["title"];
	$desc = $_POST["desc"];
	$link = urldecode(trim($_POST["link"]));
	$sourceDesc = trim($_POST["sDesc"]);
	$isPrimary = ($_POST["POSTInput1"] == "true");
	$topicListArr = array_values(array_diff(scandir("../../topics"), array('.', '..')));
	if (count($topicListArr) >= 9000)
		trigger_error("Too many topics!",E_USER_ERROR);
	$newTopicID = rand(1000,9999);
	while (in_array($newTopicID,$topicListArr))
		$newTopicID = rand(1000,9999);
	$topicListFile = fopen("../../.htList","a");
	fwrite($topicListFile,(string)$newTopicID . "\n");
	fclose($topicListFile);
	$topicPath = "../../topics/" . (string)$newTopicID;
	exec("mkdir $topicPath");
	$topicAttFile = fopen($topicPath . "/.htAttributes","w");
	fwrite($topicAttFile,(string)$newTopicID . "\n$title\n$desc");
	fclose($topicAttFile);
	$sourcePath = "$topicPath/" . ($isPrimary ? "P":"S");
	exec("mkdir $topicPath/P");
	exec("touch $topicPath/P/.htLinks");
	exec("mkdir $topicPath/S");
	exec("touch $topicPath/S/.htLinks");
	exec("touch $topicPath/.htRelated");
	if ($link != "")
	{
		$links = fopen("$sourcePath/.htLinks","w");
		fwrite($links,$link . "#;#" . $sourceDesc);
		fclose($links);
	} else {
		$filename = basename($_FILES["sourceFile"]["name"]);
		$filenameArr = explode(".",$filename);
		$ext = array_pop($filenameArr);
		$fileDesc = fopen("$sourcePath/" . implode(".",$filenameArr) . ".desc","w");
		fwrite($fileDesc,$sourceDesc);
		fclose($fileDesc);
		//check for file size availability etc
		move_uploaded_file($_FILES["sourceFile"]["tmp_name"], $sourcePath . "/" . $filename);
	}
	exec("cp topic.php $topicPath/index.php");
	echo "<script>window.open('$topicPath','_parent')</script>";
?>