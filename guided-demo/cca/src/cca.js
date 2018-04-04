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

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBufferindex];
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for (let y=0; y<this.height; y++){
      this.buffer[this.currentBufferindex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBufferindex];
    for (let y=0; y<this.height; y++){
      for (let x = 0; x < this.width; x++) {
          buffer[y][x] = math.floor(Math.random() * MODULO);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferindex === 0? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferindex];
    let backBuffer = this.buffer[backBufferIndex];

    const hasInfectiousNeighbor= (x,y) => {
      const nextvalue = (currentBuffer [y][x] + 1) % MODULO;
      if (x>0) {
        if (currentBuffer[y] [x-1]=== nextValue) {
          return true;
        }
      }
      //north
      if(y>0) {
        if(currentBuffer [y-1][x] === nextValue) {
          return true;
        }
      }
      //east
      if(x< this.width -1) {
      if (currentBuffer[y] [x+1] === nextValue) {
        return true;
      }

    }
    //south
    if (y <this.height -1) {
      if (currentBuffer[y + 1][x] === nextValue) {
        return true;
      }
    } 
    return false;
  }
  //loop through the currentBuffer and populate 
  //the backBuffer (next generation based on above helper)
  for (let y =0; y < this.height; y++) {
    for (let x= 0; x< this.width; x++){
      hasInfectiousNeighbor(x,y){
        backBuffer[y][x] = (currentBuffer[y][x]+1) % MODULO;
      } else {
        backBuffer[y][x]= currentBuffer[y][x];
      }

    }
  }
  this.currentBufferindex = backBuffer[y][x];
}
}

export default CCA;