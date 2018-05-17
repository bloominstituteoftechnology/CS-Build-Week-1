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

    this.cells = [ Array2D(width, height), Array2D(width, height) ];

    this.randomize();
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
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
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const otherBufferIndex = 1 - this.currentBufferIndex;
    const currentBuffer = this.cells[this.currentBufferIndex];
    const otherBuffer = this.cells[otherBufferIndex];
    console.log('currentBuffer is', currentBuffer);
    // implement rules
    const rowsToBeChecked = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let alive = 0;
        for (let i = 0; i < rowsToBeChecked.length; i++) {
          const offset = rowsToBeChecked[i];
          const offsetRow = row + offset[0];
          const offsetCol = col + offset[1];
          if (offsetRow < 0 || offsetCol < 0 || offsetRow >= this.height || offsetCol >= this.width) continue;
          if (currentBuffer[offsetRow][offsetCol] === 1) alive++;
          if (alive > 4) break;
        }
        if (currentBuffer[row][col] === 1) {
          if (alive === 2 || alive === 3) otherBuffer[row][col] = 1;
          else otherBuffer[row][col] = 0;
        } else {
          if (alive === 3) otherBuffer[row][col] = 1;
          else otherBuffer[row][col] = 0;
        }
      }
    }

    this.currentBufferIndex = otherBufferIndex;
  }
}

export default Life;
