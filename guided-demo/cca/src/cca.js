/**
 * Implemention of a CCA
 */

const MODULO = 2;

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
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.currentBufferIndex = 0;
    this.width = width;
    this.height = height;
    this.cells = [Array2D(width, height), Array2D(width, height)];
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
  clear() {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];
    //see if we have a neighbor that can affect this cell (change its color)
    function countNeighbors(row, col) {
      let neighborCount = 0;
      //neighbor logic
      for(let rowOffset = - 1; rowOffset <= 1; rowOffset++){
        let rowPos = row + rowOffset;
        //check for out of bounds
        if(rowPos <= 0 || rowPos === this.height){
          continue;
        }
        for(let colOffset = -1; colOffset <= 1; colOffset++){
          let colPos = col + colOffset;
          //check for out of bounds
          if(colPos < 0 || colPos === this.width){
            continue;
          }
          //dont count this cell
          if(colOffset === 0 && rowOffset === 0){
            continue;
          }
          if(currentBuffer[rowPos][colPos] === 1){
            neighborCount++;
          }
        }
      }
      return neighborCount;
    }
    for (let h = 0; h < this.h; h++) {
      for (let w = 0; w < this.w; w++) {
       let neighborCount = countNeighbors.call(this, h, w);
        //cell is alive
        if (currentBuffer[h][w] === 1) {
          if(neighborCount < 2 || neighborCount > 3){
            backBuffer[h][w] = 1;
        } else {
          backBuffer[h][w] = 1;
        }
      } else {
        if(neighborCount === 3){
          backBuffer[h][w] = 1;
        } else {
          backBuffer[h][w] = 0;
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}
}

export default Life;
