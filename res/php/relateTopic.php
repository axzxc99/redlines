<?php
	$mainTopic = $_POST["input1"];
	$linkedTopic = $_POST["input2"];
	if (!isset($mainTopic) || !isset($linkedTopic))
		exit(1);
	$topicDir = "../../topics";
	$mainRelated = fopen("$topicDir/$mainTopic/.htRelated","a");
	$linkedRelated = fopen("$topicDir/$linkedTopic/.htRelated","a");
	fwrite($mainRelated,$linkedTopic . "\n");
	fwrite($linkedRelated,$mainTopic . "\n");
	fclose($mainRelated);
	fclose($linkedRelated);
	echo "<script>parent.location.reload();</script>";
?>
