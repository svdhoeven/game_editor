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
        this.playerScrollX = 0;
        this.playerScrollY = 0;
        this.justScrolled = false;

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

    scrollMap(player){
        let frames  = 40,
            x       = parseInt(this.currentScreen.originX),
            y       = parseInt(this.currentScreen.originY);

        switch(player.direction){
            case 0:
                if(this.screens.hasOwnProperty((y - 1).toString()) && this.screens[y - 1].hasOwnProperty(x.toString()) && this.screens[y - 1][x] instanceof Screen && this.screens[y - 1][x].ready){
                    this.currentScreen = this.screens[y - 1][x];

                    this.needToScroll = 480;
                    this.playerScrollY = (this.needToScroll - player.height) / frames ;
                    this.scrollSpeed = this.needToScroll / frames;
                    this.speedY = this.scrollSpeed;
                }
                break;

            case 1:
                if(this.screens.hasOwnProperty(y.toString()) && this.screens[y].hasOwnProperty((x + 1).toString()) && this.screens[y][x + 1] instanceof Screen && this.screens[y][x + 1].ready) {
                    this.currentScreen = this.screens[y][x + 1];

                    this.needToScroll = 640;
                    this.playerScrollX = (this.needToScroll - player.width) / frames * -1;
                    this.scrollSpeed = this.needToScroll / frames;
                    this.speedX = this.scrollSpeed * -1;
                }
                break;

            case 2:
                if(this.screens.hasOwnProperty((y + 1).toString()) && this.screens[y + 1].hasOwnProperty(x.toString()) && this.screens[y + 1][x] instanceof Screen && this.screens[y + 1][x].ready) {
                    this.currentScreen = this.screens[y + 1][x];

                    this.needToScroll = 480;
                    this.playerScrollY = (this.needToScroll - player.height) / frames * -1;
                    this.scrollSpeed = this.needToScroll / frames;
                    this.speedY = this.scrollSpeed * -1;
                }
                break;

            case 3:
                if(this.screens.hasOwnProperty(y.toString()) && this.screens[y].hasOwnProperty((x - 1).toString()) && this.screens[y][x - 1] instanceof Screen && this.screens[y][x - 1].ready) {
                    this.currentScreen = this.screens[y][x - 1];

                    this.needToScroll = 640;
                    this.playerScrollX = (this.needToScroll - player.width) / frames;
                    this.scrollSpeed = this.needToScroll / frames;
                    this.speedX = this.scrollSpeed;
                }
                break;
        }
    }

    update(player){
        let intersect = false;

        if(player.action == player.actions.transition && this.justScrolled == false && this.needToScroll == 0){
            this.scrollMap(player);

            if(this.needToScroll == 0){
                player.action = player.actions.none;
            }
        }

        if(this.needToScroll > 0){
            this.needToScroll -= this.scrollSpeed;

            player.transition(this.playerScrollX, this.playerScrollY);

            this.justScrolled = true;
        }
        else if(this.justScrolled){
            this.loadAdjacentScreens();
            player.action = player.actions.none;
            this.justScrolled = false;

            //Reset scrolling fields
            this.needToScroll = 0;
            this.scrollSpeed = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.playerScrollX = 0;
            this.playerScrollY = 0;
        }
        else{
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
