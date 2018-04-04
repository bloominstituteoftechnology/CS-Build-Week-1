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

    this.curentBufferIndex = 0;
    // Allocate the double buffer
    this.buffer = [
      Array2D(width,height),
      Array2D(width,height)
    ];
    
    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.curentBufferIndex];
  }

  /**
   * Clear the cca grid
   * (i.e. fill with 0's)
   */
  clear() {
    for( let y = 0; y < this.height; y++) {
      this.buffer[this.curentBufferIndex][y].fill(0);
    } 
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    const buffer = this.buffer[this.curentBufferIndex]
    for( let y = 0; y < this.height; y++) {
      for( let x = 0; x < this.width; x++) {
        buffer[x][y] = Math.floor(Math.random() * MODULO);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.curentBufferIndex === 0? 1:0;
    let currentBuffer = this.buffer[this.curentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // Helper function to see if cell has "infectious" neighbor
    // i.e. neigher with the next state to change to 
    const hasInfectiousNeighbor = (x,y) => { 
      const nextValue = (currentBuffer[y][x] +1) % MODULO; 
        
      // West neighbor
      if (x > 0) {
        if (currentBuffer[y][x-1] === nextValue) {
        return true;
        }
      }

      // North
      if(y>0) {
        if (currentBuffer[y-1][x] === nextValue) {
          return true;
        }
      }

      // East
      if (x< this.width -1) {
        if(currentBuffer[y][x+1] === nextValue) {
        return true;
        }
      }

      // South
      if( y< this.height -1) {
        if( currentBuffer[y+1][x] === nextValue) {
          return true;
        }
      }
      return false;
    }

    // Loop through the currentBuffer and populate the
    // backBuffer (next gen) based on the above helper
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x< this.width; x++) {
        if(hasInfectiousNeighbor(x,y)) {
          backBuffer[y][x] = (currentBuffer[y][x] +1) % MODULO;
        } else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    this.curentBufferIndex = backBufferIndex;
  }
}

export default CCA;