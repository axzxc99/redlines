<?php
	$link = urldecode(trim($_POST["link"]));
	$sourceDesc = trim($_POST["sDesc"]);
	$isPrimary = ($_POST["input1"] == "true");
	$topicID = $_POST["input2"];
	$topicPath = "../../topics/" . $topicID;
	$sourceFolder =  "$topicPath/" . ($isPrimary ? "P":"S");
	if ($link != "")
	{
		$links = fopen("$sourceFolder/.htLinks","a");
		fwrite($links,$link . "#;#" . $sourceDesc . "\n");
		fclose($links);
	}
	else
	{
		$filename = basename($_FILES["sourceFile"]["name"]);
		$filenameArr = explode(".",$filename);
		$ext = array_pop($filenameArr);
		$fileDesc = fopen("$sourceFolder/" . implode(".",$filenameArr) . ".desc","w");
		fwrite($fileDesc,$sourceDesc);
		fclose($fileDesc);
		move_uploaded_file($_FILES["sourceFile"]["tmp_name"], $sourceFolder . "/" . $filename);
	}
	echo "<script>window.open('$topicPath','_parent')</script>";
?>
