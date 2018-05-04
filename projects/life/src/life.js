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

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBufferIndex];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random()*2)|0; // Random 0 or 1
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {

    let backBufferIndex = this.currentBufferIndex === 0? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    /**
     * Count the neighbors of a cell
     */
    function countNeighbors(col, row, options={border:'zero'}) {
      let neighborCount = 0;

      if (options.border === 'wrap') {
        let north = row - 1;
        let south = row + 1;
        let west = col - 1;
        let east = col + 1;


        if (north < 0) {
          north = this.height - 1;
        }
        
       if (south === this.height) {
          south = 0;
        }

        if (west < 0) {
          west = this.width - 1;
        } 

        if (east === this.width) {
          east = 0;
        }

        neighborCount =
          currentBuffer[north][west] +
          currentBuffer[north][col] +
          currentBuffer[north][east] +
          currentBuffer[row][west] +
          currentBuffer[row][east] +
          currentBuffer[south][west] +
          currentBuffer[south][col] +
          currentBuffer[south][east];

      } else if (options.border === 'zero') {


        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          let rowPos = row + rowOffset;

          if (rowPos < 0 || rowPos === this.height) {

            continue;
          }

          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            let colPos = col + colOffset;
            if (colPos < 0 || colPos === this.width) {
              continue;
            }

            if (colOffset === 0 && rowOffset === 0) {
              continue;
            }

            neighborCount += currentBuffer[rowPos][colPos];
          }
        }

      } else {
        throw new Error('unknown border option' + options.border);
      }

      return neighborCount;

    } 


    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {

        let neighborCount = (countNeighbors.bind(this))(col, row);

        let thisCell = currentBuffer[row][col];

        if (thisCell === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = 1;
          }
        } else {
          if (neighborCount === 3) {
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;
          }
        }
      }
    }
    
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
