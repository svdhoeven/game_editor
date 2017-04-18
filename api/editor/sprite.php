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

    case 'POST':
        $body = json_decode(file_get_contents("php://input"), true);

        if(isset($body->source) && !empty($body->source)){

            $sprite = ORM::for_table('sprite')->create();

            $sprite->source = htmlspecialchars($body->source);

            if($sprite->save()){
                $response = 'success';
                http_response_code(200);
            }
            else{
                $response = "sprite couldn't be saved";
                http_response_code(500);
            }
        }
        else{
            $response = "missing params";
            http_response_code(400);
        }
        break;

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);