import Tool from "./Tool";

export default class Rect extends Tool {
  constructor(canvas, socket) {
    super(canvas, socket);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.emit("draw", {
      type: "rect",
      x: this.startX,
      y: this.startY,
      width: e.pageX - this.areaBlock.offsetLeft - this.startX,
      height: e.pageY - this.areaBlock.offsetTop - this.startY,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
    });
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    
    this.ctx.beginPath();

    this.startX = e.pageX - this.areaBlock.offsetLeft;
    this.startY = e.pageY - this.areaBlock.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.pageX - this.areaBlock.offsetLeft;
      const currentY = e.pageY - this.areaBlock.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }
  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.stroke();
    }
  }
  static draw(ctx, x, y, w, h, strokeStyle, lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.beginPath();
  }
}
