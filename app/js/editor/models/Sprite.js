import {Model} from 'backbone';

/**
 * Model for every Sprite
 *
 * @constructor
 */
const Sprite = Model.extend({
    defaults: {
        source: ''
    },

    urlRoot: './../api/editor/sprite.php',
    url: './../api/editor/sprite.php'
});

export default Sprite;