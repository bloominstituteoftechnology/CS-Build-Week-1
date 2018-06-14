/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
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

    this.currentBufferIndex = 0;
    this.cells = [Array2D(width, height),Array2D(width, height)];
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
    // !!!! IMPLEMENT ME !!!!
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
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1: 0];

    function hasInfectedNeighbor(height, width) {
      const nextValue = (currentBuffer[height][width] + 1) % MODULO;
      // WEST
      if (width > 0) {
        if (currentBuffer[height][width - 1] === nextValue) {
          return true;
        }
      }
      // North
      if (height > 0) {
        if (currentBuffer[height - 1][width] === nextValue) {
          return true;
        }
      }
      // EAST
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === nextValue) {
          return true;
        }
      }
      //South
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === nextValue) {
          return true;
        }
      }
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        if (hasInfectedNeighbor.call(this, height, width)) {
          backBuffer[height][width] = (currentBuffer[height][width] + 1) % MODULO;
        } else {
          backBuffer[height][width] = currentBuffer[height][width];
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1:0;
  }
}

export default Life;
