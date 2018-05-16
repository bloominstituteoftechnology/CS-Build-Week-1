/**
 * Implementation of Conway's game of Life
 */

const MAKE_BINARY = 2;

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
        bufferPointer[row][col] = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.activeBuffer === 0 ? 1 : 0;
    let currentBuffer = this.buffers[this.activeBuffer];
    let backBuffer = this.buffers[backBufferIndex];

    const hasInfectiousNeighbor = (row, col) => {
      const nextValue = (currentBuffer[row][col] + 1) % MAKE_BINARY;

      // West
      if (col > 0) {
        if (currentBuffer[row][col - 1] === nextValue) {
          return true;
        }
      }

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col] === nextValue) {
          return true;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] === nextValue) {
          return true;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] === nextValue) {
          return true;
        }
      }

      return false;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (hasInfectiousNeighbor(row, col)) {
          backBuffer[row][col] = (currentBuffer[row][col] + 1) % MAKE_BINARY; //Change to infection
        } else {
          backBuffer[row][col] = currentBuffer[row][col]; //no change
        }
      }
    }
    this.activeBuffer = this.activeBuffer === 0 ? 1 : 0;
  }
}

export default Life;
