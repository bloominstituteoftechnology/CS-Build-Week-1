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
    for (let y = 0; y < this.height; y++) /* looping over height */{
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) /* looping over height */{
      for (let x = 0; x < this.width; x++) /* looping over width */{
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = rand;
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

    // See if we have a neighbor to infect this one
    function countNeighbors(x, y) {
      let livingCount = 0;

      // check west neighbor
      if (x > 0) {
        if (currentBuffer[y][x - 1] === 1) {
          livingCount++;
        }
      }

      // north
      if (y > 0) {
        if (currentBuffer[y-1][x] === 1) {
          livingCount++;
        }
      }

      // east
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === 1) {
          livingCount++;
        }
      }
      
      // south
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === 1) {
          livingCount++;
        }
      }

      // check north west neighbor
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === 1) {
          livingCount++;
        }
      }

      // north east
      if (y > 0 && x < this.width - 1) {
        if (currentBuffer[y - 1][x + 1] === 1) {
          livingCount++;
        }
      } 

      // south east
      if (x < this.width - 1 && y < this.height -1) {
        if (currentBuffer[y + 1][x + 1] === 1) {
          livingCount++;
        }
      }

      // south west
      if (y < this.height - 1 && x > 0) {
        if (currentBuffer[y + 1][x - 1] === 1) {
          livingCount++;
        }
      }

      return livingCount;
    }

    // loop thru and decide the state of next gerneration for each cell processed
    for (let y = 0; y < this.height; y++) /* looping over height */{
      for (let x = 0; x < this.width; x++) /* looping over width */{

        let livingCount = (countNeighbors.bind(this))(x, y);
        // console.log(`livingCount: ${livingCount}`);

        let currentCell = currentBuffer[y][x];

        // check if currentCell alive or dead
        if (currentCell === 1) {
          // alive - check if dying or still alive
          if (livingCount < 2 || livingCount > 3) {
            backBuffer[y][x] = 0; // die
          } else {
            backBuffer[y][x] = 1; // live
          }
        } else {
          // dead - check if coming to life or still dead
          if (livingCount === 3) {
            backBuffer[y][x] = 1; // live
          } else {}
          backBuffer[y][x] = 0; // die
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
