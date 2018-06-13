/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
 * CCA class
 */
class CCA {
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

    // console.log('this.cells inside CCA constructor: ', this.cells);

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
          (Math.random() * MODULO) | 0; // CHECK THIS???
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

    function hasInfectiousNeighbor(height, width) {
      const nextValue = (currentBuffer[height][width] + 1) % MODULO;
      // See visual rep below:
      // We are not interested in comparing X with diagonal values, only cardinal values.

      // WEST
      if (width > 0) {
        if (currentBuffer[height][width - 1] === nextValue) {
          return true;
        }
      }
      // NORTH
      if (height > 0) {
        if (currentBuffer[height - 1][width] === nextValue) {
          return true;
        }
      }
      // EAST
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === nextValue) {
          return true;
        }
      }
      // SOUTH
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === nextValue) {
          return true;
        }
      }
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        if (hasInfectiousNeighbor.call(this, height, width)) {
          backBuffer[height][width] =
            (currentBuffer[height][width] + 1) % MODULO;
        } else {
          backBuffer[height][width] = currentBuffer[height][width];
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;
