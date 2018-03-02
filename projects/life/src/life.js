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

  sterilization() {
    for (let y = 25; y < this.height - 25; y++) {
      for (let x = 25; x < this.width - 25; x++) {
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  assimilation() {
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randystart) + randystart
    );

    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  dropPopulationBomb() {
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randystart) + randystart
    );

    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
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
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
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
  step() {
    // !!!! IMPLEMENT ME !!!!
    // Fill the offscreen buffer with the next cca generation built
    // from the current buffer.
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    function hasLivingNeighbor(x, y) {
      let LNCounter = 0;

      // North neighbor of cell x, y
      if (y > 0) {
        if (currentBuffer[y - 1][x] === 1) {
          LNCounter++;
        }
      }

      // northeast
      if (y > 0 && x < this.width - 1) {
        if (currentBuffer[y - 1][x + 1] === 1) {
          LNCounter++;
        }
      }

      // East
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) {
          LNCounter++;
        }
      }

      // southeast
      if (x < this.width - 1 && y < this.height - 1) {
        if (currentBuffer[y + 1][x + 1] === 1) {
          LNCounter++;
        }
      }

      // South
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) {
          LNCounter++;
        }
      }

      //southwest
      if (y < this.height - 1 && x > 0) {
        if (currentBuffer[y + 1][x - 1] === 1) {
          LNCounter++;
        }
      }

      // West
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) {
          LNCounter++;
        }
      }

      // northwest
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) {
          LNCounter++;
        }
      }

      // If we've made it this far we're not infected!
      return LNCounter;
    }

    // loop through and decide on the state of the next generation for each cell processed
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let neighborCounter = hasLivingNeighbor.call(this, x, y);
        let currentCell = currentBuffer[y][x];

        // the this cell is live
        if (currentCell === 1) {
          // if the live neighbors are <2 or >3
          if (neighborCounter < 2 || neighborCounter > 3) {
            // this cell dies
            backBuffer[y][x] = 0;
          }
          // if the live neighbors equal 2 or 3
          if (neighborCounter === 2 || neighborCounter === 3) {
            // this cell lives
            backBuffer[y][x] = 1;
          }
        }
        // if this cell is dead
        if (currentCell === 0) {
          // if live neighbors is exactly 3
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
