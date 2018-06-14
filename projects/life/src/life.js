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
    this.bufferIndex = 0;

    this.randomize();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.bufferIndex];
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
        this.cells[this.bufferIndex][height][width] =
          (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.bufferIndex];
    let backBuffer = this.cells[this.bufferIndex === 0 ? 1 : 0];

    function countNeighbors(row, col) {
      let nCount = 0;

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;

        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          if (colOffset < 0 || colPos === this.width) {
            continue;
          }
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          if (currentBuffer[rowPos][colPos] === 1) {
            nCount++;
          }
        }
      }
      return nCount;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let nCount = countNeighbors.call(this, h, w);

        if (currentBuffer[h][w] === 1) {
          if (nCount < 2 || nCount > 3) {
            backBuffer[h][w] = 0;
          } else {
            backBuffer[h][w] = 1;
          }
        } else {
          if (nCount === 3) {
            backBuffer[h][w] = 1;
          } else {
            backBuffer[h][w] = 0;
          }
        }
      }
    }
    this.bufferIndex = this.bufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
