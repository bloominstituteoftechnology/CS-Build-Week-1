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
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffer[this.currentBufferIndex];
    for (let y = 0; y < this.height; y++) {
      for (let x =0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() *2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const countNeighbors = (x, y, options={border: 'wrap'}) => {
      let neighborCount = 0;
      if (options.border === 'wrap') {
        let north = y-1;
        let south = y+1;
        let west = x-1;
        let east = x+1;
        if (north < 0) {
          north =  this.height -1;
        }
        if (south === this.height || south > this.height -1) {
          south = 0;
        }
        if (west < 0) {
          west = this.width -1;
        }
        if (east === this.width || east > this.width -1) {
          east = 0;
        }
        neighborCount =
          currentBuffer[north][west] +
          currentBuffer[north][x] +
          currentBuffer[north][east] +
          currentBuffer[y][west] +
          currentBuffer[y][east] +
          currentBuffer[south][west] +
          currentBuffer[south][x] +
          currentBuffer[south][east];
      } else if (options.border === 'noWrap') {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            let yPos = y + yOffset;
            if (yPos < 0 || yPos >= this.height) {
              continue;
            }
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            let xPos = x + xOffset;
            if (xPos < 0 || xPos >= this.width) {
              continue;
            }
            if (yPos === y && xPos === x) {
              continue;
            }
            neighborCount += currentBuffer[yPos][xPos];
          }
        }
      } else {
        throw new Error('Unkown border option: ' + options.border);
      }
      return neighborCount;
    }
    for (let y =0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = countNeighbors(x,y);
        const thisCell = currentBuffer[y][x];
        if (thisCell) {
          if (neighbors < 2 || neighbors > 3) {
            backBuffer[y][x] = 0;
          } else {
              backBuffer[y][x] = 1;
          }
        } else {
            if (neighbors === 3) {
              backBuffer[y][x] = 1;
            } else {
              backBuffer[y][x] = 0;
            }
        } 
      }
    }
  }
}  
export default Life;
