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
    this.width = width;
    this.height = height;

    this.currentIndex = 0;

    this.frames = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.randomize();

    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.frames[this.currentIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    const choice = Math.floor(Math.random() * 2);
    let current = this.cells[this.currentIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.height; col++) {
        current[row][col] = choice;
      }
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    let current = this.cells[this.currentIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.height; col++) {
        current[row][col] = (Math.floor(Math.random() * 2)) | 0;
      }
    }
  }
  

  /**
   * Run the simulation for a single step
   */
  step() {
    let bufferIndex = this.currentIndex === 0 ? 1 : 0;
    let current = this.cells[this.currentIndex];
    let buffer = this.cells[this.bufferIndex];

    function countNeighbors(row, col) {
      let neighbors = 0;

      // Top-left
      if (col > 0 && row > 0) {
        if (current[row - 1][col - 1] === 1) {
          neighbors++;
        }
      }
      // Top
      if (row > 0) {
        if (current[row - 1][col] === 1) {
          neighbors++;
        }
      }
      // Top-right
      if (col < this.width - 1 && row > 0) {
        if (current[row - 1][col + 1] === 1) {
          neighbors++;
        }
      }

      // Left
      if (col > 0) {
        if (current[row][col - 1] === 1) {
          neighbors++;
        }
      }
      // Right
      if (col < this.width - 1) {
        if (current[row][col + 1] === 1) {
          neighbors++;
        }
      }

      // Bottom-left
      if (col > 0 && row < this.height - 1) {
        if (current[row + 1][col - 1] === 1) {
          neighbors++;
        }
      }
      // Bottom
      if (row < this.height - 1) {
        if (current[row + 1][col] === 1) {
          neighbors++;
        }
      }
      // Bottom-right
      if (col < this.width - 1 && row < this.height - 1) {
        if (current[row + 1][col + 1] === 1) {
          neighbors++;
        }
      }

      return neighbors;
    }

    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        const alive = current[row][col];        
        const numberOfNeighbors = countNeighbors.call(this, row, col);

        if (alive) {
          buffer[row][col] = (numberOfNeighbors != 2 && numberOfNeighbors != 3) ?
          0 : 1;
        } else {
          buffer[row][col] = (numberOfNeighbors === 3) ?
          1 : 0;
        }
      }
    }
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
}

export default Life;
