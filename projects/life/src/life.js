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
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.curBuffInd = 0;
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.curBuffInd];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!! 
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.curBuffInd][y].fill(0)
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
        this.buffer[this.curBuffInd][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const backBuffInd = this.curBuffInd === 0 ? 1:0;
    const currentBuff = this.buffer[this.curBuffInd];
    let backBuff = this.buffer[backBuffInd];

    const countNeighbors = (x, y, options={border:'zero'}) => {
      let neighborCount = 0;
      // adding all of the alive neighbors
      if (options.border === 'zero') {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          const yPos = y + yOffset;
          if (yPos < 0 || yPos > this.height - 1) {
            continue;
          }
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            const xPos = x + xOffset;
            if (xPos < 0 || xPos > this.width - 1) {
              continue
            }
            if (xPos === x && yPos === y) {
              continue;
            }
            neighborCount += currentBuff[yPos][xPos];
          }
        }
      } else if (options.border === 'wrap') {
        let north = y - 1;
        let south = y + 1;
        let west = x - 1;
        let east = x + 1;

        //Check if out of bounds and need to wrap
        if (north < 0) {
          north = this.height - 1;
        }
        if (south > this.height - 1) {
          south = 0;
        } 
        if (west < 0) {
          west =  this.width - 1;
        }
        if (east > this.width - 1) {
          east = 0;
        }

        neighborCount = 
        currentBuff[north][west] +
        currentBuff[north][x] +
        currentBuff[north][east] +
        currentBuff[south][west] +
        currentBuff[south][x] +
        currentBuff[south][east]+
        currentBuff[y][west] +
        currentBuff[y][east];
      
      } else {
        throw new Error ('unknown border option' + options.border);
      }
      return neighborCount;
    }
    // loop through and decide if the next genertion is alive or dead for 
    // each possessed cells
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // life rules
        const neighbors = countNeighbors(x, y);
        const cell = currentBuff[y][x];

        if (cell === 1) {
          // kill cells 
          if (neighbors > 3 || neighbors < 2) {
            backBuff[y][x] = 0;
          }
          else {
            // keep alive
              backBuff[y][x] = 1;
          }
        } else {
          if (neighbors === 3) {
            backBuff[y][x] = 1;
          } else {
            backBuff[y][x] = 0;
          }
        }
      }
    }
    this.curBuffInd = backBuffInd;
  }
}

export default Life;
