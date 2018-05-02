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

    this.bufferI = 0;

    this.buffer = [Array2D(width, height), Array2D(width, height)];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.bufferI];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.bufferI][row].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.buffer[this.bufferI][row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  zombie_simul = zombie => {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        /* 0 = zombie, 1 = human */
        this.buffer[this.bufferI][row][col] =
          row === zombie.y && col === zombie.x ? 0 : 1;
      }
    }
  };

  /**
   * Run the simulation for a single step
   */
  step() {
    const backBufferI = this.bufferI === 0 ? 1 : 0;
    const backBuffer = this.buffer[backBufferI];
    const currentBuffer = this.buffer[this.bufferI];

    const hasInfectiousNeighbor = (row, col) => {
      const nextVal = (currentBuffer[row][col] + 2) % MODULO;

      /* north */
      if (row > 0) {
        // if (currentBuffer[row - 1][col] === nextVal) return true;
        if (currentBuffer[row - 1][col] === nextVal) return true;
      }

      /* east */
      if (col < this.width - 1)
        if (currentBuffer[row][col + 1] === nextVal) return true;

      /* south */
      if (row < this.height - 1)
        if (currentBuffer[row + 1][col] === nextVal) return true;

      /* west */
      if (col > 0) {
        if (currentBuffer[row][col - 1] === nextVal) return true;
      }

      return false;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (hasInfectiousNeighbor(row, col))
          backBuffer[row][col] = (currentBuffer[row][col] + 2) % MODULO;
        else backBuffer[row][col] = currentBuffer[row][col];
      }
    }

    this.bufferI = this.bufferI === 0 ? 1 : 0;
  }
}

export default CCA;
