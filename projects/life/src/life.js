/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */

const MODULO = 2;

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

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

    this.randomize();

    console.log('cells array', this.cells);

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
    // !!!! IMPLEMENT ME !!!!
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];
    // see if we have a neighbor that can infect this cell and change it's color

    function countNeighbors(row, col) {
      let neighborCount = 0;

      // treat neighbors off the grid as dead cells
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;

        // check for out of bounds
        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          // Check for out of bounds
          if (colPos < 0 || colPos === this.width) {
            continue;
          }
          //don't count this cell
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          ///
          if (currentBuffer[rowPos][colPos] === 1) {
            neighborCount++;
          }
        }
      }
    }
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        neighborCount = countNeighbors.call(this, height, width);

        // under what conditions is the cell alive
        if (neighborCount) {
          backBuffer[height][width] = (currentBuffer[height][width] + 1) % MODULO;
        } else {
          backBuffer[height][width] = currentBuffer[height][width];
        }
      }
    }
    this.currentBufferIndex;
  }
}

export default Life;
