<?php
	if (!isset($_SERVER['PHP_AUTH_USER'])) {
		header('WWW-Authenticate: Basic realm="My Realm"');
		header('HTTP/1.0 401 Unauthorized');
		#echo "<script>window.alert('Invalid User/Password! 401 Unauthorized!')</script>";
		exit;
	} else {
		session_start();
		$user = $_SERVER['PHP_AUTH_USER'];
		$_SESSION['id'] = $user;
		echo "<script>window.alert('Welcome back, $user');parent.location.reload()</script>";
	}
?>