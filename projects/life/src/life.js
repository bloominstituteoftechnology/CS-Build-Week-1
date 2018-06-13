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
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * 1) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function livingNeighbors(height, width) {
      let neighbors = 0;

      // west
      if (width > 0) {
        if (currentBuffer[height][width - 1] === 1) {
          neighbors++;
        }
        
        // northwest
        if (height > 0) {
          if (currentBuffer[height - 1][width - 1] === 1) {
            neighbors++;
          }
        }

        // southwest
        if (height < this.height - 1) {
          if (currentBuffer[height + 1][width - 1] === 1) {
            neighbors++;
          }
        }
      }
      
      // north
      if (height > 0) {
        if (currentBuffer[height - 1][width] === 1) {
          neighbors++;
        }
      }

      // east
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === 1) {
          neighbors++;
        }

        // northeast
        if (height > 0) {
          if (currentBuffer[height - 1][width + 1] === 1) {
            neighbors++;
          }
        }

        // southeast
        if (height < this.height - 1) {
          if (currentBuffer[height + 1][width + 1] === 1) {
            neighbors++;
          }
        }
      }
      
      // south
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === 1) {
          neighbors++;
        }
      }
      
      return neighbors;
    }

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        
        // rebirth
        if (livingNeighbors.call(this, h, w) === 1 && currentBuffer[h][w] === 0) {
          backBuffer[h][w] = 1;
          continue;
        }
        
        // survives
        if ((livingNeighbors.call(this, h, w) === 1 || livingNeighbors.call(this, h, w) === 2) && currentBuffer[h][w] === 1) {
          backBuffer[h][w] = currentBuffer[h][w];
          continue;
        }

        // dies
        else {
          backBuffer[h][w] = 0;
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
