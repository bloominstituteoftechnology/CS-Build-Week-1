/**
 * Implemention of Conway's game of Life
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
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    // Allocate the double buffer
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
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random()*2)|0; // Random 0 or 1
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // Fill the offscreen buffer with the next life generation built
    // from the current buffer.

    let backBufferIndex = this.currentBufferIndex === 0? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    /**
     * Count the neighbors of a cell
     */
    function countNeighbors(x, y, options={border:'zero'}) {
      let neighborCount = 0;

      if (options.border === 'wrap') {
        let north = y - 1;
        let south = y + 1;
        let west = x - 1;
        let east = x + 1;

        // Wrap around the edges

        if (north < 0) {
          north = this.height - 1;
        }
        
       if (south === this.height) {
          south = 0;
        }

        if (west < 0) {
          west = this.width - 1;
        } 

        if (east === this.width) {
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

      } else if (options.border === 'zero') {

        // Treat out of bounds as zero
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          let yPos = y + yOffset;

          if (yPos < 0 || yPos === this.height) {
            // Out of bounds
            continue;
          }

          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            let xPos = x + xOffset;

            if (xPos < 0 || xPos === this.width) {
              // Out of bounds
              continue;
            }

            // Don't count center element
            if (xOffset === 0 && yOffset === 0) {
              continue;
            }

            neighborCount += currentBuffer[yPos][xPos];
          }
        }

      } else {
        throw new Error('unknown border option' + options.border);
      }

      return neighborCount;

    } // countNeighbors()

    // Loop through and decide if the next generation is alive or dead
    // for each cell processed.

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {

        let neighborCount = (countNeighbors.bind(this))(x, y);

        let thisCell = currentBuffer[y][x];

        if (thisCell === 1) {
          // We're alive. Let's check if we're dying.
          if (neighborCount < 2 || neighborCount > 3) {
            // Wake up. Time to die.
            backBuffer[y][x] = 0;
          } else {
            // We're still alive!
            backBuffer[y][x] = 1;
          }
        } else {
          // We're dead. Let's see if we come to life.
          if (neighborCount === 3) {
            // A rebirth!
            backBuffer[y][x] = 1;
          } else {
            // We're still dead
            backBuffer[y][x] = 0;
          }
        }
      }
    }

    // Now the backBuffer is populated with the next generation life
    // data. So we declare that to be the new current buffer.
    
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;