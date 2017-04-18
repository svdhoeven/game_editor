<form class="spriteEditor" method="post" enctype="multipart/form-data">
    <p class="error">
        <?php
        require_once('./../api/db.php');

        // Check if image file is a actual image or fake image
        if(isset($_POST["input_submit"])) {

            if(isset($_FILES["input_file"])) {
                $target_dir = "./../public/img/sprites/";
                $target_baseName = basename($_FILES["input_file"]["name"]);
                $target_file = $target_dir . basename($_FILES["input_file"]["name"]);
                $uploadOk = 1;
                $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                $check = getimagesize($_FILES["input_file"]["tmp_name"]);
                $sprite = null;
                $source = chop($target_baseName, '.png');

                if ($_FILES["input_file"]["error"]) {
                    echo $_FILES["input_file"]["error"] . ' ';
                }

                //Check if it's an image
                if ($check !== false) {
                    $uploadOk = 1;
                } else {
                    echo "You need to provide a .png image! ";
                    $uploadOk = 0;
                }

                // Check if file already exists
                if (file_exists($target_file)){
                    chmod($target_file, 0755);
                    unlink($target_file);
                }
                else{
                    $sprite = ORM::for_table('sprite')->create();
                    $sprite->source = $source;
                }

                // Check file size
                if ($_FILES["input_file"]["size"] > 500000) {
                    echo "The sprite is too big! ";
                    $uploadOk = 0;
                }

                // Allow certain file formats
                if ($imageFileType != "png") {
                    echo "Only '.png' files are allowed! ";
                    $uploadOk = 0;
                }

                // Check if $uploadOk is set to 0 by an error
                if ($uploadOk != 0) {
                    if ($uploadResult = move_uploaded_file($_FILES["input_file"]["tmp_name"], $target_file)) {

                        if($sprite == null || $sprite->save()) {
                            header("Refresh:0");
                            die;
                        }
                        else{
                            echo "Sprite couldn't be saved in database! ";
                        }
                        die;
                    }
                    else {
                        echo "Er is een fout opgetreden met het uploaden van het bestand! ";
                    }
                }
            }
            else{
                echo 'No file uploaded';
            }
        }
        ?>
    </p>

    <div class="input_wrapper">
        <label for="input_file">Choose an image: </label>
        <input type="file" id="input_file" name="input_file" required/>
    </div>
    <div class="input_wrapper">
        <label for="input_submit">Add new sprite: </label>
        <input type="submit" id="input_submit" name="input_submit" value="Add Sprite"/>
    </div>
    <div class="input_wrapper hidden">
        <label for="input_submit">Add new sprite: </label>
        <input type="submit" id="input_submit" name="input_submit" value="Add Sprite"/>
    </div>
</form>