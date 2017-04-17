<?php
require_once("idiorm/idiorm.php");

ORM::configure('logging', true);
ORM::configure('mysql:host=localhost;dbname=game_editor');
ORM::configure('username', 'root');
ORM::configure('password', '');
