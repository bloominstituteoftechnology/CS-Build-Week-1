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
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    // for (let y = 0; y < this.height; y++) {
    //   this.buffer[this.currentBufferIndex][y].fill(0);
    // }
    this.buffer[this.currentBufferIndex].forEach(each => each.fill(0));
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.buffer[this.currentBufferIndex][y][x] = Math.floor(Math.random() * 2);
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

    function hasLivingNeighbor(x, y) {
      let counter = 0;

      // North 
      if (y > 0) {
        if (currentBuffer[y - 1][x] === 1) {
          counter++;
        }
      }

      // Northeast
      if (y > 0 && x < this.width - 1) {
        if (currentBuffer[y - 1][x + 1] === 1) {
          counter++;
        }
      }

      // East
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) {
          counter++;
        }
      }

      // Southeast
      if (x < this.width - 1 && y < this.height - 1) {
        if (currentBuffer[y + 1][x + 1] === 1) {
          counter++;
        }
      }

      // South
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) {
          counter++;
        }
      }

      // Southwest
      if (y < this.height - 1 && x > 0) {
        if (currentBuffer[y + 1][x - 1] === 1) {
          counter++;
        }
      }

      // West
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) {
          counter++;
        }
      }

      // Northwest
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) {
          counter++;
        }
      }

      return counter;
    }

    // loop through and decide on the state of the next generation for each cell processed
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let neighborCounter = hasLivingNeighbor.call(this, x, y);

        // alive
        if (currentBuffer[y][x] === 1) {
          // if more than 2 but less than 3
          if (neighborCounter < 2 || neighborCounter > 3) {
            // cell dies
            backBuffer[y][x] = 0;
          }
          // if there are 2 or 3 live neighbors
          if (neighborCounter === 2 || neighborCounter === 3) {
            // cell lives
            backBuffer[y][x] = 1;
          }
        }
        // if this cell is dead
        if (currentBuffer[y][x] === 0) {
          // if there are 3 live neighbors
          if (neighborCounter === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;