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

    this.currentBufferIndex = 0;

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

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
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize(stat) {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[x][y] = Math.random() > 1 - stat ? 1 : 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let backBuffer = this.buffer[backBufferIndex];
    let currentBuffer = this.buffer[this.currentBufferIndex];

    //Check for infectious neighbors
    const hasInfectiousNeighbor = (x, y) => {
      const nextValue = currentBuffer[x][y];
      let neighbor = 0;

      //WEST
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) {
          neighbor++;
        }
      }
      //NORTH
      if (y > 0) {
        if (currentBuffer[y - 1][x] === 1) {
          neighbor++;
        }
      }
      //EAST
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) {
          neighbor++;
        }
      }
      //SOUTH
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) {
          neighbor++;
        }
      }
      //NORTHWEST
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) {
          neighbor++;
        }
      }
      //NORTHEAST
      if (x < this.width - 1 && y > 0) {
        if (currentBuffer[y - 1][x + 1] === 1) {
          neighbor++;
        }
      }
      //SOUTHEAST
      //SOUTHWEST
    }
  }
}

export default Life;
