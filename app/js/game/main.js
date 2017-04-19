/** Imports */
//CoreObjects
import Canvas from './CoreObjects/Canvas';
import SpriteManager from './CoreObjects/SpriteManager';
import Map from './CoreObjects/Map';

//GameObjects
import Player from './GameObjects/Player';

/** Set global scope variables */
//Core variables
var canvas,
    engine,
    fps = 30;

//GameObjects variables
var player,
    map;

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

    map = new Map(1);

    //Init game loop
    setInterval(function() {
        update(canvas);
        draw();
    }, 1000/fps);
}

function update(canvas){
    let intersect = false;

    if(map.ready){
        intersect = map.update(player);
    }

    player.update(canvas, intersect);
}


function draw(){
    engine.clearRect(0, 0, canvas.width, canvas.height);

    if(map.ready){
        map.draw(engine);
    }

    player.draw(engine);
}