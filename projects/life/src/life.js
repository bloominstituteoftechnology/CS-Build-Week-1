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
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

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
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * MODULO) | 0;
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

    // see if neighbor can infect cell and change its color
    function countNeighbors(row, column) {
      let neighborCount = 0;
      // Treat neighbors off grid as dead cells
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        // check for out of bounds
        let rowPosition = row + rowOffset;
        if (rowPosition < 0 || rowPosition === this.height) {
          continue;
        }
        // ================================ Meg's code checking bookmark ==========
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
          // check for out of bounds
          let columnPosition = column + columnOffset;
          if (columnPosition < 0 || columnPosition === this.width) {
            continue;
          }
          // don't count this cell
          if (columnOffset === 0 && rowOffset === 0) {
            continue;
          }
          if (currentBuffer[rowPosition][columnPosition] === 1) {
            neighborCount++;
          }
          //   }
        }
      }
      return neighborCount;
    } // end of countNeighbors

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        let neighborCount = countNeighbors.call(this, height, width);
        // if cell is alive
        if (currentBuffer[height][width] === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[height][width] = 0;
          } else {
            backBuffer[height][width] = 1;
          }
          // cell is dead
        } else {
          if (neighborCount === 3) {
            backBuffer[height][width] = 1;
          } else {
            backBuffer[height][width] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
