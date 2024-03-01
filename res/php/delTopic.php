<?php
	session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["POSTInput1"]))
		exit(1);
	$ID = $_POST["POSTInput1"];
	$accountFile = fopen("../../accounts/" . md5($_SESSION["id"]),"r");
	fgets($accountFile);
	fgets($accountFile);
	$accountType = trim(fgets($accountFile));
	fclose($accountFile);
	if ($accountType != "o")
		exit(1);
	$related = fopen("../../topics/$ID/.htRelated","r");
	while (($line = fgets($related)) !== false)
	{
		$rID = trim($line);
		if ($rID != "")
		{
			$rTopic = fopen("../../topics/$rID/.htRelated","r");
			$newRArr = array();
			while (($rLine = fgets($rTopic)) !== false)
				if (trim($rLine) != $ID)
					array_push($newRArr,trim($rLine));
			fclose($rTopic);
			$rTopic = fopen("../../topics/$rID/.htRelated","w");
			fwrite($rTopic,implode("",$newRArr));
			fclose($rTopic);
		}
	}
	fclose($related);
	exec("rm -rf ../../topics/$ID");
	echo "<script>window.alert('Topic #$ID has been deleted');parent.location.reload();</script>";
?>