<?php
require_once('../db.php');

$method = $_SERVER["REQUEST_METHOD"];

$response = "";
header('Content-Type: application/json');

switch($method){
    case 'GET':
        if(isset($_GET['screen']) && !empty($_GET['screen'])){
            $screenId = htmlspecialchars($_GET['screen']);

            if($combos = ORM::for_table('combo')->where('screen', $screenId)->order_by_asc('y')->order_by_asc('x')->find_array()){

                for($i = 0; $i < count($combos); $i++){

                    $usedTiles = [];

                    if($usedTiles[$combos[$i]['tile']]){
                        $combos[$i]['source'] = $usedTiles[$combos[$i]['tile']]['source'];
                        $combos[$i]['solid'] = $usedTiles[$combos[$i]['tile']]['solid'];
                    }
                    else if($combos[$i]['tile'] != 0 && $tile = ORM::for_table('tile')->where('id', $combos[$i]['tile'])->find_one()){

                        if($sprite = ORM::for_table('sprite')->where('id', $tile->sprite)->find_one()){
                            $combos[$i]['source'] = $sprite->source;
                            $combos[$i]['solid'] = $tile->solid;

                            $usedTiles[$combos[$i]['tile']]['source'] = $sprite->source;
                            $usedTiles[$combos[$i]['tile']]['solid'] = $tile->solid;
                        }
                    }
                    else{
                        $combos[$i]['source'] = 'blank';
                        $combos[$i]['solid'] = 0;
                    }
                }

                $response = $combos;

                http_response_code(200);
            }
            else{
                $response = 'No screen found';
                http_response_code(500);
            }
        }
        else{
            $response = "No screen id!";
            http_response_code(400);
        }

        break;

    default:
        $response = "Invalid method";
        http_response_code(405);
        break;
}

echo json_encode($response);