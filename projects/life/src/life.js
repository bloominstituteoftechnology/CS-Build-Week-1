/**
 * Implemention of Conway's game of Life
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
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBufferIndex];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random()*2)|0; // Random 0 or 1
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
    function countNeighbors(col, row, options={border:'zero'}) {
      let neighborCount = 0;

      if (options.border === 'wrap') {
        let north = row - 1;
        let south = row + 1;
        let west = col - 1;
        let east = col + 1;

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
          currentBuffer[north][col] +
          currentBuffer[north][east] +
          currentBuffer[row][west] +
          currentBuffer[row][east] +
          currentBuffer[south][west] +
          currentBuffer[south][col] +
          currentBuffer[south][east];

      } else if (options.border === 'zero') {

        // Treat out of bounds as zero
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          let rowPos = row + rowOffset;

          if (rowPos < 0 || rowPos === this.height) {
            // Out of bounds
            continue;
          }

          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            let colPos = col + colOffset;

            if (colPos < 0 || colPos === this.width) {
              // Out of bounds
              continue;
            }

            // Don't count center element
            if (colOffset === 0 && rowOffset === 0) {
              continue;
            }

            neighborCount += currentBuffer[rowPos][colPos];
          }
        }

      } else {
        throw new Error('unknown border option' + options.border);
      }

      return neighborCount;

    } // countNeighbors()

    // Loop through and decide if the next generation is alive or dead
    // for each cell processed.

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {

        let neighborCount = (countNeighbors.bind(this))(col, row);

        let thisCell = currentBuffer[row][col];

        if (thisCell === 1) {
          // We're alive. Let's check if we're dying.
          if (neighborCount < 2 || neighborCount > 3) {
            // Wake up. Time to die.
            backBuffer[row][col] = 0;
          } else {
            // We're still alive!
            backBuffer[row][col] = 1;
          }
        } else {
          // We're dead. Let's see if we come to life.
          if (neighborCount === 3) {
            // A rebirth!
            backBuffer[row][col] = 1;
          } else {
            // We're still dead
            backBuffer[row][col] = 0;
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