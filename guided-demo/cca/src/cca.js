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

    //allocate double buffer
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
   * fill with 0's
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

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; y < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * MODULO);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0 
    let currentBuffer = this.bufferr[this.currentBufferIndex];
    let backBuffer = this.buffer[this.backBufferIndex];
    

    // helper function to see if cell has infectious neighbor
    const  hasInfectiousNeighbour = (x, y) => {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // check west neighbour to see if it has nextValue
      if (x > 0) {  // if it isn't it has no west neighbour it's a col 0
        if(currentBuffer[y][x-1] === nextValue) {
          return true; 
        }
      } 

      // check North, note x,y 00 is top left not bottom left of graph
      if (y > 0) {  // if it isn't it has no north neighbour
        if(currentBuffer[y - 1][x] === nextValue) {
          return true; 
        }
      } 

      // check south
      if (y < this.height - 1) {  // if it isn't it has no north neighbour
        if(currentBuffer[y + 1][x] === nextValue) {
          return true; 
        }
      }

      // check east
      if (x < this.width - 1) {  // if it isn't it has no north neighbour
        if(currentBuffer[y][x + 1] === nextValue) {
          return true; 
        }
      }

    // default case, none of the neighbours have the value or infection
    return false; 

    }

    // loop through the current buffer and populate backbuffer based on currenbufer 
    // infected neighbour value
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.lenght; x++) {
        if (hasInfectiousNeighbour(x,y)) { // backbuffer value is next val
          backBuffer[x][y] = (currentBuffer[y][x] + 1) % MODULO; 
        } else { // backBuffer same as current buffer
          backBuffer[y][x] = currentBuffer[y][x];
        }

      }
    }
    this.currentBufferIndex === backBufferIndex;
  }

 

}

export default CCA;