import {View} from 'backbone';
import Tile from './../models/Tile';

const TileEditor = View.extend({
    currentTile: null,
    createLabelText: 'Create new tile: ',
    createSubmitText: 'Create tile',
    editLabelText: 'Done editing tile: ',
    editSubmitText: 'Update tile',
    $labelSubmit: null,
    $inputSubmit: null,
    $deleteTileWrapper: null,
    $solidInput: null,

    events: {
        'submit': 'submitHandler'
    },

    initialize: function(){
        this.listenTo(Backbone, 'tileSelected', this.tileSelectedHandler);

        this.$deleteTileWrapper = this.$el.find('.deleteTile_wrapper');
        this.$inputSubmit = this.$el.find('#input_submit');
        this.$labelSubmit = this.$inputSubmit.prev('label');
        this.$solidInput = this.$el.find('#input_solid');
    },

    tileSelectedHandler: function(tile){
        if(tile instanceof Tile){
            this.$inputSubmit.val(this.editSubmitText);
            this.$labelSubmit.html(this.editLabelText);
            this.$deleteTileWrapper.show();

            if(tile.attributes.solid == 1){
                this.$solidInput.prop('checked', true);
            }
            else{
                this.$solidInput.prop('checked', false);
            }

            this.currentTile = tile;
        }
        else{
            this.$inputSubmit.val(this.createSubmitText);
            this.$labelSubmit.html(this.createLabelText);
            this.$deleteTileWrapper.hide();
            this.$solidInput.prop('checked', false);

            this.currentTile = null;
        }
    },

    submitHandler: function(e){
        e.preventDefault();

        let $submit = this.$el.find("input[type=submit]:focus"),
            $spriteInput = this.$el.find('#input_sprite'),
            spriteValue = $spriteInput.val(),
            solidValue = 0;

        //If it's a delete, delete the tile
        if($submit.length > 0 && $submit.attr('id') == 'input_delete'){
            this.deleteTile();
        }
        //Otherwise it might be a post or put
        else{
            if(spriteValue == 'default' || spriteValue == undefined){
                alert('Select a sprite, "' + spriteValue + '" is not a sprite');
                return;
            }

            if(this.$solidInput.is(':checked')){
                solidValue = 1;
            }

            //We be making a new one mon
            if(this.currentTile == null){
                this.postTile(spriteValue, solidValue);
            }
            //Editing an existing tile
            else{
                this.putTile(spriteValue, solidValue);
            }
        }
    },

    postTile: function(spriteId, solid){
        this.collection.create(
            {
                sprite: spriteId,
                type: 0,
                solid: solid
            },
            {
                complete: this.postTileSuccessHandler
            }
        );
    },

    postTileSuccessHandler: function(){
        Backbone.trigger('refreshTiles');
    },

    deleteTile: function(){
        if(this.currentTile instanceof Tile){

            this.currentTile.destroy({
                success: this.deleteTileSuccessHandler,
                headers : {
                    id : this.currentTile.attributes.id
                }
            });

        }
    },

    deleteTileSuccessHandler: function(){
        Backbone.trigger('refreshTiles');
        Backbone.trigger('tileSelected', 'deleted');
    },

    putTile: function(spriteId, solid){
        this.currentTile.save(
            {
                sprite: spriteId,
                type: 0,
                solid: solid
            },
            {
                success: this.putTileSuccessHandler
            }
        );
    },

    putTileSuccessHandler: function(){
        Backbone.trigger('refreshTiles', 'put');
    }
});

export default TileEditor;