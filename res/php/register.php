<?php
	// array(5) {
  // ["user"]=>
  // string(7) "clawson"
  // ["pass"]=>
  // string(8) "Ohio!234"
  // ["color"]=>
  // string(7) "#08d40b"
// }
	$user = $_POST["user"];
	$pass = $_POST["pass"];
	$color = $_POST["color"];
	$canProceed = true;
	$passwdFile = fopen("../../.htpasswd","r");
	while (($line = fgets($passwdFile)) !== false)
	{
		$tmpUser = explode(":",trim($line))[0];
		if ($user == $tmpUser)
		{
			echo "<script>window.alert('Username Taken!')</script>";
			$canProceed = false;
			break;
		}
	}
	fclose($passwdFile);
	if ($canProceed)
	{
		exec("htpasswd -b /var/www/html/RedLines/.htpasswd '$user' '$pass'");
		$accountFile = fopen("../../accounts/" . md5($user),"w");
		fwrite($accountFile,$user . "\n");
		fwrite($accountFile,$color . "\n");
		fwrite($accountFile,"s"); //s for standard user
		fclose($accountFile);
		exec("chmod 660 ../../accounts/*");
		echo "<script>window.alert('$user account created!');parent.location.reload()</script>";
	}
	else
		exit(1);
?>