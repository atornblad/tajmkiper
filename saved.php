<?php
    $id = $_GET['id'];
    
    if (preg_match('/^[a-zA-Z0-9]+$/', $id) !== 1) {
        header("Location: /");
    }
    
    $docRoot = $_SERVER['DOCUMENT_ROOT'];
    $jsonFolder = $docRoot . '/saved-json/';
    $jsonFullFilename = $jsonFolder . $id . '.json';
    
    if (file_exists($jsonFullFilename)) {
?><!DOCTYPE html>
<html>
<head>
    <title>Tajmkiper</title>
    <script src="/saved/<?php echo $id; ?>.js"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-37829455-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
</body>
</html>
<?php
    } else {
        header("Location: /");
    }
?>