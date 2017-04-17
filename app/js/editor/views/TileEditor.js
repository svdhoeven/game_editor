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

    events: {
        'submit': 'submitHandler'
    },

    initialize: function(){
        this.listenTo(Backbone, 'tileSelected', this.tileSelectedHandler);

        this.$deleteTileWrapper = this.$el.find('.deleteTile_wrapper');
        this.$inputSubmit = this.$el.find('#input_submit');
        this.$labelSubmit = this.$inputSubmit.prev('label');
    },

    tileSelectedHandler: function(tile){
        if(tile instanceof Tile){
            this.$inputSubmit.val(this.editSubmitText);
            this.$labelSubmit.html(this.editLabelText);
            this.$deleteTileWrapper.show();

            this.currentTile = tile;
        }
        else{
            this.$inputSubmit.val(this.createSubmitText);
            this.$labelSubmit.html(this.createLabelText);
            this.$deleteTileWrapper.hide();

            this.currentTile = null;
        }
    },

    submitHandler: function(e){
        e.preventDefault();

        let $submit = this.$el.find("input[type=submit]:focus"),
            $spriteInput = this.$el.find('#input_sprite'),
            spriteValue = $spriteInput.val();

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

            //We be making a new one mon
            if(this.currentTile == null){
                this.postTile(spriteValue);
            }
            //Editing an existing tile
            else{
                this.putTile(spriteValue);
            }
        }
    },

    postTile: function(spriteId){
        this.collection.create(
            {
                sprite: spriteId,
                type: 0,
                solid: 0
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

    putTile: function(spriteId){
        this.currentTile.save(
            {
                sprite: spriteId,
                type: 0,
                solid: 0
            },
            {
                success: this.putTileSuccessHandler
            }
        );
    },

    putTileSuccessHandler: function(){
        Backbone.trigger('refreshTiles');
    }
});

export default TileEditor;