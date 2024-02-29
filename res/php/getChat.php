<?php
	$ID = $_POST["input1"];
	$chatPath = "../../topics/$ID/.htChat";
	$chatFile = fopen("$chatPath","r");
	$chatLog = array();
	while (($line = fgets($chatFile)) !== false)
		array_push($chatLog,explode("#|#",urldecode(trim($line))));
	fclose($chatFile);
	echo "<script>parent.updateChat(" . json_encode($chatLog) . ")</script>";
?>