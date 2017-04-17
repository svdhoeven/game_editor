import {Collection} from 'backbone';
import Combo from './../models/Combo';

/**
 * Collection for the Combos endpoint
 *
 * @constructor
 */
const Combos = Collection.extend({
    model: Combo,
    urlRoot: './../api/editor/combo.php',
    url: './../api/editor/combo.php'
});

export default Combos;
