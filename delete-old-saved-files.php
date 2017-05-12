<pre><?php

    $docRoot = $_SERVER['DOCUMENT_ROOT'];
    $jsonFolder = $docRoot . '/saved-json/';
	$now = time();
	$maxDays = 8;
	$limit = $now - $maxDays * 24 * 60 * 60;

	$deleteThese = array();
	
	$totalFileCount = 0;

	if ($handle = opendir($jsonFolder)) {
		echo "Max age: $maxDays days\n";

    	/* This is the correct way to loop over the directory. */
    	while (false !== ($entry = readdir($handle))) {
			if ($entry != '.' && $entry != '..') {
				++$totalFileCount;
				$fullPath = $jsonFolder . $entry;
				$fileTime = filemtime($fullPath);

				if ($fileTime < $limit) {
					if (count($deleteThese) === 0) {
				    	echo "\nOld entries:\n";
					}
					$deleteThese[] = $fullPath;
					echo "$entry\n";
				}
	    	}
		}
	}
	
	if (count($deleteThese) === 0) {
		echo "\nFound no files to delete (but a total of $totalFileCount files)!";
	} else {
		echo "\nAbout to delete " . count($deleteThese) . " files (a total of $totalFileCount exist):\n";
		
		foreach ($deleteThese as $fullPath) {
			unlink($fullPath);
			echo ".";
		}
	
		echo "\nDone!";
	}
?></pre>