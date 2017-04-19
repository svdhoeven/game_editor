import Combo from './../GameObjects/Combo';

class Screen{

    constructor(screenId, x, y){
        this.combos = [];
        this.screenId = screenId;
        this.originX = x;
        this.originY = y;
        this.x = x * 640;
        this.y = y * 480;
        this.ready = false;
    }

    loadCombos(){
        $.ajax({
            url: './api/game/combo.php?screen=' + this.screenId,
            method: 'get',
            success: this.loadCombosSuccessHandler.bind(this)
        })
    }

    loadCombosSuccessHandler(data){
        this.combos = [];
        for(let i = 0; i < data.length; i++){
            let comboData = data[i];
            this.combos.push(new Combo(comboData.x * 32, comboData.y * 32, comboData.source, comboData.solid, this.x, this.y));
        }

        this.ready = true;
    }

    update(speedX, speedY){
        for(let combo of this.combos){
            combo.update(this.x, this.y);
        }

        this.x += speedX;
        this.y += speedY;
    }

    checkIntersection(player){
        let intersect = false,
            combos = this.combos,
            index = 0,
            playerPositions = player.getIntersectionVars();

        intersectLoop:
        for(var y = 0; y < 15; y++) {

            for(var x = 0; x < 20; x++) {
                if(index >= combos.length){
                    break intersectLoop;
                }

                let combo = combos[index];

                if(combo.solid == 1 && combo.intersect(player, playerPositions)){
                    intersect = true;
                    break intersectLoop;
                }

                index++;
            }
        }

        return intersect;
    }

    draw(engine){
        //Call draw on every combo
        for(let combo of this.combos){
            combo.draw(engine);
        }
    }
}

export default Screen;