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

    this.currentBuffer = 0;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]

    this.randomize();
    // this.cells = Array2D(width, height);
    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBuffer];
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
    let buffer = this.cells[this.currentBuffer];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = Math.floor(Math.random() * MODULO);
        // buffer[row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBuffer === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBuffer];
    let backBuffer = this.cells[backBufferIndex];

    function hasInfectiousNeighor(row, col) {
      const nextValue = (currentBuffer[row][col] + 1) % MODULO;

      // West
      if (col > 0) {
        if (currentBuffer[row][col - 1] === nextValue) return true;
      }

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col] === nextValue) return true;
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] === nextValue) return true;
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] === nextValue) return true;
      }
      
      return false;
    }

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (hasInfectiousNeighor.call(this, row, col)) {
          backBuffer[row][col] = (currentBuffer[row][col] + 1) % MODULO;
        } else {
          backBuffer[row][col] = currentBuffer[row][col];
        }
      }
    }

    this.currentBuffer = this.currentBuffer === 0 ? 1 : 0;
  }
}

export default CCA;