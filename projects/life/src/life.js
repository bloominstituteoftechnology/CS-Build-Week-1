/**
 * Implementation of Conway's game of Life
 * If you ever want to hear an explantion from brian again 
 * just go to 42:00 in cs8 cellular automata video 
 * 
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

    this.currentBufferIndex = 0;
    this.cells = [Array2D(width, height),Array2D(width, height)];
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
    // !!!! IMPLEMENT ME !!!!
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1: 0];

    function countNeighbors(row,col) {
      let neighborCount = 0;
      
      //Treat neighbors off the grid as dead cells. 
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;

        if (rowPos < 0 || rowPos === this.height) {
          // Out of bounds
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          if (colPos < 0 || colPos === this.width) {
            // Out of bounds
            continue;
          }

          // Don't count center element
          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }
          if (currentBuffer[rowPos][colPos] === 1) {
            neighborCount++;
          }
        }
      }
      return neighborCount;
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        let neighborCount = countNeighbors.call(this, height, width);
        //Cell is currently alive 
        if (currentBuffer[height][width] === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            // WE ARE ALIVE
            backBuffer[height][width] = 0;
          } else {
            backBuffer[height][width] = 1;
          }
          // CELL IS CURRENTLY DEAD
        } else {
          if (neighborCount === 3) {
            backBuffer[height][width] = 1;
          } else {
            backBuffer[height][width] = 0;
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1:0;
  }
}

export default Life;
