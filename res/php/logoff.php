<?php
	session_start();
	session_unset();
	session_destroy();
	echo "<script>window.alert('Log off successful!');parent.location.reload();</script>";
?>