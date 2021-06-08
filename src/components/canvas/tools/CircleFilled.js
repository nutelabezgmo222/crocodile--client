import Circle from "./Circle";

export default class CircleFilled extends Circle {

    mouseUpHandler(e) {
        this.mouseDown = false;
        const currentX = e.pageX - this.areaBlock.offsetLeft;
        const currentY = e.pageY - this.areaBlock.offsetTop;
        const radius = Math.pow(
            (currentX - this.startX) ** 2 + (currentY - this.startY) ** 2,
            0.5
        );

        this.socket.emit("draw", {
          type: "circleFilled",
          x: this.startX,
          y: this.startY,
          r: radius,
          strokeStyle: this.strokeStyle,
        });
    }

    draw(x, y, r) {
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
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }
    static draw(ctx, x, y, r, strokeStyle) {
        ctx.fillStyle = strokeStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
    }
}




