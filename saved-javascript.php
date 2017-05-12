<?php
    $id = $_GET['id'];
    
    if (preg_match('/^[a-zA-Z0-9]+$/', $id) !== 1) {
        header("Location: /");
    }

    $docRoot = $_SERVER['DOCUMENT_ROOT'];
    $jsonFolder = $docRoot . '/saved-json/';
    $jsonFullFilename = $jsonFolder . $id . '.json';
    
    header("Content-Type: text/javascript; charset=UTF-8");
?>
window.addEventListener("load", function() {
	window.setTimeout(function() {
		var projects = <?php
			$handle = fopen($jsonFullFilename, 'r');
			fpassthru($handle);
			fclose($handle);
		?>;
		
		localStorage.projects = JSON.stringify(projects);
		window.location.href = "/";
	}, 1000);
}, false);