import GameObject from '../CoreObjects/GameObject';

class Player extends GameObject{
    constructor(x, y, sprite){
        super(x, y, sprite, 0, 0, 32, 32);

        this.defineActions();

        this.direction = 2;
        this.action = false;
        this.speedX = 4;
        this.speedY = 4;

        this.animationFrame = 0;
        this.animationMaxFrames = 3;
        this.fps = 5;
        this.frame = 0;
    }

    defineActions(){
        this.actions = {
            none: 0,
            walking: 1,
            intersect: 2,
            transition: 3,
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
        if(this.action == this.actions.transition) return;

        this.action = this.actions.none;
    }

    update(canvas, intersect){
        if(this.action == (this.actions.walking || this.actions.transition)){
            this.sourceY = this.direction * 32;

            if(this.frame % this.fps == 0){
                this.animationFrame = this.animationFrame < this.animationMaxFrames ? this.animationFrame + 1 : 0;
                this.sourceX = this.animationFrame * 32;
            }

            this.frame++;
        }

        if(this.action == this.actions.walking){


            if(intersect || this.action == this.actions.intersect) {
                return;
            }

            switch(this.direction){
                case 0:
                    if(this.y > 0){
                        this.y -= this.speedY;
                    }
                    else{
                        this.y = 0;
                        this.action = this.actions.transition;
                    }

                    break;

                case 1:
                    if (this.x + this.width < canvas.width) {
                        this.x += this.speedX;
                    }
                    else {
                        this.x = canvas.width - this.width;
                        this.action = this.actions.transition;
                    }

                    break;

                case 2:
                    if (this.y + this.height < canvas.height) {
                        this.y += this.speedY;
                    }
                    else {
                        this.y = canvas.height - this.height;
                        this.action = this.actions.transition;
                    }

                    break;

                case 3:
                    if (this.x > 0) {
                        this.x -= this.speedX;
                    }
                    else {
                        this.x = 0;
                        this.action = this.actions.transition;
                    }

                    break;
            }
        }
    }

    draw(engine){
        super.draw(engine);
    }

    getIntersectionVars(){
        var speedX = 0,
            speedY = 0;

        switch(this.direction){
            case 0:
                speedY = this.speedY * -1;
                break;

            case 1:
                speedX = this.speedX;
                break;

            case 2:
                speedY = this.speedY;
                break;

            case 3:
                speedX = this.speedX * -1;
                break;
        }

        return {
            x: this.x + speedX,
            y: this.y + speedY
        };
    }

    transition(transitionSpeedX, transitionSpeedY){
        this.x += transitionSpeedX;
        this.y += transitionSpeedY;
    }
}

export default Player;