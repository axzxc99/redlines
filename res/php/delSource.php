<?php
	session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["input1"]))
		exit(1);
	$sourceInfo = json_decode($_POST["input1"]);
	$sourceType = explode(" ",$_POST["input2"])[0];
	$linkoFile = intval(explode(" ",$_POST["input2"])[1]);
	$ID = $_POST["input3"];
	$accountFile = fopen("../../accounts/" . md5($_SESSION["id"]),"r");
	fgets($accountFile);
	fgets($accountFile);
	$accountType = trim(fgets($accountFile));
	fclose($accountFile);
	if ($accountType != "o")
		exit(1);
	$title = "";
	if ($linkoFile)
	{
		$linkFile = fopen("../../topics/$ID/$sourceType/.htLinks","r");
		$newFileArr = array();
		while (($line = fgets($linkFile)) !== false)
			if (trim($line) != trim($sourceInfo))
				array_push($newFileArr,$line);
		fclose($linkFile);
		$newFileStr = implode("",$newFileArr);
		$linkFile = fopen("../../topics/$ID/$sourceType/.htLinks","w");
		fwrite($linkFile,$newFileStr);
		fclose($linkFile);
		$title = explode("#;#",$sourceInfo)[0];
	}
	else
	{
		exec("rm -f ../../topics/$ID/$sourceType/" . $sourceInfo[0]);
		$sourceDesc = explode(".",$sourceInfo[0]);
		array_pop($sourceDesc);
		$sDescName = implode(".",$sourceDesc) . ".desc";
		exec("rm -f ../../topics/$ID/$sourceType/" . $sDescName);
		$title = $sourceInfo[0];
	}
	echo "<script>window.alert('Source $title has been deleted!');parent.location.reload();</script>";
?>