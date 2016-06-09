<?php

// connexion
if (getenv('MONGODB_URI'))
	$m = new MongoClient(getenv('MONGODB_URI'));
else
	$m = new MongoClient();

// database select
$db = $m->heroku_pwk905m9;

// collection select (collection = table)
$collection = $db->cartoons;

// Delete all documents from collection to start over (document = row)
$collection->remove();

// add one document
$document = array( "title" => "Calvin and Hobbes", "author" => "Bill Watterson" );
$collection->insert($document);

// add another document
$document = array( "title" => "XKCD", "online" => true );
$collection->insert($document);

// get all documents from collection
$cursor = $collection->find();

// loop all documents
foreach ($cursor as $document) {
    echo $document["title"] . "<br>";
}

?>
