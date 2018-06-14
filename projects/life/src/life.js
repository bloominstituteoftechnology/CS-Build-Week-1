/**
 * Implemention of a Life
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
    this.width = width;
    this.height = height;

    // Double buffer now, one that is active, the other compiling
    this.cells = [Array2D(width, height), Array2D(width, height)]; // Will create a 2 Dimentional grid for us to put cells in
    this.currentBufferIndex = 0;
    this.randomize(); // Then call randomize on the above

    // console.log('this.cells inside Life constructor: ', this.cells);

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  // We use this instead of going an grabbing the information directly b/c
  // just to keep logic separate...review this part again???
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    // Goes through width and height of grid
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // const currentIndex = this.currentBufferIndex;
    // const nextIndex = this.currentBufferIndex === 0 ? 1 : 0;

    // animate
    const currentBuffer = this.cells[this.currentBufferIndex];
    const backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    // console.log('current', currentBuffer);
    // console.log('back', backBuffer);

    // See if we have a nieghbor that can infect this cell and change its color:

    function countNeighbors(row, col) {
      let neighborCount = 0;

      // Treat neigbors off the grid as dead cells.

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;
        // Check for out of bounds
        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;
          // Also need to check for out of bounds here
          if (colPos < 0 || colPos === this.width) {
            continue;
          }
          // Don't count this cell
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          // If here - and have passed all previous tests, then
          if (currentBuffer[rowPos][colPos] === 1) {
            neighborCount++;
          }
        }
      }
      return neighborCount;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let neighborCount = countNeighbors.call(this, h, w);
        // Cell is currently alive:
        if (currentBuffer[h][w] === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[h][w] = 0;
          } else {
            backBuffer[h][w] = 1;
          }
        } else {
          if (neighborCount === 3) {
            backBuffer[h][w] = 1;
          } else {
            backBuffer[h][w] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
