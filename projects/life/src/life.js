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
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * 2);

        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step(pixelSize) {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;

    let currentBuffer = this.buffer[this.currentBufferIndex];

    let backBuffer = this.buffer[backBufferIndex];

    function countNeighbors(x, y) {
      let count = 0;

      // north
      if (y > 0) {
        if (currentBuffer[y - pixelSize][x] === 1) count++;
      }
      // northeast
      if (y > 0 && x < this.width - pixelSize) {
        if (currentBuffer[y - pixelSize][x + pixelSize] === 1) count++;
      }
      // east
      if (x < this.width - pixelSize) {
        if (currentBuffer[y][x + pixelSize] === 1) count++;
      }
      // southeast
      if (x < this.width - pixelSize && y < this.height - pixelSize) {
        if (currentBuffer[y + pixelSize][x + pixelSize] === 1) count++;
      }
      // south
      if (y < this.height - pixelSize) {
        if (currentBuffer[y + pixelSize][x] === 1) count++;
      }
      // southwest
      if (y < this.height - pixelSize && x > 0) {
        if (currentBuffer[y + pixelSize][x - pixelSize] === 1) count++;
      }
      // west
      if (x > 0) {
        if (currentBuffer[y][x - pixelSize] === 1) count++;
      }
      // northwest
      if (y > 0 && x > 0) {
        if (currentBuffer[y - pixelSize][x - pixelSize] === 1) count++;
      }
      return count;
    }

    for (let y = 0; y < this.height; y+=pixelSize) {
      for (let x = 0; x < this.width; x+=pixelSize) {
        let neighborCount = countNeighbors.call(this, x, y);

        if (currentBuffer[y][x] === 1) {
          if (neighborCount === 2 || neighborCount === 3) {
            backBuffer[y][x] = currentBuffer[y][x];
          } else {
            backBuffer[y][x] = 0;
          }
        }

        if (currentBuffer[y][x] === 0) {
          if (neighborCount === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = currentBuffer[y][x];
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
