<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){

    case 'GET':
        if($maps = ORM::for_table('map')->find_many()){
            $response = $maps;
            http_response_code(200);
        }
        else{
            $response = 'no maps';
            http_response_code(500);
        }
        break;

    case 'POST':
        $body = json_decode(file_get_contents("php://input"));

        if(
            isset($body->name) &&
            isset($body->start)
        ){
            $name = htmlspecialchars($body->name);
            $start = htmlspecialchars($body->start);

            $map = ORM::for_table('map')->create();
            $map->name = $name;
            $map->start_screen = $start;

            if($map->save()){
                $response = $map;
                http_response_code(200);
            }
            else{
                $response = 'Internal Server Error';
                http_response_code(500);
            }
        }
        else{
            $response = 'Missing parameters';
            http_response_code(400);
        }
        break;

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);