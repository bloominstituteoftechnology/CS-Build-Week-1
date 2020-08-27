export class Cell {
  // Set the size for each cell

  constructor({ context, gridX, gridY, size, squareNum, x, y }) {
    this.context = context;
    //console.log("context is uhhhh in the cell ", context);
    this.squareNum = squareNum;
    // Store the position of this cell in the grid
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = x;
    this.y = y;
    this.size = size - 2;
    this.neighborToLiving = false;

    // Make  squares alive
    this.alive = Math.random() > 0.5;
  } //when a cell updates n stuff u definitely gotta like set the neighbor to the cell so that it points to the
  //actual object but remember that the other cell is not really being updated lmao so reach into that other object
  //and run its find neighbors as well by passing the new cells-grid-thing
  findNeighbors(l, w) {
    // console.log(this.x, this.y);
    // console.log(cells[this.x][this.y]);
    //instead of storing the cell, store the xy gridpos of all neighbors, with -1 indicating no neighbor (out of range)
    let leftNeigh = this.x > 0 ? { x: this.x - 1, y: this.y } : -1;
    let rightNeigh = this.x <= w ? { x: this.x + 1, y: this.y } : -1;
    let topNeigh = this.y > 0 ? { x: this.x, y: this.y - 1 } : -1;
    let bottomNeigh = this.y < l ? { x: this.x, y: this.y + 1 } : -1;
    let tLNeigh =
      this.y > 0 && this.x > 0 ? { x: this.x - 1, y: this.y - 1 } : -1;
    let tRNeigh =
      this.y > 0 && this.x <= w ? { x: this.x + 1, y: this.y - 1 } : -1;
    let bLNeigh =
      this.y < l && this.x > 0 ? { x: this.x - 1, y: this.y + 1 } : -1;
    let bRNeigh =
      this.y < l && this.x <= w ? { x: this.x + 1, y: this.y + 1 } : -1;
    let neighbors = {
      leftNeigh,
      rightNeigh,
      topNeigh,
      bottomNeigh,
      tLNeigh,
      tRNeigh,
      bLNeigh,
      bRNeigh,
    };
    this.neighbors = neighbors;
    // console.log("the neighbors of the cell you just clicked are ", neighbors);
  }

  kill(context) {
    this.context = context;
    // console.log("lkilgin");
    this.alive = false;
    // console.log("killing ", this);
    // console.log("one ded cell comin up");
    this.context.clearRect(this.gridX, this.gridY, this.size, this.size);
  }

  resurrect(context) {
    this.context = context;
    // console.log("resurrecting ", this);

    this.alive = true;
    // console.log("rise from ur gabe");
    this.context.fillStyle = "red";

    this.context.fillRect(this.gridX, this.gridY, this.size, this.size);
  }

  draw(context) {
    this.context = context;
    // console.log(context);
    // Draw a square, let the state determine the color
    // console.log("drawing");
    if (this.alive) {
      // console.log("alive");
      // console.log("gridpositions, ", this.gridX, this.gridY);
      this.context.fillStyle = "red";
      this.context.fillRect(this.gridX, this.gridY, this.size, this.size);
    } else {
      // console.log("ded");
      // console.log(this);
      this.context.clearRect(this.gridX, this.gridY, this.size, this.size);
    }
  }
}
