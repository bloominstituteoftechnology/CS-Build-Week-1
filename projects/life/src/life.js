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
        bufferPointer[row][col] = DEAD;
      }
    }

    const amountOfLife = 500;
    for (let i = 0; i < amountOfLife; i++) {
      const row = Math.floor(Math.random() * 30) + 100;
      const col = Math.floor(Math.random() * 30) + 100;

      bufferPointer[row][col] = ALIVE;
    }
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

      if (currentBuffer[row][col]) {
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
      }
    };

    // If the cell is alive and has 2 or 3 neighbors, then it remains alive.
    // Else it dies.
    // If the cell is dead and has exactly 3 neighbors, then it comes to life.
    // Else if remains dead.
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
    this.activeBuffer = this.activeBuffer === 0 ? 1 : 0;
  }
}

export default Life;
