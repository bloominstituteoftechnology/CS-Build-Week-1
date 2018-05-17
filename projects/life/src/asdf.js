/**
 * Implementation of Conway's game of Life
 */

const ALIVE = 1;
const DEAD = 0;

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

    this.activeBuffer = 0;

    this.buffers = [Array2D(width, height), Array2D(width, height)];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffers[this.activeBuffer];
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
    let bufferPointer = this.buffers[this.activeBuffer];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        bufferPointer[row][col] = DEAD;
      }
    }

    // const amountOfLife = 300;
    // for (let i = 200; i < amountOfLife; i++) {

    //   bufferPointer[i][i] = ALIVE;
    // }

    // for (let i = 200; i < amountOfLife; i++) {

    //     bufferPointer[i + 1][i + 2] = ALIVE;
    // }

    //   for (let i = 200; i < amountOfLife; i++) {

    //     bufferPointer[i + 2][i + 3] = ALIVE;
    // }
    // bufferPointer[300][300] = ALIVE;

    const left = 100;
    const right = 200;

    bufferPointer[6 + left][2 + right] = ALIVE;
    bufferPointer[6 + left][3 + right] = ALIVE;
    bufferPointer[7 + left][2 + right] = ALIVE;
    bufferPointer[7 + left][3 + right] = ALIVE;

    bufferPointer[4 + left][14 + right] = ALIVE;
    bufferPointer[4 + left][15 + right] = ALIVE;
    bufferPointer[5 + left][13 + right] = ALIVE;
    bufferPointer[5 + left][17 + right] = ALIVE;
    bufferPointer[6 + left][12 + right] = ALIVE;
    bufferPointer[6 + left][18 + right] = ALIVE;
    bufferPointer[7 + left][12 + right] = ALIVE;
    bufferPointer[7 + left][16 + right] = ALIVE;
    bufferPointer[7 + left][18 + right] = ALIVE;
    bufferPointer[7 + left][19 + right] = ALIVE;
    bufferPointer[8 + left][12 + right] = ALIVE;
    bufferPointer[8 + left][18 + right] = ALIVE;
    bufferPointer[9 + left][13 + right] = ALIVE;
    bufferPointer[9 + left][17 + right] = ALIVE;
    bufferPointer[10 + left][14 + right] = ALIVE;
    bufferPointer[10 + left][15 + right] = ALIVE;

    bufferPointer[2 + left][26 + right] = ALIVE;
    bufferPointer[3 + left][24 + right] = ALIVE;
    bufferPointer[3 + left][26 + right] = ALIVE;
    bufferPointer[4 + left][22 + right] = ALIVE;
    bufferPointer[4 + left][23 + right] = ALIVE;
    bufferPointer[5 + left][22 + right] = ALIVE;
    bufferPointer[5 + left][23 + right] = ALIVE;
    bufferPointer[6 + left][22 + right] = ALIVE;
    bufferPointer[6 + left][23 + right] = ALIVE;
    bufferPointer[7 + left][24 + right] = ALIVE;
    bufferPointer[7 + left][26 + right] = ALIVE;
    bufferPointer[8 + left][26 + right] = ALIVE;

    bufferPointer[4 + left][36 + right] = ALIVE;
    bufferPointer[4 + left][37 + right] = ALIVE;
    bufferPointer[5 + left][36 + right] = ALIVE;
    bufferPointer[5 + left][37 + right] = ALIVE;
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = 1 - this.activeBuffer;
    let currentBuffer = this.buffers[this.activeBuffer];
    let backBuffer = this.buffers[backBufferIndex];
    let neighbors = 0;

    const lifeOrDeath = (row, col) => {
      // const nextValue = (currentBuffer[row][col] + 1) % MAKE_BINARY;
      neighbors = 0;

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col]) {
          neighbors++;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1]) {
          neighbors++;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col]) {
          neighbors++;
        }
      }

      // West
      if (col > 0) {
        if (currentBuffer[row][col - 1]) {
          neighbors++;
        }
      }

      // North-East
      if (row > 0 && col < this.height - 1) {
        if (currentBuffer[row - 1][col + 1]) {
          neighbors++;
        }
      }

      // North-West
      if (col > 0 && row > 0) {
        if (currentBuffer[row - 1][col - 1]) {
          neighbors++;
        }
      }

      // South-East
      if (row < this.height - 1 && col < this.width - 1) {
        if (currentBuffer[row + 1][col + 1]) {
          neighbors++;
        }
      }

      // South-West
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col - 1]) {
          neighbors++;
        }
      }
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        lifeOrDeath(row, col);

        if (currentBuffer[row][col]) {
          if (neighbors === 2 || neighbors === 3) {
            backBuffer[row][col] = ALIVE;
          } else {
            backBuffer[row][col] = DEAD;
          }
        } else {
          if (neighbors === 3) {
            backBuffer[row][col] = ALIVE;
          } else {
            backBuffer[row][col] = DEAD;
          }
        }
      }
    }
    this.activeBuffer = 1 - this.activeBuffer;
  }
}

export default Life;
