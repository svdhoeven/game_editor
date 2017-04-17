import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

const TileEditor = View.extend({
    template: null,

    events: {
        'submit': 'submitHandler'
    },

    initialize: function(){
        this.template = _.template(this.$('#tpl_spriteSelect').html());

        this.getSprites();

        this.listenTo(Backbone, 'refreshSprites', this.getSprites);
        this.listenTo(Backbone, 'tileSelected', this.tileSelectedHandler);
    },

    tileSelectedHandler: function(tile){

        if(tile instanceof Tile){
            this.$el.find('select').val(tile.attributes.sprite);
        }
        else{
            this.$el.find('select').val('default');
        }
    },

    getSprites: function(){
        this.collection.fetch({
            reset: true,
            success: (collection) => this.getSpritesSuccessHandler(collection),
        });
    },

    getSpritesSuccessHandler: function(collection){
        this.currentCollection = collection.models;

        this.$el.html(this.template({sprites: collection.models}));
    }
});

export default TileEditor;