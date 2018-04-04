/**
 * Implementation of Conway's game of Life
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
    this.height = height;
    this.width = width;

    // create a point to the currently shown buffer
    this.currentBufferIndex = 0; //needs to toggle between 0 and 1 in order to switch the currently displayed canvas

    // this creates the two potential displays
    this.buffer = [
      Array2D(width, height), // displayed canvas  <-- currentBufferIndex
      Array2D(width, height) // our workspace canvas
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
    return this.buffer[this.currentBufferIndex]; // will return this.buffer[0] or this.buffer[1]
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let h = 0; h < this.height; h++) {
      this.buffer[this.currentBufferIndex][h].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.weight; w++) {
        buffer[h][w] = Math.round(Math.random());
      }
    }

  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // check if neighbors are alive (1) or dead (0)
    /* 
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    */
   const needsToChange = (h, w) => {
     let count = 0;
      

   };
  }
}

export default Life;
