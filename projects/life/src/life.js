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
    this.width = width;
    this.height = height;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    
    this.currentBufferIndex = 0;
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
   * Clear the life grid
   */
  clear() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = 0;
      }
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // for (let height = 0; height < this.height; height++) {
    //   for (let width = 0; width < this.width; width++) {
    //     this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
    //   }
    // }
    this.cells[this.currentBufferIndex][250][250] = 1;
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function livingNeighbors(row, col) {
      let neighbors = 0;
      
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;
        // check bounds
        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;
          // check bounds
          if (colPos < 0 || colPos === this.width) {
            continue;
          }
          // don't count self
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          if (currentBuffer[rowPos][colPos] === 1) {
            neighbors++;
          }
        }
      }   
      return neighbors;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
       let neighbors = livingNeighbors.call(this, h, w);
       // cell is living
       if (currentBuffer[h][w] === 1) {
         if (neighbors < 1 || neighbors > 2) {
           backBuffer[h][w] = 0;
         } else {
           backBuffer[h][w] = 1;
         }
         // cell is dead
       } else {
         if (neighbors === 1) {
           backBuffer[h][w] = 1;
         } else {
           backBuffer[h][w] = 0;
         }
       }
     }
   }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
      
  }
}

export default Life;
