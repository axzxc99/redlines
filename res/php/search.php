<?php
	if (!function_exists('str_contains')) {
		function str_contains(string $haystack, string $needle): bool
		{
			return '' === $needle || false !== strpos($haystack, $needle);
		}
	}
	$isPOST = isset($_POST["search"]);
	$query = ($isPOST) ? $_POST["search"]:$_GET["search"];
	$topicsPath = ($isPOST) ? "../../topics":"topics";
	$query = urldecode($query);
	$topics =$topicListArr = array_values(array_diff(scandir($topicsPath), array('.', '..')));
	$results = array();
	foreach($topics as &$topic)
	{
		$attributeContents = file_get_contents("$topicsPath/$topic/.htAttributes");
		if ($attributeContents === false)
			break;
		if (str_contains(strtoupper($attributeContents),strtoupper($query)))
		{
			$title = explode("\n",$attributeContents)[1];
			$results[$topic] = $title;
		}
	}
	if ($isPOST)
		echo "<!--";
	else
		echo "<script>const query = '$query';const results = " . json_encode($results) . "</script>";
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="res/misc/search.css">
		<script src="res/js/const.js"></script>
		<script src="res/js/search.js"></script>
	</head>
	<body>
		<div id="bg"></div>
		<input title="Return Home" type="image" onclick="window.open(location.origin+'/RedLines','_self')" src="res/misc/home.png" id="homeButt">
		<h1 id="searchTitle"></h1>
		<div id="resultsContainer"></div>
		<script>load()</script>
	</body>
</html>

<?php
	if ($isPOST)
	{
		echo "-->";
		var_dump($results);
		echo "<script>parent.showResults(" . json_encode($results) . ")</script>";
	}
?>
