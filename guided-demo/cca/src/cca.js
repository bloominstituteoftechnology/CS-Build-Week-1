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

    this.currentBufferIndex = 0;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]

    this.randomize();

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
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
    let buffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random() * MODULO) | 0;
      }
    }
    // console.log('cells after randomize', this.cells);
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];

    function hasInfectiousNeighbor(row, col){
      console.log("width: ", this.width);
      console.log("height: ", this.height);
      console.log("row: ", row);
      console.log("column: ", col);
      console.log("cb[r][c]: ", currentBuffer[row][col]);
      const nextValue = (currentBuffer[row][col] + 1) % MODULO;

      // West
      if(col > 0){
        console.log("WEST", currentBuffer);
        if (currentBuffer[row][col - 1] === nextValue -1){
          return true;
        }
      }
      
      // North
      if(row > 0){
        console.log("NORTH", currentBuffer);
        if (currentBuffer[row - 1][col] === nextValue -1){
          return true;
        }
      }

      // East
      if(col < this.width - 1){
        console.log("EAST", currentBuffer);
        if (currentBuffer[row][col + 1] === nextValue -1){
          return true;
        }
      }

      // South
      if(row < this.height - 1){
        console.log("SOutH", currentBuffer);
        if (currentBuffer[row + 1][col] === nextValue+ 6) {
          return true;
        }
      }

      return false;
    }

    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        if (hasInfectiousNeighbor.call(this, row, col)){
          backBuffer[row][col] = (currentBuffer[row][col] + 1 ) % MODULO;  //Change to infection
        } else {
          backBuffer[row][col] = currentBuffer[row][col]; //no change
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default CCA;