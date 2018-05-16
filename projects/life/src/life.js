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

    this.cells = {
      foreground: Array2D(width, height),
      background: Array2D(width, height),
    };

    this.currentBuffer = this.cells.foreground;

    this.randomize();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.currentBuffer;
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.cells.foreground[row][column] = 0;
        this.cells.background[row][column] = 0;
      }
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if(row % 2 === 1 || column % 2 === 1) {
          this.cells.foreground[row][column] = Math.round(Math.random());
        }
        else {
          this.cells.foreground[row][column] = 0;
        }
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let currentBuffer = this.currentBuffer;
    let width = this.width;
    let height = this.height;
    function kill(row, column) {
      let next = (currentBuffer[row][column] + 1) % 2;

      //West
      let count = 0;
      if (column > 0) {
        if (currentBuffer[row][column - 1] === next) {
          count++;
        }
      }
      //North-West
      if (column > 0 && row > 0) {
        if (currentBuffer[row - 1][column - 1] === next) {
          count++;
        }
      }
      //North
      if (row > 0) {
        if (currentBuffer[row - 1][column] === next) {
          count++;
        }
      }
      //North-East
      if (row > 0 && column < width - 1) {
        if (currentBuffer[row - 1][column + 1] === next) {
          count++;
        }
      }
      //East
      if (column < width - 1) {
        if (currentBuffer[row][column + 1] === next) {
          count++;
        }
      }
      //South-East
      if (column < width - 1 && row < height - 1) {
        if (currentBuffer[row + 1][column + 1] === next) {
          count++;
        }
      }
      //South
      if (row < height - 1) {
        if (currentBuffer[row + 1][column] === next) {
          count++;
        }
      }
      //South-West
      if (row < height - 1 && column > 0) {
        if (currentBuffer[row + 1][column - 1] === next) {
          count++;
        }
      }
      return count;
    }

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        let death = kill(row, column);
        if (currentBuffer[row][column] === 1) {
          if (death < 2 || death > 3) {
            this.cells.background[row][column] = 0;
          } else {
            this.cells.background[row][column] = currentBuffer[row][column];
          }
        }
        else {
          if (death === 3) {
            this.cells.background[row][column] = 1;
          }
          else {
            this.cells.background[row][column] = currentBuffer[row][column];
          }
        }
        

      }
    }

    let temp = this.cells.foreground;
    this.cells.foreground = this.cells.background;
    this.cells.background = temp;
    this.currentBuffer = temp;
  }
}

export default Life;
