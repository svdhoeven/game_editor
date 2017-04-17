import {View} from 'backbone';
import _ from 'underscore';
import Tile from './../models/Tile';

const ScreenView = View.extend({
    template: null,
    currentTileSource: 'blank',
    currentTileId: 0,

    events: {
        'click td': 'clickComboHandler'
    },

    initialize: function(){
        this.template = _.template(this.$('#tpl_screen').html());

        this.getScreen();

        //todo bepaal welk scherm dit is van welke map

        this.listenTo(Backbone, 'refreshScreen', this.getScreen);
        this.listenTo(Backbone, 'tileSelected', this.changeTile);
    },

    clickComboHandler: function(e){
        let $target = $(e.currentTarget),
            comboId = $target.data('id');

        if(comboId <= 0){
            return;
        }

        let combo = this.collection.get(comboId);
        combo.save(
            {
                tile: this.currentTileId,
                source: this.currentTileSource
            },
            {
                success: this.updateComboSuccessHandler.bind(this)
            }
        );

        //$target.find('img').attr('src', '../public/img/sprites/' + this.currentTile.attributes.source + '.png');
    },

    updateComboSuccessHandler: function(comboData){
        let combo = this.$el.find('td[data-id = ' + comboData.attributes.id + ']');

        if(combo.length > 0){
            combo.find('img').attr('src', '../public/img/sprites/' + comboData.attributes.source + '.png');
        }
    },

    changeTile: function(tile){
        if(tile instanceof Tile) {
            this.currentTileId = tile.attributes.id;
            this.currentTileSource = tile.attributes.source;
        }
        else{
            this.currentTileId = 0;
            this.currentTileSource = 'blank';
        }
    },

    getScreen: function(){
        this.collection.fetch({
            reset: true,
            data: $.param({screen: 2}),
            success: (collection) => this.getScreenSuccessHandler(collection),
        });
    },

    getScreenSuccessHandler: function(collection){
        this.$el.html(this.template({combos: collection.models}));
    },
});

export default ScreenView;