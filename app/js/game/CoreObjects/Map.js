import Screen from './Screen';

class Map{

    constructor(id){
        this.id = id;
        this.screens = [];
        this.currentScreen = null;
        this.ready = false;

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
        console.log(data);

        this.currentScreen = new Screen(2);
        this.currentScreen.loadCombos();

        this.ready = true;
    }

    loadScreen(direction){
        //todo base on direction which screen must be loaded
    }

    update(player){
        let intersect = false;

        //Update currentScreen if ready
        if(this.currentScreen.ready){
            this.currentScreen.update(player);
        }

        return intersect;
    }

    draw(engine){
        //todo draw near screens

        if(this.currentScreen.ready){
            this.currentScreen.draw(engine);
        }
    }
}

export default Map;
