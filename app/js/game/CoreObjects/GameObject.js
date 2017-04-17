import SpriteManager from './SpriteManager';

class GameObject{
    constructor(x, y, sprite, sourceX, sourceY, width, height){
        //Load image
        this.loaded = false;
        this.sprite = SpriteManager.getInstance().getSprite(sprite);

        //Set fields
        this.x = x;
        this.y = y;
        this.sourceX = sourceX;
        this.sourceY = sourceY;

        if(width == null){
            this.width = this.image.width;
        }
        else{
            this.width = width;
        }

        if(height == null){
            this.height = this.image.height;
        }
        else{
            this.height = height;
        }
    }

    update(){}

    draw(engine){
        engine.drawImage(
            this.sprite,
            this.sourceX,
            this.sourceY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }


}

export default GameObject;