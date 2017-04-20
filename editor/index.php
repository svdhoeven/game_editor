<?php
//Force cache clear
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Editor</title>
  <link rel="stylesheet" href="./../public/bundles/final.css" type="text/css"/>
</head>
<body>
  <nav class="editorMenu">
    <ul>
      <li>
        <a href="screen">
          Screen Editor
        </a>
      </li>
      <li>
        <a href="tiles">
          Tiles Editor
        </a>
      </li>
      <li>
        <a href="sprite">
          Import Sprites
        </a>
      </li>
    </ul>
  </nav>

  <div id="loader" class="hidden">
    <img src="./../public/img/loader.png"/>
  </div>
  <main class="editorContainer">
    <?php
    $url = 'screen';

    if(isset($_GET['_url']) && !empty($_GET['_url'])){
        $url = htmlspecialchars($_GET['_url']);
    }

    switch($url){
        case 'tiles':
          require_once('templates/tileList.php');
          require_once('templates/tileEditor.php');
          break;

        case 'sprite':
          require_once('templates/spriteList.php');
          require_once('templates/spriteEditor.php');
            break;

        default:
            require_once('templates/screen.php');
            require_once('templates/tileList.php');
            require_once('templates/screenTable.php');
            require_once('templates/tileInfo.php');
        break;
    }

    ?>
  </main>

  <script type="text/javascript" src="../public/bundles/editor.js"></script>
</body>
</html>