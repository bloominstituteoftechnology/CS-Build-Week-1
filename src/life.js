/**
 * Implemention of Conway's game of Life
 */

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
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    // Allocate the double buffer
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    
    this.randomize();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!! TODO
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for( let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random()*2)|0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // Fill the offscreen buffer with the next life generation built
    // from the current buffer.
    let currentBuffer = this.buffer[this.currentBufferIndex];

    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let backBuffer = this.buffer[this.backBufferIndex];

    let width = this.width;
    let height = this.height;
    /**
     * Count the neighbors of a cell
     */
    function countNeighbors(row, col) {
      let count = 0;
      // !!! TODO
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let neighborRow = row + rowOffset;

        if (neighborRow < 0 || neighborRow === height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let neighborCol = col + colOffset;
          
          if (rowOffset === 0 && colOffset === 0) {
            continue;
          }
          if (neighborCol < 0 || neighborCol === width) {
            continue;
          }
          let neighbor = currentBuffer[neighborRow][neighborCol];

          if (neighbor === 1) {
            count++;
          }
        }
      }
      return count;
    }

    // Loop through and decide if the next generation is alive or dead
    // for each cell processed.

    // !!! TODO

    // Now the backBuffer is populated with the next generation life
    // data. So we declare that to be the new current buffer.
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {

        let neighborCount = (countNeighbors.bind(this))(col, row);

        let thisCell = currentBuffer[row][col];

        if (thisCell === 1) { //active
          if(neighborCount < 2 || neighborCount > 3) {
            //lost
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = 1;
          }
        } else { 
          if (neighborCount === 3) {//new life
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;
          }
        }
      }
    }
    // !!! TODO
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;