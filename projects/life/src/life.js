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
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    // Allocate the double buffer
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffer[this.currentBufferIndex];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * MODULO);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // Helper functin to see if cell has "infectious" neighbor
    const checkLiveNeighbors = (x, y) => {
      let count = 0;

      // left 
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) count++;
      }

      // up
      if (y > 0) {
        if (currentBuffer[y - 1][x] === 1) count++;
      }

      // up left corner 
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) count++;
      }

      // up right corner
      if (x < this.width - 1 && y > 0) {
        if (currentBuffer[y - 1][x + 1] === 1) count++;
      }

      // right
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) count++;
      }

      // down
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) count++;
      }

      // down left corner
      if (x > 0 && y < this.height - 1) {
        if (currentBuffer[y + 1][x - 1] === 1) count++;
      }

      // down right corner
      if (x < this.width - 1 && y < this.height - 1) {
        if (currentBuffer[y + 1][x + 1] === 1) count++;
      }

      return count;
    }

    // loop through the currentBuffer and populate the 
    // backBuffer (next genration) based on above helper
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
        if (currentBuffer[y][x] === 1 && (checkLiveNeighbors(x, y) === 2 || checkLiveNeighbors(x, y) === 3)) {
          backBuffer[y][x] === 1
        } 
        // If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
        else if (currentBuffer[y][x] === 0 && checkLiveNeighbors(x, y) === 3) {
          backBuffer[y][x] === 1
        } else {
          backBuffer[y][x] === 0
        }   
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
