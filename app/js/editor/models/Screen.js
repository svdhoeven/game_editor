import {Model} from 'backbone';

/**
 * Model for every Screen
 *
 * @constructor
 */
const Screen = Model.extend({
    defaults: {
        x: 0,
        y: 0,
        map: 0
    },

    urlRoot: './../api/editor/screen.php',
    url: './../api/editor/screen.php'
});

export default Screen;