<?php

?><!DOCTYPE html>
<html>
<head>
    <title>Tajmkiper - Project Time Clock</title>

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
	
	<meta name="description" content="Project Time Clock - Keeps track of your time spent in projects. Free, easy to use, and quite pretty.">

    <link rel="stylesheet" href="tajmkiper.css">
    
	<script src="dollar.js"></script>
	<script src="time.js"></script>
    <script src="FileSaver.js"></script>
	<script src="csv-minified.js"></script>
	<script src="resources.js"></script>
    <script src="tajmkiper.js"></script>
    
	<link rel="icon" href="icon-60.png" type="image/png">
    <link rel="apple-touch-icon" href="icon-60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="icon-76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="icon-120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icon-152.png">
	
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
	<h1>Tajmkiper - Project Time Clock</h1>
	<p>Keeps track of your time spent in projects. Free, easy to use, and quite pretty.</p>
    <nav>
        <ul>
            <li id="addProject"><a href="#addProject"><header data-reskey="add-project">Add new project</header></a></li>
            <li id="stopTimer" class="hideSpan" title="Stoppa timer"><a href="#stopTimer"><span data-reskey="stop-timer">Stop timer</span></a></li>
            <li id="settings" class="hideSpan" title="Verktyg"><a href="#settings"><span data-reskey="settings">Tools</span></a></li>
        </ul>
    </nav>
	
	<div class="modalDialogPanel" id="editTimeDialog">
		<form>
			<label for="timeTextBox" data-reskey="time-label">Time</label>
			<input type="text" id="timeTextBox" name="time">
			<br>
            <div class="buttons">
                <input type="submit" class="ok" value="Save" data-reskey="save-button">
                <input type="button" class="cancel" value="Cancel" data-reskey="cancel-button">
            </div>
		</form>
	</div>
    
    <div class="modalDialogPanel" id="addProjectDialog">
        <form>
            <label for="nameTextBox" data-reskey="name-label">Name</label>
            <input type="text" id="nameTextBox" name="name">
            <br>
            <div class="buttons">
                <input type="submit" class="ok" value="Save" data-reskey="save-button">
                <input type="button" class="cancel" value="Cancel" data-reskey="cancel-button">
            </div>
        </form>
    </div>
    
    <div class="modalDialogPanel" id="settingsDialog">
        <ul class="actions">
            <li class="closeModal">
                <a href="#close"><span data-reskey="close-button">Close</span></a>
            </li>
            <li class="heading" data-reskey="file-section">File</li>
            <li rel="saveToCsv">
                <a href="#saveToCsv" data-reskey="save-to-csv">Save as CSV</a>
            </li>
            <li rel="transfer">
                <a href="#transfer" data-reskey="transfer">Transfer</a>
            </li>
            <li class="heading" data-reskey="purge-section">Purge</li>
            <li rel="clearAll">
                <a href="#clearAll" data-reskey="clear-all">Clear all timers</a>
            </li>
            <li rel="removeAll">
                <a href="#removeAll" data-reskey="remove-all">Remove all projects</a>
            </li>
			<li class="heading" data-reskey="info-section">Info</li>
			<li rel="blog">
				<a rel="external-site" href="http://atornblad.se/labels/project-time-clock" data-reskey="read-the-blog">Read the blog</a>
			</li>
        </ul>
    </div>
    
    <div class="modalDialogPanel" id="transferDialog">
        <form id="transferForm">
            <p id="transferInfo"></p>
            <p><a href="" id="transferUrl"></a></p>
            <label for="transferEmailTextBox" data-reskey="transfer-email">Send to e-mail</label>
            <input type="text" id="transferEmailTextBox" name="email">
            <input type="hidden" id="transferUrlHidden" name="id">
            <br>
            <div class="buttons">
                <input type="submit" class="ok" value="Send" data-reskey="send-button">
                <input type="button" class="cancel" value="Close" data-reskey="close-button">
            </div>
        </form>
    </div>
</body>
</html>
