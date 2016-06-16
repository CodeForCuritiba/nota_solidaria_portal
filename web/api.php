<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];

if (isset($_SERVER['PATH_INFO'])) $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
else $request = array('users');

$input = json_decode(file_get_contents('php://input'),true);

$response = array('status' => '200');

try {

  // connect to the mongodb database
  if (getenv('MONGODB_URI'))
    $m = new MongoClient(getenv('MONGODB_URI'));
  else
    $m = new MongoClient();

  if ($m) {
    $db = $m->heroku_pwk905m9;
     
    // retrieve the collection and key from the path
    $collection_name = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
    $collection = $db->$collection_name;
    $response['collection_name'] = $collection_name;

    $key = array_shift($request);
    $mongoId = FALSE;
    if ($key) {
      $mongoId = new MongoId($key);
    }

  //    echo $method.' / '. $collection_name .' / '.$key.'  / '.json_encode($input); die(); 
    if ($input && isset($input['_id']['$id'])) {
      $input['_id'] = new MongoId($input['_id']['$id']);
    }
  //  echo $method.' / '. $collection_name .' / '.$key.'  / '.json_encode($input); die(); 

    // create SQL based on HTTP method
    $result = NULL;
    switch ($method) {
      case 'GET':
        if ($mongoId)
          $result = $collection->findOne(array('_id' => $mongoId));
        else
          // To comment on prod
          $result = iterator_to_array($collection->find());
        break;
      case 'PUT':
      case 'POST':
          if (!isset($input['_id'])) $input['created_at'] = time();
          $input['updated_at'] = time();
          $input['sync'] = TRUE;
          $res = $collection->save($input);
          if ($res) {
              $result = $input;
          }
        break;
      case 'DELETE':
        if ($mongoId) $result = $collection->remove(array('_id' => $mongoId));
        break;
    }
    $response['result'] = $result;
  }
   
  // Send results
  if ($m) $m->close();
} catch (MongoException $ex) {
  $response['status'] = 400;
  $response['error_message'] = $e->getMessage();
  $response['error_code'] = $e->getCode();
}

echo json_encode($response);




