export class Cell {
  // Set the size for each cell
  static width = 10;
  static height = 10;

  constructor(context, gridX, gridY) {
    this.context = context;

    // Store the position of this cell in the grid
    this.gridX = gridX;
    this.gridY = gridY;

    // Make random squares alive
    this.alive = Math.random() > 0.5;
  }

  draw() {
    // Draw a square, let the state determine the color
    this.context.fillStyle = this.alive ? "#ff8080" : "#303030";
    this.context.fillRect(
      this.gridX * Cell.width,
      this.gridY * Cell.height,
      Cell.width,
      Cell.height
    );
  }
}
