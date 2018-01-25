/**
 * Implemention of Conway's game of Life
 */

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
    this.buffers = [Array2D(width, height), Array2D(width, height)];  
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffers[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      this.buffers[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffers[this.currentBufferIndex];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.round(Math.random());
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const currentBuffer = this.buffers[this.currentBufferIndex];
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    const backBuffer = this.buffers[backBufferIndex];

    const countNeighbors = (x, y) => {
      // neighbors wrap around if out of bounds
      const west = x - 1 < 0 ? this.width - 1 : x - 1;
      const east = x + 1 === this.width ? 0 : x + 1;
      const north = y - 1 < 0 ? this.height - 1 : y - 1;
      const south = y + 1 === this.height ? 0 : y + 1;
      return currentBuffer[north][west] + currentBuffer[north][x] + currentBuffer[north][east] + currentBuffer[y][west] + 
                            currentBuffer[y][east] + currentBuffer[south][west] + currentBuffer[south][x] + currentBuffer[south][east];
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighborCount = countNeighbors(x, y);
        const cell = currentBuffer[y][x];
        if (cell === 1) {  // cell is alive
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[y][x] = 0; // cell dies if it has fewer than 2 or more than 3 live neighbors 
          } else {
            backBuffer[y][x] = 1;  // cell stays alive
          }
        } else { // cell is dead
          if (neighborCount === 3) {
            backBuffer[y][x] = 1; // cell is reborn if it has exactly 3 neighbors
          } else {
            backBuffer[y][x] = 0;  // cell stays dead
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;