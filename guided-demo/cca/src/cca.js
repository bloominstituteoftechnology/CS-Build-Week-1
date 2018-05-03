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

    //this.grid = Array2D(width, height);

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ]

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    //console.log("In getcells, buffer index is", this.currentBufferIndex);
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for(let row = 0; row < this.height; row++)
    {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for(let row = 0; row < this.height; row++){
      for(let col = 0; col < this.width; col++){
        this.buffer[this.currentBufferIndex][row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    //console.log("stepping");
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    function hasInfectionsNeighbor(row, col){
      const nextValue = (this.buffer[this.currentBufferIndex][row][col] + 1) % MODULO;

      //West
      if(col > 0){
        if (currentBuffer[row][col - 1] === nextValue + 2)
        {
          // console.log("changing cell");
          return true;
        }
      }

      // North
      if (row > 0) {
        if (currentBuffer[row-1][col] === nextValue - 2)  {
          return true;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col+1] === nextValue + 2) {
          return true;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row+1][col] === nextValue) {
          return true;
        }
      }


      //if no neighbers can infect this cell
      return false;
    }

    for(let row = 0; row < this.height; row++){
      for(let col = 0; col < this.width; col++){
        if (hasInfectionsNeighbor.call(this, row, col)){
          //console.log("changing color");
          backBuffer[row][col] = (currentBuffer[row][col] + 1) % MODULO;
        }
        else{
          backBuffer[row][col] = currentBuffer[row][col];
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
    //console.log("after changing buffer index, ", this.currentBufferIndex);
  }
}

export default CCA;