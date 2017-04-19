class Canvas{
    constructor(){
        this.width = 1280;
        this.height = 960;

        this.$el = $("<canvas width='" + this.width +
            "' height='" + this.height + "'></canvas>").css({
            width: this.width,
            height: this.height
        });
    }
}

export default Canvas;