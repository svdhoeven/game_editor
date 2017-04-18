import {View} from 'backbone';
import _ from 'underscore';

const SpriteList = View.extend({
    template: null,

    events: {

    },

    initialize: function(){
        this.template = _.template(this.$('#tpl_spriteList').html());

        this.getSprites();

        this.listenTo(Backbone, 'refreshSprites', this.getSprites);
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

export default SpriteList;