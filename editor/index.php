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
  <main class="editorContainer">
    <?php
    require_once('templates/screen.php');
    require_once('templates/tileList.php');
    ?>
  </main>

  <script type="text/javascript" src="../public/bundles/editor.js"></script>
</body>
</html>