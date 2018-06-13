/**
 * Implementation of Conway's game of Life
 */

const CHILD = 3;
const ADULT = 2;
// const DEAD = 1;
const BACKGROUND = 0;

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
    return this.buffers[this.activeBuffer];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffers[this.activeBuffer][y].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    let bufferPointer = this.buffers[this.activeBuffer];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (row % 2 === 1) bufferPointer[row][col] = ADULT;
        else {
          bufferPointer[row][col] = BACKGROUND;
        }
      }
    }

    // const amountOfLife = 50000;
    // for (let i = 0; i < amountOfLife; i++) {
    //   const row = Math.floor(Math.random() * this.height);
    //   const col = Math.floor(Math.random() * this.width);
    //   bufferPointer[row][col] = ADULT;
    // }

    // const amountOfLife = 100000;
    // for (let i = 0; i < amountOfLife; i++) {
    //   const row = Math.floor(Math.random() * 50) + Math.floor(this.width / 2);
    //   const col = Math.floor(Math.random() * 50) + Math.floor(this.height / 4);
    //   bufferPointer[row][col] = ADULT;
    // }
    // for (let i = 0; i < amountOfLife; i++) {
    //   const row = Math.floor(Math.random() * 50) + Math.floor(this.width / 2);
    //   const col = Math.floor(Math.random() * 50) + Math.floor(this.height / 4 * 2);
    //   bufferPointer[row][col] = ADULT;
    // }

    // const left = this.width / 4;
    // const right = this.height / 4;

    // bufferPointer[6 + left][2 + right] = ADULT;
    // bufferPointer[6 + left][3 + right] = ADULT;
    // bufferPointer[7 + left][2 + right] = ADULT;
    // bufferPointer[7 + left][3 + right] = ADULT;

    // bufferPointer[4 + left][14 + right] = ADULT;
    // bufferPointer[4 + left][15 + right] = ADULT;
    // bufferPointer[5 + left][13 + right] = ADULT;
    // bufferPointer[5 + left][17 + right] = ADULT;
    // bufferPointer[6 + left][12 + right] = ADULT;
    // bufferPointer[6 + left][18 + right] = ADULT;
    // bufferPointer[7 + left][12 + right] = ADULT;
    // bufferPointer[7 + left][16 + right] = ADULT;
    // bufferPointer[7 + left][18 + right] = ADULT;
    // bufferPointer[7 + left][19 + right] = ADULT;
    // bufferPointer[8 + left][12 + right] = ADULT;
    // bufferPointer[8 + left][18 + right] = ADULT;
    // bufferPointer[9 + left][13 + right] = ADULT;
    // bufferPointer[9 + left][17 + right] = ADULT;
    // bufferPointer[10 + left][14 + right] = ADULT;
    // bufferPointer[10 + left][15 + right] = ADULT;

    // bufferPointer[2 + left][26 + right] = ADULT;
    // bufferPointer[3 + left][24 + right] = ADULT;
    // bufferPointer[3 + left][26 + right] = ADULT;
    // bufferPointer[4 + left][22 + right] = ADULT;
    // bufferPointer[4 + left][23 + right] = ADULT;
    // bufferPointer[5 + left][22 + right] = ADULT;
    // bufferPointer[5 + left][23 + right] = ADULT;
    // bufferPointer[6 + left][22 + right] = ADULT;
    // bufferPointer[6 + left][23 + right] = ADULT;
    // bufferPointer[7 + left][24 + right] = ADULT;
    // bufferPointer[7 + left][26 + right] = ADULT;
    // bufferPointer[8 + left][26 + right] = ADULT;

    // bufferPointer[4 + left][36 + right] = ADULT;
    // bufferPointer[4 + left][37 + right] = ADULT;
    // bufferPointer[5 + left][36 + right] = ADULT;
    // bufferPointer[5 + left][37 + right] = ADULT;
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.activeBuffer === 0 ? 1 : 0;
    let currentBuffer = this.buffers[this.activeBuffer];
    let backBuffer = this.buffers[backBufferIndex];
    let neighbors = 0;

    const lifeOrDeath = (row, col) => {
      neighbors = 0;

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col] > 1) {
          neighbors++;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] > 1) {
          neighbors++;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] > 1) {
          neighbors++;
        }
      }

      // West
      if (col > 0) {
        if (currentBuffer[row][col - 1] > 1) {
          neighbors++;
        }
      }

      // North-East
      if (row > 0 && col < this.width - 1) {
        if (currentBuffer[row - 1][col + 1] > 1) {
          neighbors++;
        }
      }

      // North-West
      if (col > 0 && row > 0) {
        if (currentBuffer[row - 1][col - 1] > 1) {
          neighbors++;
        }
      }

      // South-East
      if (row < this.height - 1 && col < this.width - 1) {
        if (currentBuffer[row + 1][col + 1] > 1) {
          neighbors++;
        }
      }

      // South-West
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col - 1] > 1) {
          neighbors++;
        }
      }
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        lifeOrDeath(row, col);
        // If the cell is alive and has 2 or 3 neighbors, then it remains alive.
        // Else it dies.
        if (currentBuffer[row][col] > 1) {
          if (neighbors === 2 || neighbors === 3) {
            backBuffer[row][col] = ADULT;
          } else {
            // backBuffer[row][col] = DEAD;
            backBuffer[row][col] = BACKGROUND;

            // backBuffer[row][col] = currentBuffer[row][col];
          }
          // If the cell is dead and has exactly 3 neighbors, then it comes to life.
          // Else if remains dead.
        } else {
          if (neighbors === 3) {
            backBuffer[row][col] = CHILD;
          } else if (backBuffer[row][col] === 1) {
            // backBuffer[row][col] = DEAD;
            backBuffer[row][col] = BACKGROUND;
          } else {
            backBuffer[row][col] = BACKGROUND;
          }
        }
      }
    }
    this.activeBuffer = this.activeBuffer === 0 ? 1 : 0;
  }
}

export default Life;
