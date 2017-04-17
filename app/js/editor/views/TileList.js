import {View} from 'backbone';
import _ from 'underscore';

const TileList = View.extend({
    template: null,
    currentCollection: null,

    events: {
        'click li': 'tileClickHandler'
    },

    initialize: function(){
        this.template = _.template(this.$('#tpl_tileList').html());

        this.getTiles();

        this.listenTo(Backbone, 'refreshTiles', this.getTiles);
    },

    getTiles: function(){
        this.collection.fetch({
            reset: true,
            success: (collection) => this.getTilesSuccessHandler(collection),
        });
    },

    getTilesSuccessHandler: function(collection){
        this.currentCollection = collection.models;

        this.$el.html(this.template({tiles: collection.models}));
    },

    tileClickHandler: function(e){
        let $target = $(e.currentTarget),
            tile = this.currentCollection[$target.data('id') - 1];

        if(tile == undefined){
            console.log('tile doesnt exist');
            return;
        }

        this.$el.find('.selected').removeClass('selected');

        $target.addClass('selected');

        Backbone.trigger('tileSelected', tile);
    }
});

export default TileList;