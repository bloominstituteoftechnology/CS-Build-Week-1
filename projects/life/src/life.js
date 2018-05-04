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
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.buffer[this.currentBufferIndex][row][col] = Math.round(Math.random());
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
    
    function countLiveNeighbors(row, col) {
      let liveNeighborCount = 0;

      if (col > 0) {
        if (currentBuffer[row][col - 1] > 0) {
          liveNeighborCount++;
        }
      }

      if (row > 0) {
        if (currentBuffer[row - 1][col] > 0) {
          liveNeighborCount++;
        }
      }

      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] > 0) {
          liveNeighborCount++;
        }
      }

      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] > 0) {
          liveNeighborCount++;
        }
      }

      // Diagonals

      // // NW
      // if (row > 0 && col > 0) {
      //   if (currentBuffer[row - 1][col - 1] > 0) {
      //     liveNeighborCount++;
      //   }
      // }

      // // NE
      // if (row > 0 && col < this.width - 1) {
      //   if (currentBuffer[row - 1][col + 1] > 0) {
      //     liveNeighborCount++;
      //   }
      // }

      // // SW
      // if (row < this.height - 1 && col > 0) {
      //   if (currentBuffer[row + 1][col - 1] > 0) {
      //     liveNeighborCount++;
      //   }
      // }

      // // SE
      // if (row < this.height - 1 && col < this.width - 1) {
      //   if (currentBuffer[row + 1][col + 1] > 0) {
      //     liveNeighborCount++;
      //   }
      // }

      return liveNeighborCount;
    }

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const neighborCount = countLiveNeighbors.call(this, row, col);
        // cell is alive
        if (currentBuffer[row][col]) {
          // if alive cell has 2 or 3 alive neighbors
          if (neighborCount > 1 && neighborCount <= 4) {
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;
          }
        } else {
          // else if cell is dead and has exactly 3 alive neighbors
          if (neighborCount === 3) {
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
