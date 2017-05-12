<?php

header("Content-Type: application/javascript");

// www.tajmkiper.se => Tajmkiper
// timeqeeper.com => Timeqeeper
// m.tajmkiper.com => Tajmkiper
$host = strtolower($_SERVER['HTTP_HOST']);
preg_match('/(.*\.)?([^\.]+)\.([a-z]+)$/', $host, $hostParts);
$siteName = ucfirst($hostParts[2]);

// Default resource document: { 'tajmkiper' : "Tajmkiper", 'language-code' : "en-US" }
$document = array('tajmkiper' => $siteName, 'language-code' => "en-US");
$bestLang = "en-US";

// Accept-Language: [LANGUAGE-CODE{;q=PRIORITY}]{...}
$languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);

// en-US is the default language
// sv-SE is also available
$languagesAvailable = array( 'sv-se' => 1, 'sv' => 1, 'fr-fr' => 1, 'fr' => 1, 'pt-pt' => 1, 'pt-br' => 1, 'pt' => 1, 'en-us' => 1, 'en' => 1 );

// Highest priority so far
$topQ = -1;

// Determine the language with the highest priority, that is also available
if (count($languages) > 0) {
	foreach ($languages as $lang) {
		$parts = explode(';', $lang);
		$lang = strtolower($parts[0]);

		$q = 1;
		
		if (count($parts) >= 2) {
			$qPart = $parts[1];
			if (strpos($qPart, "q=") === 0) {
				$q = floatval(substr($qPart, 2));
			}
		}
		if ($q > $topQ) {
			if (array_key_exists($lang, $languagesAvailable)) {
				$bestLang = $lang;
				$topQ = $q;
			}
		}
	}
}

if ($bestLang == "sv" || $bestLang == "sv-se") {
	// Swedish (Sweden)
	$document = array(
		'tajmkiper'          => $siteName,
		'tagline'            => "Projektklocka",
		'language-code'      => 'sv-SE',
		'add-project'        => "Lägg till nytt projekt",
		'stop-timer'         => "Stoppa timern",
		'settings'           => "Inställningar",
		'time-label'         => "Tid",
		'notes-label'        => "Anteckningar",
		'save-button'        => "Spara",
		'cancel-button'      => "Avbryt",
		'name-label'         => "Namn",
		'close-button'       => "Stäng",
		'file-section'       => "Arkiv",
		'save-to-csv'        => "Spara som CSV",
		'transfer'           => "Överför",
		'purge-section'      => "Rensning",
		'clear-all'          => "Nollställ alla timers",
		'remove-all'         => "Radera alla projekt",
		'info-section'       => "Info",
		'read-the-blog'      => "Läs bloggen",
		'follow-section'     => "Följ",
		'at-tajmkiper'       => "@tajmkiper",
		'transfer-email'     => "Skicka till e-post",
		'send-button'        => "Skicka",
		'total'              => "Totalt",
		'edit'               => "Ändra",
		'notes'              => "Anteckningar",
		'confirm-remove-all' => "Vill du verkligen RADERA alla projekt?",
		'confirm-clear-all'  => "Vill du verkligen nollställa alla timers?",
		'csv-headings-name'  => "Projekt",
		'csv-headings-time'  => "Tid",
		'csv-separator'      => ";",
		'csv-extension'      => "csv",
		'please-wait'        => "Vänta lite...",
		'transfer-info'      => "Dina projekt har sparats på servern och kan plockas upp på den här adressen:",
		'transfer-error-info'=> "Ett fel inträffade när dina projekt skulle sparas."
	);
}
else if ($bestLang == "fr" || $bestLang == "fr-fr") {
	// French (France)
	$document = array(
		'tajmkiper'          => $siteName,
		'tagline'            => "Horloge de projets",
		'language-code'      => 'fr-FR',
		'add-project'        => "Ajouter un projet",
		'stop-timer'         => "Arrêter le compteur",
		'settings'           => "Paramètres",
		'time-label'         => "Laps de temps",
		'notes-label'        => "Notes",
		'save-button'        => "Enregistrer",
		'cancel-button'      => "Annuler",
		'name-label'         => "Nom du projet",
		'close-button'       => "Fermer",
		'file-section'       => "Fichier",
		'save-to-csv'        => "Enregistrer au format CSV",
		'transfer'           => "Transférer",
		'purge-section'      => "Purge",
		'clear-all'          => "Réinitialiser tous les compteurs.",
		'remove-all'         => "Supprimer tous les projets.",
		'info-section'       => "Info",
		'read-the-blog'      => "Lire le blog",
		'follow-section'     => "Suivre",
		'at-tajmkiper'       => "@tajmkiper",
		'transfer-email'     => "Envoyer à e-mail",
		'send-button'        => "Envoyer",
		'total'              => "Total",
		'edit'               => "Modifier",
		'notes'              => "Notes",
		'confirm-remove-all' => "Voulez-vous vraiment SUPPRIMER tous les projets?",
		'confirm-clear-all'  => "Voulez-vous vraiment réinitialiser tous les compteurs?",
		'csv-headings-name'  => "Projet",
		'csv-headings-time'  => "Temps",
		'csv-separator'      => ";",
		'csv-extension'      => "csv",
		'please-wait'        => "Un moment...",
		'transfer-info'      => "L'information de votre projets a été enregistré sur le serveur. Vous pouvez les rejoindre à cette adresse web:",
		'transfer-error-info'=> "Une erreur s'est produite lors de l'enregistrement de vos projets."
	);
}
else if ($bestLang == "pt" || $bestLang == "pt-pt" || $bestLang == "pt-br") {
	// Portuguese (Portugal or Brazil)
	$document = array(
		'tajmkiper'          => $siteName,
		'tagline'            => "Relógio de projeto",
		'language-code'      => 'pt-BR',
		'add-project'        => "Adicionar um novo projeto",
		'stop-timer'         => "Parar o cronómetro",
		'settings'           => "Configurações",
		'time-label'         => "Espaço de tempo",
		'notes-label'        => "Notas",
		'save-button'        => "Salvar",
		'cancel-button'      => "Cancelar",
		'name-label'         => "Nome do projeto",
		'close-button'       => "Fechar",
		'file-section'       => "Arquivo",
		'save-to-csv'        => "Salve como CSV",
		'transfer'           => "Transferir",
		'purge-section'      => "Purgar",
		'clear-all'          => "Reinicializar todos os contadores",
		'remove-all'         => "Eliminar todos os projetos",
		'info-section'       => "Info",
		'read-the-blog'      => "Ler o blog",
		'follow-section'     => "Seguir",
		'at-tajmkiper'       => "@tajmkiper",
		'transfer-email'     => "Enviar como e-mail",
		'send-button'        => "Enviar",
		'total'              => "Total",
		'edit'               => "Editar",
		'notes'              => "Notas",
		'confirm-remove-all' => "Você realmente quer ELIMINAR todos os projetos?",
		'confirm-clear-all'  => "Você realmente quer REINICIALIZAR todos os contadores?",
		'csv-headings-name'  => "Projeto",
		'csv-headings-time'  => "Tempo",
		'csv-separator'      => ";",
		'csv-extension'      => "csv",
		'please-wait'        => "Aguarde por favor ...",
		'transfer-info'      => "Seus projetos são salvos no servidor e pode ser pego no seguinte endereço:",
		'transfer-error-info'=> "Ocorreu um erro ao salvar seu projeto."
	);
}

echo "(function(f) {";
echo "f(";
echo json_encode($document);
echo ");";
echo "})(";
echo $_GET["callback"];
echo ");";

?>