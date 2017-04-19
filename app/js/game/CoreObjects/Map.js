import Screen from './Screen';

class Map{

    constructor(id){
        this.id = id;
        this.screens = this.initScreens();
        this.currentScreen = null;
        this.ready = false;
        this.needToScroll = 0;
        this.scrollSpeed = 0;
        this.speedX = 0;
        this.speedY = 0;

        this.loadScreens();
    }

    loadScreens(){
        $.ajax({
            url: './api/game/screen.php?map=' + this.id,
            method: 'get',
            success: this.loadScreensSuccessHandler.bind(this)
        })
    }

    loadScreensSuccessHandler(data){
        for(let screenData of data){
            this.screens[screenData.y][screenData.x] = new Screen(screenData.id, screenData.x, screenData.y);
        }

        this.currentScreen = this.screens[0][0];
        this.currentScreen.loadCombos();

        this.loadAdjacentScreens();

        this.ready = true;
    }

    loadAdjacentScreens(){
        let x = parseInt(this.currentScreen.originX),
            y = parseInt(this.currentScreen.originY),
            potentialScreens = [];

        if(this.screens.hasOwnProperty((y - 1).toString()) && this.screens[y - 1].hasOwnProperty(x.toString())){
            potentialScreens.push(this.screens[y - 1][x]);
        }

        if(this.screens.hasOwnProperty(y.toString())){

            if(this.screens[y].hasOwnProperty((x - 1).toString())){
                potentialScreens.push(this.screens[y][x - 1]);
            }

            if(this.screens[y].hasOwnProperty((x + 1).toString())){
                potentialScreens.push(this.screens[y][x + 1]);
            }
        }

        if(this.screens.hasOwnProperty((y + 1).toString()) && this.screens[y + 1].hasOwnProperty(x.toString())){
            potentialScreens.push(this.screens[y + 1][x]);
        }

        potentialScreens.forEach(
            function(screen){
                if(screen instanceof Screen){
                    screen.loadCombos();
                }
            }
        );
    }

    scrollMap(direction){
        let frames = 20;

        switch(direction){
            case 0:
                this.needToScroll = 480;
                this.scrollSpeed = this.needToScroll / frames;
                this.speedY = this.scrollSpeed;
                break;

            case 1:
                this.needToScroll = 640;
                this.scrollSpeed = this.needToScroll / frames;
                this.speedX = this.scrollSpeed * -1;
                break;

            case 2:
                this.needToScroll = 480;
                this.scrollSpeed = this.needToScroll / frames;
                this.speedY = this.scrollSpeed * -1;
                break;

            case 3:
                this.needToScroll = 640;
                this.scrollSpeed = this.needToScroll / frames;
                this.speedX = this.scrollSpeed;
                break;
        }
    }

    update(player){
        let intersect = false;

        if(this.needToScroll > 0){
            this.needToScroll -= this.scrollSpeed;
        }
        else{
            this.needToScroll = 0;
            this.scrollSpeed = 0;
            this.speedX = 0;
            this.speedY = 0;

            //Update currentScreen if ready
            if(this.currentScreen.ready){
                intersect = this.currentScreen.checkIntersection(player);
            }
        }

        for(let y = 0; y < 8; y++){
            let row = this.screens[y];

            for(let x = 0; x < 16; x++){
                let screen = row[x];

                if(screen instanceof Screen){
                    screen.update(this.speedX, this.speedY);
                }
            }
        }

        return intersect;
    }

    draw(engine){
        for(let y = 0; y < 8; y++){
            let row = this.screens[y];

            for(let x = 0; x < 16; x++){
                let screen = row[x];

                if(screen instanceof Screen && screen.ready){
                    screen.draw(engine);
                }
            }
        }
    }

    initScreens(){
        let screens = {};

        for(let y = 0; y < 8; y++){
            let row = {};

            for(let x = 0; x < 16; x++){
                row[x] = null;
            }

            screens[y] = row;
        }

        return screens;
    }
}

export default Map;
