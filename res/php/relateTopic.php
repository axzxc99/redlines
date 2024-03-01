<?php
	$mainTopic = $_POST["input1"];
	$linkedTopic = $_POST["input2"];
	$toLink = $_POST["input3"];
	if (!isset($mainTopic) || !isset($linkedTopic))
		exit(1);
	$topicDir = "../../topics";
	if ($toLink)
	{
		$mainRelated = fopen("$topicDir/$mainTopic/.htRelated","a");
		$linkedRelated = fopen("$topicDir/$linkedTopic/.htRelated","a");
		fwrite($mainRelated,$linkedTopic . "\n");
		fwrite($linkedRelated,$mainTopic . "\n");
		fclose($mainRelated);
		fclose($linkedRelated);
	}
	else
	{
		$mainRelated = fopen("$topicDir/$mainTopic/.htRelated","r");
		$newArr = array();
		while (($line = fgets($mainRelated)) !== false)
			if (trim($line) != $linkedTopic)
				array_push($newArr,trim($line));
		fclose($mainRelated);
		$mainRelated = fopen("$topicDir/$mainTopic/.htRelated","w");
		fwrite($mainRelated,implode("",$newArr));
		fclose($mainRelated);
		$linkedRelated = fopen("$topicDir/$linkedTopic/.htRelated","r");
		$newArr = array();
		while (($line = fgets($linkedRelated)) !== false)
			if (trim($line) != $mainTopic)
				array_push($newArr,trim($line));
		fclose($linkedRelated);
		$linkedRelated = fopen("$topicDir/$linkedTopic/.htRelated","w");
		fwrite($linkedRelated,implode("",$newArr));
		fclose($linkedRelated);
	}
	echo "<script>parent.location.reload();</script>";
?>
