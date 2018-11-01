const white = "rgb(255,255,255)";
const black = "rgb(0,0,0)";

class Cell {
    constructor(ctx, x, y, length) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.length = length;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = white;
        this.ctx.rect(
            this.x,
            this.y,
            this.length,
            this.length
          );
        this.ctx.fill();
        this.ctx.stroke();
    }
    switchColors() {

    }
}

export default Cell;