<?php

echo "hello<br><br>";

// connexion
$m = new MongoClient("mongodb://heroku_pwk905m9:6pqscbe6c39kogeq3861rilvji@ds011314.mlab.com:11314/heroku_pwk905m9");
//$m = new MongoClient();

// sélection d'une base de données
$db = $m->heroku_pwk905m9;

// sélectionne une collection (analogue à une table de base de données relationnelle)
$collection = $db->cartoons;

// ajoute un enregistrement
$document = array( "title" => "Calvin and Hobbes", "author" => "Bill Watterson" );
$collection->insert($document);

// ajoute un autre enregistrement, avec une façon différente d'insertion
$document = array( "title" => "XKCD", "online" => true );
$collection->insert($document);

// récupère tout de la collection
$cursor = $collection->find();

// traverse les résultats
foreach ($cursor as $document) {
    echo $document["title"] . "<br>";
}

?>
