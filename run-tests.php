<!DOCTYPE html>
<html>
<head>
    <title>Unit tests</title>
    <script src="ut.js"></script>
	<script src="csv.js"></script>
    <link rel="stylesheet" href="utOutput.css" />
</head>
<body>
    <div id="progress"><div id="success"></div><div id="failure"></div><div id="info">0 successful, 0 failed, out of ?</div></div>
    <ul id="tests"></ul>
    
    <script src="utOutput.js"></script>
    <script src="csvTests.js"></script>
	<script>
		engine.run();
	</script>
</body>
</html>