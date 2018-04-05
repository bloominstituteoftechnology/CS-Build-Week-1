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
    for (let h = 0; h < this.height; h++) {
      this.buffer[this.currentBufferIndex][h].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
     const buffer = this.buffer[this.currentBufferIndex];
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        buffer[h][w] = Math.round(Math.random());
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // check if neighbors are alive (1) or dead (0)
   const needsToChange = (h, w) => {
     let count = 0;
      //check top row
      if (h > 0) {
        if (currentBuffer[h-1][w-1] === 1) { // top left diag
          count++;
        }
        if (currentBuffer[h-1][w] === 1) { // top
          count++;
        }
        if (currentBuffer[h-1][w+1] === 1) { // top right diag
          count++;
        }
      }

      //check left
      if (w > 0) {
        if (currentBuffer[h][w-1] === 1) {
          count++;
        }
      }
      //check right
      if (w < this.width-1) {
        if (currentBuffer[h][w+1] === 1) {
          count++;
        }
      }
      //check bottom row
      if (h < this.height-1) {
        if (currentBuffer[h+1][w-1] === 1) { // bottom left diag
          count++;
        }
        if (currentBuffer[h+1][w] === 1) { // bottom
          count++;
        }
        if (currentBuffer[h+1][w+1] === 1) { // bottom right diag
          count++;
        }
      }
      return count;
    };

    // loop through current buffer and populate the back buffer
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let count = needsToChange(h, w);
        const thisCell = currentBuffer[h][w];

        if (count < 2 || count > 3) {
        // DEAD - if dead or alive
          backBuffer[h][w] = 0;
        }
        else if (count === 2) {
        // if alive - stay ALIVE, if dead - stay DEAD (nothing changes)
          backBuffer[h][w] = thisCell === 1 ? 1 : 0;
        }
        else if (count === 3) {
        // ALIVE - if alive or dead
          backBuffer[h][w] = 1;
        }
      }
    }
    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
