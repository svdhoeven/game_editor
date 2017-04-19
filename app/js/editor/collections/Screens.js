import {Collection} from 'backbone';
import Screen from './../models/Screen';

/**
 * Collection for the Screens endpoint
 *
 * @constructor
 */
const Screens = Collection.extend({
    model: Screen,
    urlRoot: './../api/editor/screen.php',
    url: './../api/editor/screen.php'
});

export default Screens;
