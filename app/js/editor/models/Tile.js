import {Model} from 'backbone';

/**
 * Model for every Tile
 *
 * @constructor
 */
const Tile = Model.extend({
    defaults: {
        sprite: 0,
        type: 0,
        solid: 0,
        source: ''
    },

    urlRoot: './../api/editor/tile.php',
    url: './../api/editor/tile.php'
});

export default Tile;