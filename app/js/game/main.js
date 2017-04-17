/** Imports */
//CoreObjects
import Canvas from './CoreObjects/Canvas';
import SpriteManager from './CoreObjects/SpriteManager';

//GameObjects
import Screen from './GameObjects/Screen';

/** Set global scope variables */
//Core variables
var canvas,
    engine,
    fps = 30;

//GameObjects variables
var player,
    currentScreen;

$(init);

/**
 * Initializes the Canvas object and starts the game loop
 *
 */
function init(){
    //Init canvas
    canvas = new Canvas();
    canvas.$el.appendTo('main');
    engine = canvas.$el.get(0).getContext('2d');

    //Init singleton SpriteManager
    new SpriteManager();

    //Init gameObjects
    // player = new Player(136, 96, 'player');
    // $(document).on('keydown', e => player.setAction(e));
    // $(document).on('keyup', e => player.unsetAction(e));

    currentScreen = new Screen(2);

    //Init game loop
    setInterval(function() {
        update(canvas);
        draw();
    }, 1000/fps);
}

function update(canvas){

    // let intersect = false;
    //
    // rowLoop:
    // for(var y = 0; y < map.length; y++) {
    //     var row = map[y];
    //     for(var x = 0; x < row.length; x++) {
    //         let tile = row[x];
    //
    //         if(tile.solid){
    //             intersect = tile.intersect(player);
    //
    //             if(intersect){
    //                 break rowLoop;
    //             }
    //         }
    //     }
    // }
    //
    // player.update(canvas, intersect);
}


function draw(){
    engine.clearRect(0, 0, canvas.width, canvas.height);

    let combos = currentScreen.getScreen();

    for(let combosIndex = 0; combosIndex < combos.length; combosIndex++){
        let combo = combos[combosIndex];
        combo.draw(engine);
    }
}