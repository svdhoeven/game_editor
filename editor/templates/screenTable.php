<table class="screenTable">

    <?php
    for($y = 0; $y < 8; $y++){
        ?>
        <tr>
            <?php
            for($x = 0; $x < 16; $x++){
                ?>
                <td data-x="<?= $x ?>" data-y="<?= $y ?>">
                    <?= $x ?> x <?= $y ?>
                </td>
                <?php
            }
            ?>
        </tr>
        <?php
    }
    ?>

</table>