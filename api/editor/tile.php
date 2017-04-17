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

    default:
        $response = "Invalid method";
        break;
}

echo json_encode($response);