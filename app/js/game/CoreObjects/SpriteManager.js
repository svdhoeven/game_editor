let instance = null;

/**
 * Singleton SpriteManager
 * Keeps track of which sprites have been made already
 * So we can reuse these sprites and save some performance
 */
class SpriteManager{

    constructor(){
        this.sprites = {};

        instance = this;
    }

    getSprite(spriteIdentifier){
        if(this.sprites.hasOwnProperty(spriteIdentifier)){
            return this.sprites[spriteIdentifier];
        }
        else{
            let sprite = new Image();
            sprite.src = 'img/sprites/' + spriteIdentifier + '.png';
            this.sprites[spriteIdentifier] = sprite;
            return sprite;
        }
    }

    static getInstance(){
        return instance;
    }
}

export default SpriteManager;
