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

    this.cells = Array2D(width, height);

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells;

  }

  /**
   * Clear the cca grid
   */
  clear() {
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        this.cells[row][col] = (Math.random() * MODULO) | 0;
      }
    }
    console.log('cells after randomize', this.cells);
  }

  /**
   * Run the simulation for a single step
   */
  step() {
  }
}

export default CCA;