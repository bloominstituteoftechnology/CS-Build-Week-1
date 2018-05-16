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

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height),
    ];

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
    const buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random() * 2) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    const currentBuffer = this.buffer[this.currentBufferIndex];
    const backBuffer = this.buffer[backBufferIndex];

    const neighborCount = (x, y) => {
      let neighbors = 0;

      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const yPos = y + yOffset;

        if (yPos < 0 || yPos === this.height) {
          continue;
        }

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
          const xPos = x + xOffset;

          if (xPos < 0 || xPos === this.width) {
            continue;
          }

          if (xOffset === 0 && yOffset === 0) {
            continue;
          }

          neighbors += currentBuffer[yPos][xPos];
        }
      }
      return neighbors;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const countNeighbors = (neighborCount.bind(this))(x, y);

        const currentCell = currentBuffer[y][x];

        if (currentCell === 1) {
          if (countNeighbors < 2 || countNeighbors > 3) {
            backBuffer[y][x] = 0;
          } else {
            backBuffer[y][x] = 1;
          }
        } else {
          if (countNeighbors === 3) {
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
