<?php
	$ID = $_POST["input1"];
	$chatPath = "../../topics/$ID/.htChat";
	$chatFile = fopen("$chatPath","r");
	if ($chatFile != false)
	{
		$chatLog = array();
		while (($line = fgets($chatFile)) !== false)
			array_push($chatLog,explode("#|#",urldecode(trim($line))));
		fclose($chatFile);
		if (count($chatLog) > 50)
		{
			array_shift($chatLog);
			$chatFile = fopen("$chatPath","w");
			foreach ($chatLog as &$line)
				fwrite($chatFile,urlencode(implode("#|#",$line)) . "\n");
			fclose($chatFile);
		}
		echo "<script>parent.updateChat(" . json_encode($chatLog) . ")</script>";
	}
?>