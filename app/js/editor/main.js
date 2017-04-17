import _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery';
import {Events} from 'backbone';

//Collections
import Tiles from './collections/Tiles';
import Combos from './collections/Combos';

//Views
import TileList from './views/TileList';
import ScreenView from './views/ScreenView';

import '../../sass/main.scss';

window.$ = $;
window.jQuery = jQuery;

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();

        Backbone.history.start();

        $(window).on('resize', resizeHandler);

        let tiles = new Tiles();
        let combos = new Combos();
        new TileList({el: '.tileList', collection: tiles});
        new ScreenView({el: '.screen', collection: combos});
    };

    let resizeHandler = function(){
        Backbone.trigger('resize');
    };

    window.addEventListener('load', init);
})();