<?php
     
$needle = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('needle');
$url = 'https://www.openthesaurus.de/synonyme/search?&format=application/json&q='.urlencode($needle);
     header('Content-type: application/json');
     $json = file_get_contents($url);
     echo $json;
     

