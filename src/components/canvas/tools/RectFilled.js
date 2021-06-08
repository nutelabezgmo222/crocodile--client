import Rect from "./Rect";

export default class RectFilled extends Rect {
    mouseUpHandler(e) {
        this.mouseDown = false;

        this.socket.emit("draw", {
          type: "rectFilled",
          x: this.startX,
          y: this.startY,
          width: e.pageX - this.areaBlock.offsetLeft - this.startX,
          height: e.pageY - this.areaBlock.offsetTop - this.startY,
          strokeStyle: this.strokeStyle,
        });
    }

    draw(x, y, w, h) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }
    static draw(ctx, x, y, w, h, strokeStyle) {
        ctx.fillStyle = strokeStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
    }
}
