import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

const TileInfo = View.extend({
    $sourceValue: null,
    $solidValue: null,
    $screenValue: null,
    $tileImage: null,

    initialize: function(){
        this.$tileImage = this.$el.find('img');
        this.$sourceValue = this.$el.find('.source_value');
        this.$solidValue = this.$el.find('.solid_value');
        this.$screenValue = this.$el.find('.screen_value');

        this.listenTo(Backbone, 'tileSelected', this.tileSelectedHandler);
        this.listenTo(Backbone, 'refreshScreenInfo', this.refreshScreenHandler);
    },

    tileSelectedHandler: function(tile){
        if(tile == 'blank'){
            this.$sourceValue.html('blank');
            this.$solidValue.html('no');
            this.$tileImage.attr('src', '../public/img/sprites/' + 'blank' + '.png');
        }
        else {
            let value = 'no';
            if(tile.attributes.solid == 1){
                value = 'yes';
            }

            this.$sourceValue.html(tile.attributes.source);
            this.$solidValue.html(value);
            this.$tileImage.attr('src', '../public/img/sprites/' + tile.attributes.source + '.png');
        }
    },

    refreshScreenHandler: function(screenPositions){
        this.$screenValue.html(screenPositions.x + ' x ' + screenPositions.y);
    }
});

export default TileInfo;