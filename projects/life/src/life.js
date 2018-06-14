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
    for (let height = 0; height < this.height; height++) {
      this.cells[this.currentBufferIndex][height].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * 2) | 0;
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

    function hasInfectiousNeighbor(height, width) {
      let neighbor = 0;

      // west
      if (width > 0) {
        if (currentBuffer[height][width - 1] === 1) {
          neighbor++;
        }
      }
      //north
      if (height > 0) {
        if (currentBuffer[height - 1][width] === 1) {
          neighbor++;
        }
      }
      //east
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === 1) {
          neighbor++;
        }
      }
      //south
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === 1) {
          neighbor++;
        }
      }
      //north-west
      if (height > 0 && width > 0) {
        if (currentBuffer[height - 1][width - 1] === 1) {
          neighbor++;
        }
      }

      //north-east
      if (height > 0 && width < this.width - 1) {
        if (currentBuffer[height - 1][width + 1] === 1) {
          neighbor++;
        }
      }
      //south-east
      if (height < this.height - 1 && width < this.width - 1) {
        if (currentBuffer[height + 1][width + 1] === 1) {
          neighbor++;
        }
      }
      //south-west
      if (height < this.height - 1 && width > 0) {
        if (currentBuffer[height + 1][width - 1] === 1) {
          neighbor++;
        }
      }
      return neighbor;
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        let neighbor = hasInfectiousNeighbor.call(this, height, width);

        if (currentBuffer[height][width] === 1) {
          if (neighbor < 2 || neighbor > 3) {
            backBuffer[height][width] = 0;
          } else {
            backBuffer[height][width] = 1;
          }
        } else {
          if (neighbor === 3) {
            backBuffer[height][width] = 1;
          } else {
            backBuffer[height][width] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
