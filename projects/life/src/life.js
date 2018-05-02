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

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ]

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
      for (let col = 0; col < this.height; col++) {
        this.buffer[this.currentBufferIndex][row][col] = (Math.random() * 2) | 0;
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
    let deadNeighborCount = 0;

    function hasDeadNeighbors(row, col) {
      const nextValue = (this.buffer[this.currentBufferIndex][row][col] + 1) % 2;

      // West
      if(col > 0) {
        if (currentBuffer[row][col - 1] === nextValue) {
          deadNeighborCount++;
        }
      }

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col] === nextValue) {
          deadNeighborCount++;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] === nextValue) {
          deadNeighborCount++;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] === nextValue) {
          deadNeighborCount++;
        }
      }

      // Diagonals

      // NW
      if (row > 0 && col > 0) {
        if (currentBuffer[row - 1][col - 1] === nextValue) {
          deadNeighborCount++;
        }
      }

      // NE
      if (row > 0 && col < this.width - 1) {
        if (currentBuffer[row - 1][col + 1] === nextValue) {
          deadNeighborCount++;
        }
      }

      // SW
      if (row < this.height - 1 && col > 0) {
        if (currentBuffer[row + 1][col -1] === nextValue) {
          deadNeighborCount++;
        }
      }

      // SE
      if (row < this.height - 1 && col < this.width - 1) {
        if (currentBuffer[row + 1][col + 1] === nextValue) {
          deadNeighborCount++;
        }
      }

      return deadNeighborCount;
    }

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.height; col++) {
        // if alive cell has 2 or 3 alive neighbors
        if (backBuffer[row][col] === 0) {
          if (hasDeadNeighbors.call(this, row, col) === 2 || hasDeadNeighbors.call(this, row, col) === 3) {
            // stays alive
            backBuffer[row][col] = currentBuffer[row][col];
          } else {
            // dies
            backBuffer[row][col] = (currentBuffer[row][col] + 1) % 2;
          }
        }
        if (backBuffer[row][col] === 1) {
          // else if cell is dead and has exactly 3 alive neighbors
          if (hasDeadNeighbors.call(this, row, col) === 3) {
            // comes back to life
            backBuffer[row][col] = (currentBuffer[row][col] + 1) % 2;
          } else {
            // stays dead
            backBuffer[row][col] = currentBuffer[row][col];
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
