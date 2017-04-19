import GameObject from '../CoreObjects/GameObject';

class Combo extends GameObject{
    constructor(x, y, sprite, solid, screenX, screenY){
        super(x, y, sprite, 0, 0, 32, 32);

        this.drawX = x + screenX;
        this.drawY = y + screenY;
        this.frame = 0;
        this.solid = solid;
    }

    update(screenX, screenY){
        this.drawX = this.x + screenX;
        this.drawY = this.y + screenY;
    }

    intersect(player, playerPositions){
        //Example
        //pX = 32 - pW = 32
        //pY = 48 - pH = 32
        //tX = 0 - tW = 32
        //tY = 32 - tY = 32
        //Margin = 2

        //If all conditions are false, the player is intersecting with this tile
        return !(
            playerPositions.x > this.x + this.width - 2 || //32 > 0 + 32 - 2 = true
            playerPositions.x + player.width < this.x + 2 || //32 + 32 < 0 + 2 = false
            playerPositions.y > this.y + this.height / 2 - 2 || //48 > 32 + 16 - 2 = true
            playerPositions.y + player.height < this.y + 2 //48 + 32 < 32 + 2 = false
        );
    }

    draw(engine){
        engine.drawImage(
            this.sprite,
            this.sourceX,
            this.sourceY,
            this.width,
            this.height,
            this.drawX,
            this.drawY,
            this.width,
            this.height
        );
    }
}

export default Combo;