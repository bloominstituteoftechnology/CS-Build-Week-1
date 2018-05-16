/**
 * Implementation of Conway's game of Life
 */

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
    for (let i=0; i < this.height; i++) {
      this.buffers[this.currentBufferIndex][i].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    const buffer = this.buffers[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random() * 2) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    const currentBuffer = this.buffers[this.currentBufferIndex];
    const backBuffer = this.buffers[backBufferIndex];

    const checkAliveNeighbors = (row, col) => {

      let count = 0;

      if (row > 0) {
        if (currentBuffer[row - 1][col] === 1) count++;
        if (col > 0) {
          if (currentBuffer[row - 1][col - 1] === 1) count++;
        }
        if (col < this.width - 1) {
          if (currentBuffer[row - 1][col + 1] === 1) count++;
        }
      }

      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] === 1) count++;
        if (col > 0) {
          if (currentBuffer[row +1][col - 1] === 1) count++;
        }
        if (col < this.width - 1) {
          if (currentBuffer[row + 1][col + 1] === 1) count++;
        }
      }

      if (col > 0) {
        if (currentBuffer[row][col - 1] === 1) count++;
      }
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] === 1) count++;
      }

      return count;
    }
    
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const neighbors = checkAliveNeighbors(row, col);
        const currentState = currentBuffer[row][col];
        let futureState = currentState;
          if (neighbors < 2 || neighbors > 3) {
            backBuffer[row][col] = 0;
          }
      
          if (neighbors === 2) {
            backBuffer[row][col] = currentBuffer[row][col] === 1 ? 1 : 0;
          }
      
          if (neighbors === 3) {
            backBuffer[row][col] = 1
          }
      }
    }

    this.currentBufferIndex = backBufferIndex;
    // this.currentBufferIndex = this.currentBufferIndex === 0? 1:0;
  }
}

export default Life;