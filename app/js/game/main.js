/** Imports */
//CoreObjects
import Canvas from './CoreObjects/Canvas';
import SpriteManager from './CoreObjects/SpriteManager';

//GameObjects
import Screen from './GameObjects/Screen';
import Player from './GameObjects/Player';

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
    player = new Player(608, 128, 'player');
    $(document).on('keydown', e => player.setAction(e));
    $(document).on('keyup', e => player.unsetAction(e));

    currentScreen = new Screen(2);

    //Init game loop
    setInterval(function() {
        update(canvas);
        draw();
    }, 1000/fps);
}

function update(canvas){

    let intersect = false,
        combos = currentScreen.getScreen(),
        index = 0,
        playerPositions = player.getIntersectionVars();

    intersectLoop:
    for(var y = 0; y < 15; y++) {

        for(var x = 0; x < 20; x++) {
            if(index >= combos.length){
                break intersectLoop;
            }

            let combo = combos[index];

            if(combo.solid == 1 && combo.intersect(player, playerPositions)){
                intersect = true;
                break intersectLoop;
            }

            index++;
        }
    }

    player.update(canvas, intersect);
}


function draw(){
    engine.clearRect(0, 0, canvas.width, canvas.height);

    let combos = currentScreen.getScreen();

    for(let combosIndex = 0; combosIndex < combos.length; combosIndex++){
        let combo = combos[combosIndex];
        combo.draw(engine);
    }

    player.draw(engine);
}