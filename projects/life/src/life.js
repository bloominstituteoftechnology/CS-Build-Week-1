/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.currentBufferIndex = 0;
    this.randomize();
    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function countNeighbors(height, width) {
      let neighborCount = 0;

      for (let h = 0; h < this.height; h++) {
        for (let w = 0; w < this.width; w++) {
          if (hasInfectiousNeighbor.call(this, h, w)) {
            backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
          } else {
            backBuffer[h][w] = currentBuffer[h][w];
          }
        }
      }

      this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
  }

  export default Life;
