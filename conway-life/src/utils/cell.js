export class Cell {
  // Set the size for each cell

  constructor(context, gridX, gridY, size) {
    this.context = context;

    // Store the position of this cell in the grid
    this.gridX = gridX;
    this.gridY = gridY;
    this.size = size;

    // Make  squares alive
    this.alive = true;
  }

  draw() {
    // Draw a square, let the state determine the color
    if (this.alive) {
      this.context.fillStyle = "red";
      this.context.fillRect(this.gridX, this.gridY, this.size, this.size);
    } else {
      this.context.clearRect(this.gridX, this.gridY, this.size, this.size);
    }
  }
}
