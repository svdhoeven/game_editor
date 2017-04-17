import Combo from './Combo';

class Screen{

    constructor(screenId){
        this.combos = [];
        this.screenId = screenId;

        this.loadCombos();
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
            this.combos.push(new Combo(comboData.x * 32, comboData.y * 32, comboData.source));
        }
    }

    getScreen(){
        return this.combos;
    }
}

export default Screen;