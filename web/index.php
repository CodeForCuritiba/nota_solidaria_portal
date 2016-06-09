<?php

echo "hello";

// connexion
$m = new MongoClient();

// sélection d'une base de données
$db = $m->comedy;

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
    echo $document["title"] . "\n";
}

?>
