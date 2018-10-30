export default class Life {
  constructor(color, clickable, ctx, row, col, size) {
    this.currentState = color;
    this.isClickable = clickable;
    this.ctx = ctx;
    this.row = row;
    this.col = col;
    this.size = size;
  }

  draw() {
    this.ctx.beginPath();
    let x = this.col * this.size;
    let y = this.row * this.size;
    this.ctx.rect(x, y, this.size, this.size);
    this.ctx.stroke();
    if (this.currentState === "black") {
      this.ctx.fillStyle = "black";
      this.ctx.fill();
    }
  }
}
