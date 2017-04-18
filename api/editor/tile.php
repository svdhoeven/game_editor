<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){
    case 'GET':
        if($tiles = ORM::for_table('tile')->find_array()){

            for($i = 0; $i < count($tiles); $i++){

                if($sprite = ORM::for_table('sprite')->where('id', $tiles[$i]['sprite'])->find_one()){
                    $tiles[$i]['source'] = $sprite->source;
                }
            }

            $response = $tiles;
            http_response_code(200);
        }
        else{
            $response = 'No tiles found';
            http_response_code(500);
        }

        break;

    case 'POST':
        $body = json_decode(file_get_contents("php://input"));

        if(isset($body->sprite) && !empty($body->sprite) && isset($body->solid)){

            $tile = ORM::for_table('tile')->create();

            $tile->sprite = $body->sprite;
            $tile->type = 0;
            $tile->solid = htmlspecialchars($body->solid);

            if($tile->save()){
                $response = $tile;
                http_response_code(200);
            }
            else{
                $response = "Tile couldnt be saved!";
                http_response_code(500);
            }
        }
        else{
            $response = "param missing";
            http_response_code(400);
        }

        break;

    case 'PUT':
        $body = json_decode(file_get_contents("php://input"));

        if(isset($body->sprite) && !empty($body->sprite) && isset($body->id) && !empty($body->id) && isset($body->solid)){

            if($tile = ORM::for_table('tile')->where('id', $body->id)->find_one()){

                $tile->sprite = htmlspecialchars($body->sprite);
                $tile->solid = htmlspecialchars($body->solid);

                if($tile->save()){
                    $response = $tile;
                    http_response_code(200);
                }
                else{
                    $response = "Tile couldnt be saved!";
                    http_response_code(500);
                }
            }
            else{
                $response = "tile not found";
                http_response_code(400);
            }
        }
        else{
            $response = "param missing";
            http_response_code(400);
        }

        break;

    case 'DELETE':
        if(isset($_SERVER['HTTP_ID']) && !empty($_SERVER['HTTP_ID'])){
            $id = (int)htmlspecialchars($_SERVER['HTTP_ID']);

            if(ORM::for_table('tile')->where('id', $id)->find_one()->delete()){

                //Set related combos with id to 0
                if($combos = ORM::for_table('combo')->where('tile', $id)->find_many()){
                    foreach($combos as $combo){
                        $combo->tile = 0;
                        $combo->save();
                    }
                }

                $response = 'Content deleted succesfully';
                http_response_code(204);
            }
            else{
                $response = 'Internal Server Error';
                http_response_code(500);
            }
        }
        else{
            $response = 'Missing parameters';
            var_dump($_SERVER);
            http_response_code(400);
        }
        break;

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);