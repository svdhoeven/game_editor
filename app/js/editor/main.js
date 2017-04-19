import _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery';
import {Events} from 'backbone';

//Collections
import Tiles from './collections/Tiles';
import Combos from './collections/Combos';
import Sprites from './collections/Sprites';
import Screens from './collections/Screens';

//Views
import TileList from './views/TileList';
import ScreenView from './views/ScreenView';
import TileEditor from './views/TileEditor';
import SpriteSelect from './views/SpriteSelect';
import SpriteList from './views/SpriteList';
import ScreenTable from './views/ScreenTable';

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

        let $tileList = $('.tileList'),
            $screenView = $('.screen'),
            $tileEditor = $('.tileEditor'),
            $spriteSelect = $('.sprite_select_wrapper'),
            $spriteList = $('.spriteList'),
            $screenTable = $('.screenTable');

        let tiles = new Tiles(),
            sprites = new Sprites();

        if($tileList.length > 0){
            new TileList({el: $tileList, collection: tiles});
        }

        if($screenView.length > 0){
            new ScreenView({el: $screenView, collection: new Combos()});
        }

        if($tileEditor.length > 0){
            new TileEditor({el: $tileEditor, collection: tiles});
        }

        if($spriteSelect.length > 0){
            new SpriteSelect({el: $spriteSelect, collection: sprites});
        }

        if($spriteList.length > 0){
            new SpriteList({el: $spriteList, collection: sprites});
        }

        if($screenTable.length > 0){
            new ScreenTable({el: $screenTable, collection: new Screens()});
        }
    };

    let resizeHandler = function(){
        Backbone.trigger('resize');
    };

    window.addEventListener('load', init);
})();