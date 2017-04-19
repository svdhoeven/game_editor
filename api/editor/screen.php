<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){

    case 'GET':
        //If id, we want just one screen
        if(isset($_GET['id']) && !empty($_GET['id'])){
            $id = htmlspecialchars($_GET['id']);

            if($screen = ORM::for_table('screen')->where('id', $id)->find_array()){
                $response = $screen;
                http_response_code(200);
            }
            else{
                $response = "Screen can't be found!";
                http_response_code(400);
            }
        }
        else if(isset($_GET['map']) && !empty($_GET['map']) && isset($_GET['x']) && isset($_GET['y'])){
            $x = htmlspecialchars($_GET['x']);
            $y = htmlspecialchars($_GET['y']);
            $map = htmlspecialchars($_GET['map']);

            if($screen = ORM::for_table('screen')->where('map', $map)->where('x', $x)->where('y', $y)->find_array()){
                $response = $screen;
                http_response_code(200);
            }
            else{
                $response = "Screen can't be found!";
                http_response_code(400);
            }
        }
        //Else a list
        else if(isset($_GET['map']) && !empty($_GET['map'])){
            $map = htmlspecialchars($_GET['map']);

            if($screens = ORM::for_table('screen')->where('map', $map)->order_by_asc('y')->order_by_asc('x')->find_array()){
                $response = $screens;
                http_response_code(200);
            }
            else{
                $response = 'Screens in this map not found';
                http_response_code(400);
            }
        }
        else{
            $response = "missing params";
            http_response_code(400);
        }
        break;

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
                $screenId = $screen->id;

                for($y = 0; $y < 15; $y++){

                    for($x = 0; $x < 20; $x++) {
                        $combo = ORM::for_table('combo')->create();
                        $combo->screen = $screenId;
                        $combo->x = $x;
                        $combo->y = $y;
                        $combo->tile = 0;
                        $combo->save();
                    }
                }

                $response = $screen->as_array();
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