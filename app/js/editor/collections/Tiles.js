import {Collection} from 'backbone';
import Tile from './../models/Tile';

/**
 * Collection for the Tiles endpoint
 *
 * @constructor
 */
const Tiles = Collection.extend({
    model: Tile,
    urlRoot: './../api/editor/tile.php',
    url: './../api/editor/tile.php'
});

export default Tiles;
