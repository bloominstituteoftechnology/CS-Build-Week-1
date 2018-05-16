/**
 * Implementation of Conway's game of Life
 */

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
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;
    this.currentBufferIndex = 0;
    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let currentBuffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        currentBuffer[row][col] = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];
    let height = this.height;
    let width = this.width;

    function neighbors(row, col){
      let count = 0;
      //west
      if(col > 0){
        if(currentBuffer[row][col] - 1 === 1){
          count++;
        }
      }
     
      //east
      if(col < width - 1){
        if(currentBuffer[row][col] + 1 === 1){
          count++;
        }
      }

      //north
      if(row > 0){
        if(currentBuffer[row - 1][col] === 1){
          count++;
        }
      }

      //south
      if(row < height - 1){
        if(currentBuffer[row + 1][col] === 1){
          count++;
        }
      }

      return count;
    }

     for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {

        if(currentBuffer[row][col] === 1){
          const count = neighbors(row, col);
          if(count === 2 || count === 3){
            backBuffer[row][col] = 1;
          }else{
            backBuffer[row][col] = 0;
          }
        }

        if(currentBuffer[row][col] === 0){
          const count = neighbors(row, col);
          if(count === 3){
            backBuffer[row][col] = 1;
          }else{
            backBuffer[row][col] = 0;
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
