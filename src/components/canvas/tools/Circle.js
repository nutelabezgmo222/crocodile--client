import Tool from "./Tool";

export default class Circle extends Tool {
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
    const currentX = e.pageX - this.areaBlock.offsetLeft;
    const currentY = e.pageY - this.areaBlock.offsetTop;
    const radius = Math.pow(
      (currentX - this.startX) ** 2 + (currentY - this.startY) ** 2,
      0.5
    );

    this.socket.emit("draw", {
      type: "circle",
      x: this.startX,
      y: this.startY,
      r: radius,
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
      const radius = Math.pow(
        (currentX - this.startX) ** 2 + (currentY - this.startY) ** 2,
        0.5
      );
      this.draw(this.startX, this.startY, radius);
    }
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.stroke();
    };
  }

  static draw(ctx, x, y, r, strokeStyle, lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
  }
}
