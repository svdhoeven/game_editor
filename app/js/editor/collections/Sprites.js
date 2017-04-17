import {Collection} from 'backbone';
import Sprite from './../models/Sprite';

/**
 * Collection for the Sprites endpoint
 *
 * @constructor
 */
const Sprites = Collection.extend({
    model: Sprite,
    urlRoot: './../api/editor/sprite.php',
    url: './../api/editor/sprite.php'
});

export default Sprites;
