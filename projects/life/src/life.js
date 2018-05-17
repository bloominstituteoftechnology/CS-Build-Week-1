/**
 * Implementation of Conway's game of Life
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

    this.randomize();

    this.clear();
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
    for (let i = 0; i < this.height; i++) {
      this.cells[this.currentBufferIndex][i].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random() * MODULO) | 0;
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

    function countNeighbors(row, col) {
        let livingCount = 0;


        // North
        if(row > 0){
            if (currentBuffer[row - 1][col] === 1){
                livingCount++;
            }
        }

        // Northeast
        if(col > this.width - 1 && row > 0){
            if (currentBuffer[row - 1][col + 1] === 1){
                livingCount++;
            }
        }

        // X00
        // 0A0
        // 000
        // Northwest
        if(col > 0 && row > 0){
            if (currentBuffer[row - 1][col - 1] === 1){
                livingCount++;
            }
        }

        // South
        if(row < this.height - 1){
            if (currentBuffer[row + 1][col] === 1) {
                livingCount++;
            }
        }

        // Southeast
        if(col > this.width - 1 && row < this.height - 1){
            if (currentBuffer[row + 1][col + 1] === 1){
                livingCount++;
            }
        }

        // Southwest
        if(col > 0 && row < this.height - 1){
            if (currentBuffer[row + 1][col - 1] === 1){
                livingCount++;
            }
        }

        // East
        if(col < this.width - 1){
            if (currentBuffer[row][col + 1] === 1){
                livingCount++;
            }
        }

        // 000
        // XA0
        // 000
        // West
        if(col > 0){
            if (currentBuffer[row][col - 1] === 1){
                livingCount++;
            }
        }

      return livingCount;
    }

    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
          const totalNeighbors = countNeighbors.call(this, row, col);

          // If living
          if (currentBuffer[row][col] === 1) {
              // do alive rules
              if (totalNeighbors < 2 || totalNeighbors > 3) {
                  backBuffer[row][col] = 0;
              } else {
                  backBuffer[row][col] = currentBuffer[row][col];
              }
          } else {
              // do dead rules
              if (totalNeighbors === 3) {
                  backBuffer[row][col] = 1;
              } else {
                backBuffer[row][col] = currentBuffer[row][col];
              }
          }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
  }
}

export default Life;