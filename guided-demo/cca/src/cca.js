/**
 * Implemention of a CCA
 */

const MODULO = 8;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * CCA class
 */
class CCA {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;
    this.buffer = [Array2D(width, height), Array2D(width, height)];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid for the current active buffer
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * MODULO);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // fill the off screen buffer with the next cca generation built
    // from the current buffer

    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // see if we have a neighbor to infect his one
    function hasInfectedNeighbor(x, y) {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // North
      if (y > 0) {
        if (currentBuffer[y - 1][x] === nextValue) {
        }
      }
      // South
      if (y < this.height) {
        if (currentBuffer[y - 1][x] === nextValue) {
        }
      }
      // East
      if (x < this.width - 1) {
        if (currentBuffer[y][x - 1] === nextValue) {
        }
      }
      // check the west neighbor of cell x,y
      if (x > 0) {
        if (currentBuffer[y][x - 1] === nextValue) {
        }
      }

      return false;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (hasInfectedNeighbor.call(this, x, y)) {
          backBuffer[y][x] = currentBuffer[y][x] % MODULO;
        } else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;
