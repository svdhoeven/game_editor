import _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery';
import {Events} from 'backbone';

//Views

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
    };

    let resizeHandler = function(){
        Backbone.trigger('resize');
    };

    window.addEventListener('load', init);
})();