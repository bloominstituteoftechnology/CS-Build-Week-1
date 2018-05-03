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
    // Array2D buffer
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    // clear buffer, call clear function from below
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
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }

  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    // define buffer
    let buffer = this.buffer[this.currentBufferIndex];
    // for loop for row & col randomizing
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random()*2)|0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    // fill offscreen buffer with current buffer index
    let backBufferIndex = this.currentBufferIndex === 0? 1: 0;  
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    function countNeighbors(col, row, options={border:'zero'}) {
      let neighborCount = 0;
      if (options.border === 'wrap') {
        let n = row - 1;
        let s = row + 1;
        let w = col - 1;
        let e = col + 1

        if (n < 0) {
          n = this.height - 1;
        }

        if (s === this.height) {
          s = 0;
        }

        if (w < 0) {
          w = this.width - 1;
        }

        if (e === this.width) {
          e = 0;
        }

        neighborCount =
        currentBuffer[n][w] +
        currentBuffer[n][col] +
        currentBuffer[n][e] +
        currentBuffer[row][w] +
        currentBuffer[row][e] +
        currentBuffer[s][w] +
        currentBuffer[s][col] +
        currentBuffer[s][e];
      
      } else if (options.border === 'zero') {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          let rowPos = row + rowOffset;
          if (rowPos < 0 || rowPos === this.height) {
            continue;
          }
          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            let colPos = col + colOffset;
            if (colPos < 0 || colPos === this.width) {
              continue;
            }
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

  }

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
    
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
