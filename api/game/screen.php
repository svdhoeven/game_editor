<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){

    case 'GET':
        if(isset($_GET['map']) && !empty($_GET['map'])){
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

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);