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
    a[i] = new Array(width).fill(0);
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
    this.buffer = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height)
    ]
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
    for (let x = 0; x < this.buffer[this.currentBufferIndex].length; x++){
      for (let y = 0; y < this.buffer[this.currentBufferIndex][x].length; y++){
        this.buffer[this.currentBufferIndex][x][y] = 0;
      }
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let x = 0; x < this.height; x++){
      for (let y = 0; y < this.width; y++){
        this.buffer[this.currentBufferIndex][x][y] = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    var backBufferIndex;
    if (this.currentBufferIndex) backBufferIndex = 0;
    else backBufferIndex = 1;

    const currentBuffer = this.buffer[this.currentBufferIndex];
    const backBuffer = this.buffer[backBufferIndex];

    const checkCells = (x, y) => {

    }
  }
}

export default Life;
