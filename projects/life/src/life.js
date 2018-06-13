/**
 * Implementation of Conway's game of Life
 */

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
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

    // this.randomize();

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    this.cells[this.currentBufferIndex].forEach(item => item.fill(0));
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        this.cells[this.currentBufferIndex][h][w] = (Math.random() * 2) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function deadOrAlive(height, width) {
      let counter = 0;
      // North
      if (height > 0) {
        if (currentBuffer[height - 1][width] === 1) {
          counter++;
        }
      }
      //NE
      if (height > 0 && width < this.width - 1) {
        if (currentBuffer[height - 1][width + 1] === 1) {
          counter++;
        }
      }
      // NW
      if (height > 0 && width > 0) {
        if (currentBuffer[height - 1][width - 1] === 1) {
          counter++;
        }
      }
      // South
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === 1) {
          counter++;
        }
      }
      //Southwest
      if (height < this.height - 1 && width > 0) {
        if (currentBuffer[height + 1][width - 1] === 1) {
          counter++;
        }
      }
      //Southeast
      if (height < this.height - 1 && width > this.width - 1) {
        if (currentBuffer[height + 1][width + 1] === 1) {
          counter++;
        }
      }
      // East
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === 1) {
          counter++;
        }
      }
      // West
      if (width > 0) {
        if (currentBuffer[height][width - 1] === 1) {
          counter++;
        }
      }
      return counter;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let count = deadOrAlive.call(this, h, w);

        if (currentBuffer[h][w] === 1) {
          if (count < 2 || count > 3) {
            backBuffer[h][w] = 0;
          }
          if (count === 2 || count === 3) {
            backBuffer[h][w] = 1;
          }
        }
        if (currentBuffer[h][w] === 0) {
          if (count === 3) {
            backBuffer[h][w] = 1;
          } else {
            backBuffer[h][w] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
