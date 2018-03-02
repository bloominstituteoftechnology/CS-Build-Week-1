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
const MODULO = 2;
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
        const rand = Math.floor(Math.random() * MODULO);
        this.buffer[this.currentBufferIndex][y][x] = rand;
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

    const countNeighbours = (x, y, options = { border: 'zero' }) => {
      // const nextValue = (currentBuffer[y][x] + 1) % MODULO;
      let neighbourCount = 0;
      if (options.border === 'zero') {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          const yPos = y + yOffset;
          // out of bounds check
          if (yPos < 0 || yPos >= this.height) {
            continue;
          }

          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            const xPos = x + xOffset;
            // out of bounds check
            if (yPos < 0 || xPos >= this.width) {
              continue;
            }
            // own neighbour check
            if (xPos === x && yPos === y) {
              continue;
            }

            neighbourCount += currentBuffer[yPos][xPos];
          }
        }
      } else if (options.border === 'wrap') {
        let north = y - 1;
        let south = y + 1;
        let west = y - 1;
        let east = y + 1;

        // check if we need to wrap
        // n
        if (north < 0) {
          north = this.height - 1;
        }
        // s
        if (south >= this.height) {
          south = this.height - 1;
        }
        // w
        if (west < 0) {
          west = this.width - 1;
        }
        // e
        if (east < 0) {
          east = 0;
        }
        neighbourCount =
          currentBuffer[north][west] +
          currentBuffer[north][x] +
          currentBuffer[north][east] +
          currentBuffer[south][west] +
          currentBuffer[south][x] +
          currentBuffer[south][east] +
          currentBuffer[y][west] +
          currentBuffer[y][east];
      } else {
        throw new Error('unknown border option:' + options.border);
      }
      // If we've made it this far, we're not infected.
      return neighbourCount;
    };
    // decide state of next generation
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbours = countNeighbours(x, y);
        const cell = currentBuffer[y][x];

        if (cell) {
          if (neighbours > 3 || neighbours < 2) {
            backBuffer[y][x] = 0;
          } else {
            backBuffer[y][x] = 1;
          }
        } else {
          if (neighbours === 3) {
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
