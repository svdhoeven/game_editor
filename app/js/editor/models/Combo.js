import {Model} from 'backbone';

/**
 * Model for every Combo
 *
 * @constructor
 */
const Combo = Model.extend({
    defaults: {
        sprite: 0,
        type: 0,
        solid: 0,
        source: ''
    },

    urlRoot: './../api/editor/combo.php',
    url: './../api/editor/combo.php'
});

export default Combo;