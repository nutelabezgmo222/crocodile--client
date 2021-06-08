import Brush from "./Brush";
export default class Eraser extends Brush {
    constructor(canvas, socket) {
        super(canvas, socket);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.emit("draw", {
                type: "eraser",
                x: e.pageX - this.areaBlock.offsetLeft,
                y: e.pageY - this.areaBlock.offsetTop,
                lineWidh: this.lineWidth,
            });
        }
    }
    
    static draw(ctx, x, y) {
        ctx.strokeStyle = "#fff";
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
