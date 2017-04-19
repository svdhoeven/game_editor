import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

const TileList = View.extend({

    initialize: function(){
        this.listenTo(Backbone, 'showLoader', this.showLoader);
        this.listenTo(Backbone, 'hideLoader', this.hideLoader);
    },

    showLoader: function(){
        this.$el.removeClass('hidden');
    },

    hideLoader: function(){
        this.$el.addClass('hidden');
    }
});

export default TileList;