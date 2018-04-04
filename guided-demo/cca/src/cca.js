/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
 * CCA class
 */
class CCA {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;
    // allocate the DOUBLE BUFFER
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
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    const buffer = this.buffer[this.currentBufferIndex];

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        buffer[h][w] = (Math.random() * MODULO) | 0; // Math.floor(Math.random()*MODULO)
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step(){
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // Helper function to see if cell has "infectious" neighbor
    const hasInfectiousNeighbor = (h, w) => {
      const nextValue = (currentBuffer[h][w] + 1) % MODULO;

      // check that we are not the very first cell in a row
      if (w > 0) {
        // check west (left-side) neighbor
        if (currentBuffer[h][w-1] === nextValue) {
          return true;
        }
      }
      
      //check north (top) neighbor
      if (h > 0) {
        if (currentBuffer[h-1][w] === nextValue) {
          return true;
        }
      }

      //check east (right) neighbor
      if (w < this.width-1) {
        if (currentBuffer[h][w+1] === nextValue) {
          return true;
        }
      }

      //check south neighbor
      if (h < this.height-1) {
        if (currentBuffer[h+1][w] === nextValue) {
          return true;
        }
      }

      return false;
    }
    // loop through the current buffer and populate the back buffer(next gen) based on above helper
    for (let h = 0; h < this.height; h++){
      for (let w = 0; w < this.width; w++){
        if (hasInfectiousNeighbor(h, w))  {
          backBuffer[h][w] = (currentBuffer[h][w] + 1) * MODULO; // increments
        } else {
          backBuffer[h][w] = currentBuffer[h][w]; // stays the same
        }
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default CCA;