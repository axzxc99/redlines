<?php
	$title = $_POST["title"];
	$desc = $_POST["desc"];
	$link = trim($_POST["link"]);
	$sourceDesc = trim($_POST["sDesc"]);
	$isPrimary = ($_POST["POSTInput1"] == "true");
	$topicListFile = fopen("../../.htList","r");
	$topicListArr = array();
	while (($line = fgets($topicListFile)) !== false)
		array_push($topicListArr,intval(trim($line)));
	fclose($topicListFile);
	if (count($topicListArr) >= 9000)
		trigger_error("Too many topics!",E_USER_ERROR);
	$newTopicID = rand(1000,9999);
	while (in_array($newTopicID,$topicListArr))
		$newTopicID = rand(1000,9999);
	$topicListFile = fopen("../../.htList","a");
	fwrite($topicListFile,(string)$newTopicID);
	fclose($topicListFile);
	$topicPath = "../../topics/" . (string)$newTopicID;
	exec("mkdir $topicPath");
	$topicAttFile = fopen($topicPath . "/.htAttributes","w");
	fwrite($topicAttFile,(string)$newTopicID . "\n###\n$title\n###\n$desc");
	fclose($topicAttFile);
	$sourcePath = $topicPath . "/" . ($isPrimary ? "P":"S");
	exec("mkdir $sourcePath");
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