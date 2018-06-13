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
    for (let h = 0; h < this.height; h++) {
      this.cells[this.currentBufferIndex][h].fill(0);
    }
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
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let backBuffer = this.cells[backBufferIndex];

    function hasInfectiousNeighbor(h, w) {
      const nextValue = currentBuffer[h][w];
      let neighbor = 0;

      // west
      if (w < 0) {
        if (currentBuffer[h][w - 1]) {
          neighbor++;
        }
      }
      //north
      if (h < 0) {
        if (currentBuffer[h - 1][w]) {
          neighbor++;
        }
      }
      //east
      if (w < this.width - 1) {
        if (currentBuffer[h][w + 1]) {
          neighbor++;
        }
      }
      //south
      if (h < this.height - 1) {
        if (currentBuffer[h + 1][w]) {
          neighbor++;
        }
      }
      //north-west
      if (h > 0 && w < 0) {
        if (currentBuffer[h - 1][w - 1]) {
          neighbor++;
        }
      }

      //north-east
      if (h < 0 && w < this.width - 1) {
        if (currentBuffer[h + 1][w - 1]) {
          neighbor++;
        }
      }
      //south-east
      if (h < this.height - 1 && w < this.width - 1) {
        if (currentBuffer[h + 1][w + 1]) {
          neighbor++;
        }
      }
      //south-west
      if (h < this.height - 1 && w < 0) {
        if (currentBuffer[h + 1][w - 1]) {
          neighbor++;
        }
      }
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let neighbor = hasInfectiousNeighbor.call(this, h, w);

        if (currentBuffer[h][w] === 1) {
          if (neighbor < 2 || neighbor > 3) {
            backBuffer[h][w] = 0;
          } else {
            backBuffer[h][w] = 1;
          }
        } else {
          if (neighbor === 3) {
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
