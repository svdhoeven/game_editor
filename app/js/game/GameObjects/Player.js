import GameObject from '../CoreObjects/GameObject';

class Player extends GameObject{
    constructor(x, y, texture){
        super(x, y, texture, 0, 0, 16, 16);

        this.defineActions();

        this.direction = 2;
        this.action = false;
        this.speedX = 3;
        this.speedY = 3;

        this.animationFrame = 0;
        this.animationMaxFrames = 3;
        this.fps = 6;
        this.frame = 0;
    }

    defineActions(){
        this.actions = {
            none: 0,
            walking: 1,
            intersect: 2,
        }
    }

    setAction(e){
        if(this.action == this.actions.none){
            switch(e.keyCode){
                //Up
                case 38:
                    this.action = this.actions.walking;
                    this.direction = 0;
                    break;

                //Right
                case 39:
                    this.action = this.actions.walking;
                    this.direction = 1;
                    break;

                //Down
                case 40:
                    this.action = this.actions.walking;
                    this.direction = 2;
                    break;

                //Left
                case 37:
                    this.action = this.actions.walking;
                    this.direction = 3;
                    break;

                default:
                    this.unsetAction();
                    break;
            }
        }
    }

    unsetAction(e){
        this.action = this.actions.none;
    }

    update(canvas, intersect){
        if(this.action == this.actions.walking){
            this.sourceY = this.direction * 16;

            if(this.frame % this.fps == 0){
                this.animationFrame = this.animationFrame < this.animationMaxFrames ? this.animationFrame + 1 : 0;
                this.sourceX = this.animationFrame * 16;
            }

            this.frame++;

            if(intersect) {
                return;
            }

            switch(this.direction){
                case 0:
                    if(this.y > 0){
                        this.y -= this.speedY;
                    }
                    else{
                        this.y = 0;
                    }

                    break;

                case 1:
                    if (this.x + this.width < canvas.width) {
                        this.x += this.speedX;
                    }
                    else {
                        this.x = canvas.width - this.width;
                    }

                    break;

                case 2:
                    if (this.y + this.height < canvas.height) {
                        this.y += this.speedY;
                    }
                    else {
                        this.y = canvas.height - this.height;
                    }

                    break;

                case 3:
                    if (this.x > 0) {
                        this.x -= this.speedX;
                    }
                    else {
                        this.x = 0;
                    }

                    break;
            }
        }
    }

    draw(engine){
        super.draw(engine);
    }
}

export default Player;