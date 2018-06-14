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
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.cells[this.currentBufferIndex][row][column] = Math.random()*2 | 0;
      }
    }
  
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let frontBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ?1:0];

    function checkNeighbors(height, width) {
      const inverse = frontBuffer[height][width] + 1;
      // Checking West
      if (width > 0) {
        if (frontBuffer[height][width - 1] === inverse) {
          return true;
        }
      }
      // Checking NorthWest
      if (height > 0 && width > 0) {
        if (frontBuffer[height - 1][width - 1] === inverse) {
          return true;
        }
      }
      // Checking North
      if (height > 0) {
        if (frontBuffer[height - 1][width] === inverse) {
          return true;
        }
      }
      // Checking NorthEast
      if (height > 0 && width < this.width - 1) {
        if (frontBuffer[height - 1][width + 1] === inverse) {
          return true;
        }
      }
      // Checking East
      if (width < this.width - 1) {
        if (frontBuffer[height][width + 1] === inverse) {
          return true;
        }
      }
      // Checking SouthEast
      if (height < this.height - 1 && width < this.width - 1) {
        if (frontBuffer[height + 1][width + 1] === inverse) {
          return true;
        }
      }
      // Checking South
      if (height < this.height - 1) {
        if (frontBuffer[height + 1][width] === inverse) {
          return true;
        }
      }
      // Checking SouthWest
      if (height < this.height - 1 && width > 0) {
        if (frontBuffer[height + 1][width - 1] === inverse) {
          return true;
        }
      }

      for (let row = 0; row < this.height; row++) {
        for (let column = 0; column < this.width; column++) {
          if (checkNeighbors.call(this, height, width) {

          })
        }
      }

    }
  }
}

export default Life;
