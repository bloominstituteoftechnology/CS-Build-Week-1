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
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    // this.drawRandomGlider();
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
    this.cells = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height),
    ];
    // Just generate a new empty 2d array to clear buffer
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
         buffer[row][col] = Math.round(Math.random());
      }
    }
  }

  drawRandomGlider() {
    // let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    // let currentBuffer = this.cells[this.currentBufferIndex];
    // let backBuffer = this.cells[backBufferIndex];

    // const randY = Math.floor(Math.random() * Math.floor(this.height));
    // const randX = Math.floor(Math.random() * Math.floor(this.width));

    // console.log(currentBuffer[randY][randX]);
    // if (currentBuffer[randY][randX] !== undefined) backBuffer[randY][randX] = 1;
    // if (currentBuffer[randY + 1][randX + 1] !== undefined)
    //   console.log(backBuffer[randY + 1][randX + 1]);
    // if (currentBuffer[randY + 2][randX + 1] !== undefined)
    //   backBuffer[randY + 2][randX + 1] = 1;
    // if (currentBuffer[randY + 2][randX] !== undefined)
    //   backBuffer[randY + 2][randX] = 1;
    // if (currentBuffer[randY + 2][randX - 1] !== undefined)
    //   backBuffer[randY + 2][randX - 1] = 1;
    // this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];
    const numberOfNeighbors = (row, col) => {
      // left
      let neighbors = 0;
      if (col > 0) {
        if (currentBuffer[row][col - 1]) {
          neighbors++;
        }
      }

      // up
      if (row > 0) {
        if (currentBuffer[row - 1][col]) {
          neighbors++;
        }
      }

      // right
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1]) {
          neighbors++;
        }
      }

      // down
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col]) {
          neighbors++;
        }
      }
      // check top left adj
      if (col > 0 && row > 0) {
        if (currentBuffer[row - 1][col - 1]) {
          neighbors++;
        }
      }
      // check top right adj
      if (col < this.width - 1 && row > 0) {
        if (currentBuffer[row - 1][col + 1]) {
          neighbors++;
        }
      }
      // check bottom left adj
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col + 1]) {
          neighbors++;
        }
      }
      // check bottom right adj
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col - 1]) {
          neighbors++;
        }
      }
      return neighbors;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let neighbors = numberOfNeighbors.call(this, row, col);
        if (neighbors < 2) {
          backBuffer[row][col] = currentBuffer[row][col] * 0; // Kill cell
        } else if (
          currentBuffer[row][col] === 1 &&
          (neighbors === 2 || neighbors === 3)
        ) {
          backBuffer[row][col] = currentBuffer[row][col]; // No change if alive and neighbors === 2 || 3
        } else if (currentBuffer[row][col] === 0 && neighbors === 3) {
          backBuffer[row][col] = currentBuffer[row][col] + 1; // Bring back to life
        } else if (neighbors > 3) {
          backBuffer[row][col] = currentBuffer[row][col] * 0;
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
