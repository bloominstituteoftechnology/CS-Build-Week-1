/**
 * Implementation of Conway's game of Life
 */

const MODULO = 7;

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
    for (let row = 0; row < this.height; row++) {
      this.cells[this.currentBufferIndex][row].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    // for (let height = 0; height < this.height; height++) {
    //   for (let width = 0; width < this.width; width++) {
    //     if (Math.random() < 0.1) {
    //       this.cells[this.currentBufferIndex][height][width] = 2;
    //       const clusterSize = (Math.random() * 8) | 0;
    //       for (let i = 0; i < clusterSize; i++) {
    //         const colOffset = (Math.random() * 4 - 2) | 0;
    //         const rowOffset = (Math.random() * 4 - 2) | 0;
    //         if (height + rowOffset > 0 && height + rowOffset < this.height) {
    //           if (width + colOffset > 0 && width + colOffset < this.width) {
    //             this.cells[this.currentBufferIndex][height + rowOffset][
    //               width + colOffset
    //             ] = 2;
    //           }
    //         }
    //       }
    //     } else if (this.cells[this.currentBufferIndex][height][width] != 2) {
    //       this.cells[this.currentBufferIndex][height][width] =
    //         Math.random() * 2;
    //     }
    //   }
    // }
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

    function countNeighbors(row, col) {
      let neighborCount = 0;

      // Treat neighbors off the grid as dead cells
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;
        // Check for out of bounds
        if (rowPos <= 0 || rowPos === this.height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;
          // Check for out of bounds
          if (colPos < 0 || colPos === this.width) {
            continue;
          }
          // Don't count this cell
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          if (currentBuffer[rowPos][colPos] === 1) {
            neighborCount++;
          }
        }
      }
      return neighborCount;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let neighborCount = countNeighbors.call(this, h, w);
        // If this is a tree, it stays a tree
        if (currentBuffer[h][w] === 2) {
          backBuffer[h][w] = 2;
        } else {
          // Cell is currently alive
          if (currentBuffer[(h, w)] === 1) {
            if (neighborCount < 2 || neighborCount > 3) {
              backBuffer[h][w] = 0;
            } else {
              backBuffer[h][w] = 1;
            }
            // Cell is currently dead
          } else {
            if (neighborCount === 3) {
              backBuffer[h][w] = 1;
            } else {
              backBuffer[h][w] = 0;
            }
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
