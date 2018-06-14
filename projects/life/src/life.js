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

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.currentBufferIndex = 0;
    this.randomize();
    this.clear;
    
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
    for (let grid = 0; grid < this.height; grid++) {
      this.buffer[this.currentBufferIndex][grid].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * 2) | 0;
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

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;

        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          if (colPos < 0 || colPos === this.width) {
            continue;
          }
          
          if (colOffset === 0 && rowOffset === 0) { // Current cell
            continue;
          }

          if (currentBuffer[rowPos][colPos] === 1) {
            neighborCount++;
          }
        }
      }
      return neighborCount;
    };

    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        let neighborCount = countNeighbors.call(this, r, c);

        if (currentBuffer[r][c] === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[r][c] = 0;
          } else {
            backBuffer[r][c] = 1;
          }
        } else {
          if (neighborCount === 3) {
            backBuffer[r][c] = 0;
          } else {
            backBuffer[r][c] = 1;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}


export default Life;
