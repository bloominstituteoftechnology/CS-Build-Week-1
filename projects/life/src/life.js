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
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for(let y = 0; y < this.height; ++y) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for(let y = 0; y < this.height; ++y) {
      for(let x = 0; x < this.width; ++x) {
        this.buffer[this.currentBufferIndex][y][x] = Math.floor(Math.random() * 2);
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

    function countNeighbors(x, y, options={border:'zero'}) { // options is optional
      let neighborCount = 0;
      // count the neighbors
      if(options.border === 'zero') {
        // Treat out-of-bounds as zero (dead)
        for(let yOffset = -1; yOffset <= 1; yOffset++) {
          const yPos = y + yOffset;
          if(yPos < 0 || yPos >= this.height) {
            // Out of bounds
            continue;
          }

          for(let xOffset = -1; xOffset <= 1; xOffset++) {
            const xPos = x + xOffset;
            if(yPos < 0 || xPos >= this.width) {
              // Out of bounds
              continue;
            } 

            if(xPos === x && yPos === y) {
              // you can't be ur own neighbor
              continue;
            }

            neighborCount += currentBuffer[yPos][xPos];
          }

        }

      } else if(options.border === 'wrap') {
        // wrap-around (check neighbors on the other far side)
        let north = y - 1;
        let south = y + 1;
        let west = x - 1;
        let east = x + 1;

        // check if we need to wrap
        // North
        if(north < 0) {
          north = this.height - 1;
        }

        // south
        if(south >= this.height) {
          south = 0;
        }

        // west
        if(west < 0) {
          west = this.width-1;
        }

        // east
        if(east >= this.width) {
          east = 0;
        }

        neighborCount = currentBuffer[north][west] + 
                        currentBuffer[north][x] + 
                        currentBuffer[north][east] + 
                        currentBuffer[south][west] + 
                        currentBuffer[south][x] + 
                        currentBuffer[south][east] + 
                        currentBuffer[y][west] + 
                        currentBuffer[y][east]

      } else {
        throw new Error('unknown border option' + options.border);
      }

      return neighborCount;
    }

    // Loop through and decide if the next generation is alive or dead
    // for each cell processed
    for(let y = 0; y < this.height; ++y) {
      for(let x = 0; x < this.width; ++x) {
        // Game of Life rules
        const neighbors = countNeighbors(x, y);
        const cell = currentBuffer[y][x];

        if(cell === 1) {
          // Current alive
          if (neighbors > 3 || neighbors < 2) {
            backBuffer[y][x] = 0;
          } else {
            backBuffer[y][x] = 1;
          }
        } else {
          // currently dead
          if(neighbors === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }
    this.currentBufferIndex = this.backBufferIndex;
  }
}

export default Life;
