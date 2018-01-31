/**
 * Implemention of a CCA
 */

const MODULO = 16;

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
    this.displayBufferIdx = 0;
    this.buffer = [Array2D(width, height), Array2D(width, height)];
    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.displayBufferIdx];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    this.buffer[this.displayBufferIdx] = this.buffer[this.displayBufferIdx].map(
      row => row.fill(0)
    );
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    this.buffer[this.displayBufferIdx] = this.buffer[this.displayBufferIdx].map(
      row => row.map(cell => (cell = ~~(Math.random() * MODULO)))
    );
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const workBuffIdx = this.displayBufferIdx === 0 ? 1 : 0;
    const displayBufferIdx = this.buffer[this.displayBufferIdx];
    const workBuffer = this.buffer[workBuffIdx];

    const checkNeighbor = (x, y, buffer) => {
      const successor = (buffer[y][x] + 1) % MODULO;

      if (x > 0) {
        if (buffer[y][x - 1] === successor) return true;
      }

      if (y > 0) {
        if (buffer[y - 1][x] === successor) return true;
      }

      if (x < buffer[y].length - 1) {
        if (buffer[y][x + 1] === successor) return true;
      }

      if (y < buffer.length - 1) {
        if (buffer[y + 1][x] === successor) return true;
      }

      // if (x > 0 && y > 0) {
      //   if (buffer[y - 1][x - 1] === successor) return true;
      // }

      // if (x < buffer[y].length - 1 && y > 0) {
      //   if (buffer[y - 1][x + 1] === successor) return true;
      // }

      // if (x < buffer[y].length - 1 && y < buffer.length - 1) {
      //   if (buffer[y + 1][x + 1] === successor) return true;
      // }

      // if (x > 0 && y < buffer.length - 1) {
      //   if (buffer[y + 1][x - 1] === successor) return true;
      // }

      return false;
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (checkNeighbor(x, y, displayBufferIdx)) {
          workBuffer[y][x] = (displayBufferIdx[y][x] + 1) % MODULO;
        } else {
          workBuffer[y][x] = displayBufferIdx[y][x];
        }
      }
    }

    this.displayBufferIdx = this.displayBufferIdx === 0 ? 1 : 0;
  }
}

export default CCA;
