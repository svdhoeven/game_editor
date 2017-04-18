import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

const TileList = View.extend({
    template: null,
    currentCollection: null,
    currentTileId: 0,

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

    getTiles: function(data){
        if(data == 'put'){
            //Hoi
        }
        else{
            this.currentTileId = 0;
        }

        this.collection.fetch({
            reset: true,
            success: (collection) => this.getTilesSuccessHandler(collection),
        });
    },

    getTilesSuccessHandler: function(collection){
        this.currentCollection = collection.models;

        this.$el.html(this.template({tiles: collection.models}));

        if(this.currentTileId > 0){
            let tile = this.currentCollection[this.currentTileId - 1];
            Backbone.trigger('tileSelected', tile);
        }
    },

    tileClickHandler: function(e){
        let $target = $(e.currentTarget),
            tile = this.currentCollection[$target.data('id') - 1];

        this.currentTileId = $target.data('id');

        if(tile == undefined || $target.hasClass('selected')){
            Backbone.trigger('tileSelected', 'blank');
            return;
        }

        Backbone.trigger('tileSelected', tile);
    }
});

export default TileList;