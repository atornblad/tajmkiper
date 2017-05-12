<?php
    $rebuiltPost = array();
    parse_str(file_get_contents("php://input"),$rebuiltPost);
    $_POST = $rebuiltPost;
    
    header("Content-Type: text/plain; charset=UTF-8");
    
    $email = $_POST["email"];
    $id = $_POST["id"];
    
    $docRoot = $_SERVER['DOCUMENT_ROOT'];
    $jsonFolder = $docRoot . '/saved-json/';
    $jsonFullFilename = $jsonFolder . $id . '.json';
    
    if (file_exists($jsonFullFilename)) {
        $to = $email;
        
        // subject
        $subject = 'Dina sparade projekt';
        
        // message
        $message = '
        <html>
        <head>
          <title>Dina sparade projekt</title>
        </head>
        <body>
          <p>H&auml;r &auml;r l&auml;nken till dina sparade projekt:</p>
          <p><a href="http://tajmkiper.se/saved/' . $id . '">tajmkiper.se/saved/' . $id . '
        </body>
        </html>';
        
        // To send HTML mail, the Content-type header must be set
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        
        // Additional headers
        $headers .= 'To: ' . $email . "\r\n";
        $headers .= 'From: Tajmkiper <saved@tajmkiper.se>' . "\r\n";
        
        // Mail it
        mail($to, $subject, $message, $headers);
        
        echo "OK";
    } else {
        echo "File not found!";
    }
?>