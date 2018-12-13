export default class GameLife {
    constructor(color, ctx, row, col, size) {
      this.currentState = color;
      this.ctx = ctx;
      this.row = row;
      this.col = col;
      this.size = size;
    }
  
    draw() {
      this.ctx.beginPath();
      let x = this.col * this.size;
      let y = this.row * this.size;
      this.ctx.fillStyle = this.currentState;
      this.ctx.fillRect(x, y, this.size, this.size);
      this.ctx.strokeStyle = "orange";
      this.ctx.strokeRect(x, y, this.size, this.size);
    }
  }