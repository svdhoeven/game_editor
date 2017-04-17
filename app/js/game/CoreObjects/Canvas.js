class Canvas{
    constructor(){
        this.width = 640;
        this.height = 480;

        this.$el = $("<canvas width='" + this.width +
            "' height='" + this.height + "'></canvas>").css({
            width: this.width,
            height: this.height
        });
    }
}

export default Canvas;