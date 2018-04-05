/**
 * Implemention of a CCA - has game logic
 */

const MODULO = 8; // number of items in colors array

/**
 * Make a 2D array helper function - game state
 */
function Array2D(width, height) { // give width and height
  let a = new Array(height); // outer array

  for (let i = 0; i < height; i++) { // inner array
    a[i] = new Array(width);
  }

  return a;
}

/**
 * CCA class
 */
class CCA { // entire game state

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0; // sets current buffer, toggle between 0 and 1
    // initialize grid here- use double buffering
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height),
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() { // return currently active buffer so react can draw it
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid - filled with 0s
   */
  clear() {
    for (let y = 0; y < this.height; y++) { // loop over height
      this.buffer[this.currentBufferIndex][y].fill(0); // .fill to fill array with what you want
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * MODULO) | 0; // get random float times modulo then round down
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

    // helper function to see if cell has "infectious" neighbor, neighbor with the next state to change to
    const hasInfectiousNeighbor = (x, y) => {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // west neighbor
      if (x > 0) { // as long as it's not the first cell in the row
        if (currentBuffer[y][x - 1] === nextValue) {
          return true;
        }
      }
      // north
      if (y > 0) { // if not very top row
        if (currentBuffer[y - 1][x] === nextValue) {
          return true;
        }
      }
      // east
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === nextValue) {
          return true;
        }
      }
      // south
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === nextValue) {
          return true;
        }
      }
      return false;
    }

    // loop through the currentBuffer and populate the backBuffer (next generation) based on above helper
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (hasInfectiousNeighbor(x, y)) {
          backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO;
        } else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    this.currentBufferIndex = backBufferIndex;
  }
}




export default CCA;