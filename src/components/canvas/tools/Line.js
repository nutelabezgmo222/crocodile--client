import Tool from './Tool';

export default class Line extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen();
    }
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.ctx.strokeStyle = "#000";
    }
    mouseUpHandler(e) {
        this.mouseDown = false;
        const currentX = e.pageX - this.areaBlock.offsetLeft;
        const currentY = e.pageY - this.areaBlock.offsetTop;

        this.socket.emit("draw", {
          type: "line",
          x1: this.startX,
          y1: this.startY,
          x2: currentX,
          y2: currentY,
          strokeStyle: this.strokeStyle,
          lineWidth: this.lineWidth,
        });
        
        this.socket.emit("draw", {
          type: "finish",
        });
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();

        this.startX = e.pageX - this.areaBlock.offsetLeft;
        this.startY = e.pageY - this.areaBlock.offsetTop;
        this.saved = this.canvas.toDataURL();

        this.ctx.moveTo(this.startX, this.startY);
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const currentX = e.pageX - this.areaBlock.offsetLeft;
            const currentY = e.pageY - this.areaBlock.offsetTop;
            this.draw(currentX, currentY);
        }
    }
    draw(x, y) {
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
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        };
    }
    static draw(ctx, x1, y1, x2, y2, strokeStyle, lineWidth) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}