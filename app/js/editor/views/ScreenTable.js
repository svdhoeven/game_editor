import {View} from 'backbone';
import _ from 'underscore';

const ScreenTable = View.extend({
    template: null,
    currentX: 0,
    currentY: 0,
    currentMap: 1,
    busy: false,

    events: {
        'click td': 'clickHandler'
    },

    initialize: function(){
        //todo: determine current map
        //this.currentMap = ...

        this.getAllScreens();

        this.selectScreen(this.$el.find('td:first'));

        this.listenTo(Backbone, 'refreshMap', this.getAllScreens);
    },

    getAllScreens: function(){

        this.collection.fetch({
            reset: true,
            success: this.getAllScreensSuccessHandler.bind(this),
            data: $.param({
                map: this.currentMap
            })
        });
    },

    getAllScreensSuccessHandler: function(collection){
        let screens = collection.models,
            $screenCells = this.$el.find('td'),
            screenIndex = 0;

        $screenCells.each(function(i, $cell){
            if(screenIndex >= screens.length){
                return false;
            }

            $cell = $($cell);
            let x = $cell.data('x'),
                y = $cell.data('y');

            if(screens[screenIndex].attributes.x == x && screens[screenIndex].attributes.y == y){
                $cell.addClass('created');
                screenIndex++;
            }
        });
    },

    getScreen: function(){
        this.collection.fetch({
            reset: true,
            success: this.getScreenSuccessHandler.bind(this),
            error: this.getScreenErrorHandler.bind(this),
            data: $.param({
                map: this.currentMap,
                x: this.currentX,
                y: this.currentY
            }),
        });
    },

    getScreenSuccessHandler: function(collection){
        if(collection.length > 0){
            Backbone.trigger('refreshScreen', collection.models[0].attributes.id);
        }
    },

    getScreenErrorHandler: function(){
        this.postScreen();
    },

    postScreen: function(){
        this.collection.create(
            {
                map: this.currentMap,
                x: this.currentX,
                y: this.currentY
            },
            {
                complete: this.postScreenSuccessHandler
            }
        );
    },

    postScreenSuccessHandler: function(response){
        Backbone.trigger('refreshScreen', response.responseJSON.id);
    },

    clickHandler: function(e){
        if(this.busy){
            return;
        }

        let $target = $(e.currentTarget),
            x = $target.data('x'),
            y = $target.data('y');

        if(x == this.currentX && y == this.currentY) {
            return;
        }

        this.currentX = x;
        this.currentY = y;

        this.selectScreen($target);
    },

    selectScreen: function($target){
        this.$el.find('.current').removeClass('current');
        $target.addClass('current');

        this.getScreen();
    }
});

export default ScreenTable;