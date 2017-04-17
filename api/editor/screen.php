<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){
    case 'POST':
        $body = json_decode(file_get_contents("php://input"));

        if(
            isset($body->x) &&
            isset($body->y) &&
            isset($body->map) && !empty($body->map)
        ){
            $x = htmlspecialchars($body->x);
            $y = htmlspecialchars($body->y);
            $map = htmlspecialchars($body->map);

            $screen = ORM::for_table('screen')->create();
            $screen->x = $x;
            $screen->y = $y;
            $screen->map = $map;

            if($screen->save()){

                for($y = 0; $y < 15; $y++){

                    for($x = 0; $x < 20; $x++) {
                        $combo = ORM::for_table('combo')->create();
                        $combo->screen = $screen->id;
                        $combo->x = $x;
                        $combo->y = $y;
                        $combo->tile = 0;
                        $combo->save();
                    }
                }

                http_response_code(201);
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