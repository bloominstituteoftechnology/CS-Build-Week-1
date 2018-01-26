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
    // Allocate the *double* buffer
    this.buffer = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

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
   * Clear the cca grid
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
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random() * MODULO) | 0; //Random 0 to 7
      }
    }
  }

  /**
   * Run the simulation for a single step (flips buffer)
   */
  step() {


    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let backBuffer = this.buffer[backBufferIndex];

    // See if we have an "infectious" neighbor
    function hasInfectiousNeighbor(x, y) {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // North
      if (y > 0) {
        if (currentBuffer[y - 1][x] === nextValue) {
          return true;
        }
      }

      // South
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === nextValue) {
          return true;
        }
      }

      // West
      if (x > 0) {
        if (currentBuffer[y][x - 1] === nextValue) {
          return true;
        }
      }
      // East
      if (x < this.width) {
        if (currentBuffer[y][x + 1] === nextValue) {
          return true;
        }
      }

      return false; // No infectious neighbors
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (hasInfectiousNeighbor.call(this, x, y)) {
          backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO; //OoO
        } else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    // Switch the buffers
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;
