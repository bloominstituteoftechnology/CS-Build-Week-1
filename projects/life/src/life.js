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

    this.cells = [
      Array2D(width, height),
      Array2D(width, height),
    ];
    this.currentBufferIndex = 0;
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
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.cells[0][row][column] = 0;
        this.cells[1][row][column] = 0;
      }
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (Math.random() < 0.1) {
          this.cells[this.currentBufferIndex][row][column] = 1;
        }
      }
    }
  
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let frontBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1: 0];

    function checkNeighbors(height, width) {
      let neighbors = 0;
      
      // Checking West
      if (width > 0) {
        if (frontBuffer[height][width - 1] === 1) {
          neighbors++;
        }
      }
      // Checking NorthWest
      if (height > 0 && width > 0) {
        if (frontBuffer[height - 1][width - 1] === 1) {
          neighbors++;
        }
      }
      // Checking North
      if (height > 0) {
        if (frontBuffer[height - 1][width] === 1) {
          neighbors++;
        }
      }
      // Checking NorthEast
      if (height > 0 && width < this.width - 1) {
        if (frontBuffer[height - 1][width + 1] === 1) {
          neighbors++;
        }
      }
      // Checking East
      if (width < this.width - 1) {
        if (frontBuffer[height][width + 1] === 1) {
          neighbors++;
        }
      }
      // Checking SouthEast
      if (height < this.height - 1 && width < this.width - 1) {
        if (frontBuffer[height + 1][width + 1] === 1) {
          neighbors++;
        }
      }
      // Checking South
      if (height < this.height - 1) {
        if (frontBuffer[height + 1][width] === 1) {
          neighbors++;
        }
      }
      // Checking SouthWest
      if (height < this.height - 1 && width > 0) {
        if (frontBuffer[height + 1][width - 1] === 1) {
          neighbors++;
        }
      }
      return neighbors;
    }

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        const neighbors = checkNeighbors.call(this, row, column);
        if (frontBuffer[row][column] === 1) {
          if (neighbors < 2 || neighbors > 3) backBuffer[row][column] = 0;
          else backBuffer[row][column] = 1;
        } else {
          if (neighbors === 3) backBuffer[row][column] = 1;
          else backBuffer[row][column] = 0;
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
  }
}

export default Life;
