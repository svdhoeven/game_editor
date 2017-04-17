import GameObject from '../CoreObjects/GameObject';

class Combo extends GameObject{
    constructor(x, y, sprite){
        super(x, y, sprite, 0, 0, 32, 32);

        this.frame = 0;
    }

    intersect(player){
        if(this.animation != false){
            if(this.frame % this.fps == 0){
                this.animationFrame = this.animationFrame < this.animationMaxFrames ? this.animationFrame + 1 : 0;
                this.sourceX = this.animationFrame * 16;
            }

            this.frame += 1;
        }

        var speedX = 0,
            speedY = 0;

        switch(player.direction){
            case 0:
                speedY = player.speedY * -1;
                break;
            case 1:
                speedX = player.speedX;
                break;
            case 2:
                speedY = player.speedY;
                break;
            case 3:
                speedX = player.speedX * -1;
                break;
        }

        let pX = player.x + speedX,
            pY = player.y + speedY;


        if(this.solid[0] && this.solid[1] && this.solid[2] && this.solid[3]){
            return !(
                pX > this.x + this.width - 2 ||
                pX + player.width < this.x + 2 ||
                pY > this.y + this.height / 2 - 2||
                pY + player.height < this.y + 2
            )
        }

        //Upper left
        if(this.solid[0] &&
            !(
                pX > this.x + this.width / 2 - 2 ||
                pX + player.width < this.x ||
                pY + this.height > this.y + this.height / 2 ||
                pY + player.height < this.y + 2
            )
        ){
            return true;
        }

        //Upper right
        if(this.solid[1] &&
            !(
                pX > this.x + this.width ||
                pX + player.width < this.x + this.width / 2 + 2 ||
                pY + this.height > this.y + this.height / 2 ||
                pY + player.height < this.y + 2
            )
        ){
            return true;
        }

        //Lower left
        if(this.solid[2] &&
            !(
                pX > this.x + this.width / 2 - 2 ||
                pX + player.width < this.x ||
                pY > this.y + this.height / 2 - 2 ||
                pY + player.height < this.y + this.height / 2 + 2
            )
        ){
            return true;
        }

        //Lower right
        if(this.solid[3] &&
            !(
                pX > this.x + this.width ||
                pX + player.width < this.x + this.width / 2 + 2 ||
                pY > this.y + this.height / 2 - 2 ||
                pY + player.height < this.y + this.height / 2 + 2
            )
        ){
            return true;
        }

        return false;
    }
}

export default Combo;