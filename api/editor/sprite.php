<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){
    case 'GET':
        if($sprites = ORM::for_table('sprite')->find_array()){
            $response = $sprites;
            http_response_code(200);
        }
        else{
            $response = 'No sprites found';
            http_response_code(500);
        }

        break;

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);