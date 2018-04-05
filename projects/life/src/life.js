/**
 * Implementation of Conway's game of Life
 */

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
   * Clear the life grid
   */
  clear() {
    for (let i = 0; i < this.height; i++) {
      this.buffer[this.currentBufferIndex][i].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.buffer[this.currentBufferIndex][i][j] = Math.round(Math.random());
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const getCell = (x, y) => {
      if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
        return false;
      }
      return currentBuffer[y][x];
    };

    const countInfectiousNeighbor = (x, y) => {
      let count = 0;
      if (getCell(x - 1, y - 1)) {
        ++count;
      }
      if (getCell(x, y - 1)) {
        ++count;
      }
      if (getCell(x + 1, y - 1)) {
        ++count;
      }
      if (getCell(x + 1, y)) {
        ++count;
      }
      if (getCell(x + 1, y + 1)) {
        ++count;
      }
      if (getCell(x, y + 1)) {
        ++count;
      }
      if (getCell(x - 1, y + 1)) {
        ++count;
      }
      if (getCell(x - 1, y)) {
        ++count;
      }
      return count;
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (currentBuffer[y][x]) {
          if (countInfectiousNeighbor(x, y) < 2) {
            backBuffer[y][x] = 0;
          } else if (
            countInfectiousNeighbor(x, y) > 1 &&
            countInfectiousNeighbor(x, y) < 4
          ) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        } else if (!currentBuffer[y][x]) {
          if (countInfectiousNeighbor(x, y) === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
