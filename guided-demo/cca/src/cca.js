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
    this.buffers = [Array2D(width, height), Array2D(width, height)];
    this.currentBufferIndex = 0;
    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffers[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for(let y = 0; y < this.height; y++) {
      this.buffers[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    let buffer = this.buffers[this.currentBufferIndex];
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random() * MODULO)|0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.buffers[this.currentBufferIndex];
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let backBuffer = this.buffers[backBufferIndex];

    function hasInfectiousNeighbor(x, y) {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // North neighbor
      if (y > 0 && currentBuffer[y-1][x] === nextValue)  {
        return true;
      }

      // South neighbor
      if (y < this.height - 1 && currentBuffer[y+1][x] === nextValue)  {
        return true;
      }

      // East neighbor
      if (x < this.width - 1 && currentBuffer[y][x+1] === nextValue) {
        return true;
      }

      // West neighbor
      if (x > 0 && currentBuffer[y][x-1] === nextValue) {
        return true;
      }
      return false;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (hasInfectiousNeighbor.call(this, x, y)) {
          backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO;
        } else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default CCA;