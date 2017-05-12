<?php
    $rebuiltPost = array();
    parse_str(file_get_contents("php://input"),$rebuiltPost);
    $_POST = $rebuiltPost;
    
    header("Content-Type: text/plain; charset=UTF-8");
    
    $json = $_POST["data"];
    $ob = json_decode($json);
    if($ob === null) {
        echo "#BAD_DATA";
    } else {
        $length = 4;
        
        $found = false;
        
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $jsonFolder = $docRoot . '/saved-json/';
        
        while (!$found) {
            $dummy = "dummy" . rand() . "_" . time();
            $md5 = md5($dummy, true);
            $base64 = base64_encode($md5);
            $id = strtolower(strtr($base64, "+/=", "p7e"));
            $filename = substr($id, 0, $length);
            
            $jsonFullFilename = $jsonFolder . $filename . '.json';
            $found = !file_exists($jsonFullFilename);
            
            ++$length;
            if ($length == 10) {
                echo "#SERVER_FAILURE";
            }
        }
        
        file_put_contents($jsonFullFilename, $json);
        
        echo $filename;
    }
?>