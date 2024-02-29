<?php
	$account = json_decode($_POST["input1"],true);
	$mess = $_POST["input2"];
	$ID = $_POST["input3"];
	$chatPath = "../../topics/$ID/.htChat";
	$chatFile = fopen("$chatPath","a");
	$time = $_SERVER['REQUEST_TIME'];
	fwrite($chatFile,$time . "000#|#" . $account["username"] . "#|#$mess#|#" . $account["color"] . "\n");
	fclose($chatFile);
	echo "<script>parent.refreshChat()</script>";
?>