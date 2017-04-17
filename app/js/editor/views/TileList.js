import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

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
        this.listenTo(Backbone, 'tileSelected', this.tileSelectedHandler);
    },

    tileSelectedHandler: function(tile){
        this.$el.find('.selected').removeClass('selected');

        if(tile instanceof Tile){
            this.$el.find('li[data-id = ' + tile.attributes.id + ']').addClass('selected');
        }
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

        if(tile == undefined || $target.hasClass('selected')){
            Backbone.trigger('tileSelected', 'blank');
            return;
        }

        Backbone.trigger('tileSelected', tile);
    }
});

export default TileList;