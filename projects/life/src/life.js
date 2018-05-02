/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;

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

    // Allocate the double buffer
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.clear(); // this.randomize()
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
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * MODULO);
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

    // Helper functin to see if cell has "infectious" neighbor
    const checkLiveNeighbors = (x, y) => {
      let count = 0;

      // left 
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) count++;
      }

      // up
      if (y > 0) {
        if (currentBuffer[y - 1][x] === 1) count++;
      }

      // up left corner 
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) count++;
      }

      // up right corner
      if (x < this.width - 1 && y > 0) {
        if (currentBuffer[y - 1][x + 1] === 1) count++;
      }

      // right
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) count++;
      }

      // down
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) count++;
      }

      // down left corner
      if (x > 0 && y < this.height - 1) {
        if (currentBuffer[y + 1][x - 1] === 1) count++;
      }

      // down right corner
      if (x < this.width - 1 && y < this.height - 1) {
        if (currentBuffer[y + 1][x + 1] === 1) count++;
      }

      return count;
    }

    /**
     * const countNeighbors = (x, y, options={border: 'wrap'}) => {
     *    let neighborCount = 0;
     *    if (option.border === 'wrap') {
     *        // count neighbors, wrapping around the edges
     *        let north = y - 1;
     *        let south = y + 1;
     *        let west = x - 1;
     *        let east = x + 1;
     * 
     *        if (north < 0) {
     *            north = this.height - 1;
     *        }
     * 
     *        if (south > this.height - 1) {
     *            south = 0;
     *        }
     * 
     *        if (west < 0) {
     *            west = this.width - 1;
     *        }
     * 
     *        if (east > this.width - 1) {
     *            east = 0;
     *        }
     * 
     *        neighborCount = 
     *            currentBuffer[north][west] +
     *            currentBuffer[north][x] +
     *            currentBuffer[north][east] +
     *            currentBuffer[y][west] +
     *            currentBuffer[y][east] +
     *            currentBuffer[south][x] +
     *            currentBuffer[south][west] +
     *            currentBuffer[south][east] 
     * 
     *    } else if (options.border === 'nowrap) {
     *        // treat out-of-bounds as zero
     *        for (let yOffset = -1; yOffset <= 1; yOffset++) {
     *            let yPos = y + yOffset;
     *            if (yPos < 0 || yPos >= this.height) {
     *                // out of bounds
     *                continue;
     *            }
     *            for (let xOffset = -1; xOffset <= 1; xOffset++) {
     *                let xPos = x + xOffset;
     *                if (xPos < 0 || xPos >= this.width) {
     *                // out of bounds
     *                continue;
     *                }
     * 
     *                if (yPos === y && xPos === x) {
     *                    // can't be your own neighbor
     *                    continue;
     *                }
     * 
     *                neighborCount += currentBuffer[yPos][xPos];
     *            }
     *        }
     *    } else {
     *        throw new Error('Unknown border option: ' + options.border);
     *    }
     * 
     *    return neighborCount;
     * }
     * 
     * // update backBuffer to have the next time state
     * for (let y = 0; y < this.height; y++) {
     *    for (let x = 0; x < this.width; x++) {
     *        const neighbors = countNeighbors(x, y);
     *        const thisCell = currentBuffer[y][x];
     * 
     *        // implement Gol rules
     *        if (thisCell) {
     *            // current cell is alive
     *            if (neighbors < 2 || neighbors > 3) {
     *                // death 
     *                backBuffer[y][x] = 0;
     *            } else {
     *                // still alive
     *                backBuffer[y][x] = 1;
     *            }
     *        } else {
     *            // current cell is dead
     *            if (neighbor === 3) {
     *                // alive
     *                backBuffer[y][x] = 1;
     *            } else {
     *                backBuffer[y][x] = 0;
     *            }
     *        }
     *    }
     * }
     */

    // loop through the currentBuffer and populate the 
    // backBuffer (next genration) based on above helper
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
        if (currentBuffer[y][x] === 1 && (checkLiveNeighbors(x, y) === 2 || checkLiveNeighbors(x, y) === 3)) {
          backBuffer[y][x] === 1
        } 
        // If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
        else if (currentBuffer[y][x] === 0 && checkLiveNeighbors(x, y) === 3) {
          backBuffer[y][x] === 1
        } else {
          backBuffer[y][x] === 0
        }   
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
