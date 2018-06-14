const MODULO = 2;
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

    this.cells = [Array2D(width, height), Array2D(width, height)];
    this.currentBufferIndex = 0;

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
    let backBuffer = this.cells[this.currentBufferIndex % 1];

    // function hasInfectiousNeighbor(height, width) {
    //   const nextValue = (currentBuffer[height][width] + 1) % MODULO;
    //   // w
    //   if (width > 0) {
    //     if (currentBuffer[height][width - 1] === nextValue) {
    //       return true;
    //     }
    //   }

    //   // n
    //   if (height > 0) {
    //     if (currentBuffer[height - 1][width] === nextValue) {
    //       return true;
    //     }
    //   }

    //   // e
    //   if (width < this.width - 1) {
    //     if (currentBuffer[height][width + 1] === nextValue) {
    //       return true;
    //     }
    //   }

    //   //s
    //   if (height < this.height - 1) {
    //     if (currentBuffer[height + 1][width] === nextValue) {
    //       return true;
    //     }
    //   }
    // }

    // for (let h = 0; h < this.height; h++) {
    //   for (let w = 0; w < this.width; w++) {
    //     if (hasInfectiousNeighbor.call(this, h, w)) {
    //       backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
    //     } else {
    //       backBuffer[h][w] = currentBuffer[h][w];
    //     }
    //   }
    // }

    // this.currentBufferIndex = this.currentBufferIndex % 1;

    function countNeighbors(row, col) {
      let neighborCount = 0;

      // Treat neighbors off the grid as dead cells.
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;
        // Check for out of bounds
        if (rowPos <= 0 || rowPos === this.height) {
          continue;
        }
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;
          // Check for out bounds
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

        // cell is currently alive
        if (currentBuffer[h][w] === 1) {
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
}

export default Life;
