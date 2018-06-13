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
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    // this.drawRandomGlider();
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
    this.cells = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height),
    ];
    // Just generate a new empty 2d array to clear buffer
  }

  /**
   * Randomize the life grid
   */
  drawCanvas(imageArray) {
    let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let index = (row * this.width + col) * 4;

        if (imageArray.data[index + 1] === 0xff) {
          buffer[row][col] = 1;
        } else {
          buffer[row][col] = 0;
        }
      }
    }
  }

  randomize() {
    // !!!! IMPLEMENT ME !!!!
    // let buffer = this.cells[this.currentBufferIndex];
    // for (let row = 0; row < this.height; row++) {
    //   for (let col = 0; col < this.width; col++) {
    //     buffer[row][col] = Math.round(Math.random()); // Random 0 or 1
    //   }
    // }
    // for (let row = 0; row < this.height; row++) {
    //   for (let col = 0; col < this.width; col++) {
    //     let randSeed = Math.round(3 / (3 * Math.PI));
    //     if (col % 100/*(this.width/10)*/ === 0 || row % 100/*(this.height/10)*/ === 0) {
    //       if (col < this.width - randSeed && row < this.height - randSeed) {
    //         buffer[row + randSeed][col + randSeed] = 1;
    //       }
    //     }
    //   }
    // }
  }

  drawRandomGlider() {
    // let buffer = this.cells[this.currentBufferIndex];
    // const randY = Math.floor(Math.random() * Math.floor(this.height - 1));
    // const randX = Math.floor(Math.random() * Math.floor(this.width - 1));
    // if (buffer[randY][randX] !== undefined) buffer[randY][randX] = 1;
    // if (buffer[randY + 1][randX + 1] !== undefined)
    //   if (buffer[randY + 2][randX + 1] !== undefined)
    //     buffer[randY + 2][randX + 1] = 1;
    // if (buffer[randY + 2][randX] !== undefined) buffer[randY + 2][randX] = 1;
    // if (buffer[randY + 2][randX - 1] !== undefined)
    //   buffer[randY + 2][randX - 1] = 1;
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];
    const numberOfNeighbors = (row, col) => {
      // left
      let neighbors = 0;
      if (col > 0) {
        if (currentBuffer[row][col - 1]) {
          neighbors++;
        }
      }

      // up
      if (row > 0) {
        if (currentBuffer[row - 1][col]) {
          neighbors++;
        }
      }

      // right
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1]) {
          neighbors++;
        }
      }

      // down
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col]) {
          neighbors++;
        }
      }
      // check top left adj
      if (col > 0 && row > 0) {
        if (currentBuffer[row - 1][col - 1]) {
          neighbors++;
        }
      }
      // check top right adj
      if (col < this.width - 1 && row > 0) {
        if (currentBuffer[row - 1][col + 1]) {
          neighbors++;
        }
      }
      // check bottom left adj
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col + 1]) {
          neighbors++;
        }
      }
      // check bottom right adj
      if (col > 0 && row < this.height - 1) {
        if (currentBuffer[row + 1][col - 1]) {
          neighbors++;
        }
      }
      return neighbors;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let neighbors = numberOfNeighbors.call(this, row, col);
        if (currentBuffer[row][col] === 1) {
          if (neighbors < 2 || neighbors > 3) {
            backBuffer[row][col] = 0; // Kill cell
          } else if (neighbors === 2 || neighbors === 3) {
            backBuffer[row][col] = currentBuffer[row][col];
          } else {
            backBuffer[row][col] = currentBuffer[row][col];
          }
        } else {
          if (neighbors === 3) {
            backBuffer[row][col] = 1;
          } else if (neighbors > 3) {
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = currentBuffer[row][col];
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
