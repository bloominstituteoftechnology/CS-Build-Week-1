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
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * 2)
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const countNeighbors = (x, y, options={border: 'nowrap'}) => {
      let neighborCount = 0;
      // Actually count living neighbors
      if (options.border === 'wrap') {
        // Count neighbors, wrapping around the edges
        let north = y - 1;
        let south = y + 1;
        let west = x - 1;
        let east = x + 1;
        
        if (north < 0) {
          north = this.height - 1;
        }
        if (south > this.height - 1) {
          south = 0;
        }
        if (west < 0) {
          west = this.width - 1;
        }
        if (east > this.width - 1) {
          east = 0;
        }

        neighborCount = 
          currentBuffer[north][west] + 
          currentBuffer[north][x] +
          currentBuffer[y][west] +
          currentBuffer[y][east] +
          currentBuffer[south][x] +
          currentBuffer[south][east] +
          currentBuffer[south][west]

      } else if (options.border === 'nowrap') {
        // Treat out-of-bounds as zero
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          let yPos = y + yOffset;
          if (yPos < 0 || yPos >= this.height) {
            // Out of bounds!
            continue;
          }

          for (let xOffset = -1; xOffset <= 1; yOffset++) {
            let xPos = x + xOffset;
            if (xPos < 0 || xPos >= this.width) {
              // out of bounds!
              continue;
            }
            if (yPos === y && xPos === x) {
              // Can't be your own neighbor!
              continue;
            }

            neighborCount += currentBuffer[yPos][xPos];

          }
        }
      } else {
        throw new Error('Unknown border option: ' + options.border);
      }

      return neighborCount;
    };

    // Update backBuffer to have the next time state
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; y< this.width; x++) {
        const neighbors = countNeighbors(x, y);
        const thisCell = currentBuffer[y][x];

        // Implement Game Of Life rules
        if (thisCell) {
          // Current cell is alive
          if (neighbors < 2 || neighbors > 3) {
            // Death due to underpopulation or overpopulation
            backBuffer[y][x] = 0;
          } else {
            // Still alive!
            backBuffer[y][x] = 1;
          }
        } else {
          // Current cell is dead
          if (neighbors === 3) {
            // A cell is born!
            backBuffer[y][x] = 1;
          } else {
            // Still dead.
            backBuffer[y][x] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
