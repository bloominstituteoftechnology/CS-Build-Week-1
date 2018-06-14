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
      Array2D(width, height),
    ];

    this.currentBufferIndex = 0;

    // this.randomize();

    // this.clear();
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
    for (let row = 0; row < this.height; row++) {
      this.cells[this.currentBufferIndex][row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize = () => {
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
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    // let neighborCount = 0;
    
    function countNeighbors(height, width) {
      let neighborCount = 0;

      // NW
      if (height > 0) {
        if (width > 0) {
          if (currentBuffer[height - 1][width - 1] === 1) {
            neighborCount++;
          }
        }
      }

      // Check N
      if (height > 0) {
        if (currentBuffer[height - 1][width] === 1) {
          neighborCount++;
        }
      }
      
      // Check NE
      if (height > 0) {
        if (width < this.width - 1) {
          if (currentBuffer[height - 1][width + 1] === 1) {
            neighborCount++;
          }
        }
      }

      // Check W
      if (width > 0) {
        if (currentBuffer[height][width - 1] === 1) {
          neighborCount++;
        }
      }

      // Check E
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === 1) {
          neighborCount++;
        }
      }

      // Check SW
      if (height < this.height - 1) {
        if (width > 0) {
          if (currentBuffer[height + 1][width - 1] === 1) {
            neighborCount++;
          }
        }
      }

      // Check S
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === 1) {
          neighborCount++;
        }
      }
      
      // Check SE
      if (height < this.height - 1) {
        if (width < this.width - 1) {
          if (currentBuffer[height + 1][width + 1] === 1) {
            neighborCount++;
          }
        }
      }

      return neighborCount;
    }

    // Process all cells for next generation status
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        let lifeState = this.cells[this.currentBufferIndex][height][width];
        let neighborCount = countNeighbors.call(this, height, width);
        // handle living cells based on number of neighbors
        if (lifeState === 1) {
          if (neighborCount < 2) {
            // dies of loneliness
            backBuffer[height][width] = 0;
          } else if (neighborCount === 2 || neighborCount === 3) {
            // lives to next generation
            backBuffer[height][width] = 1;
          } else {
            // dies of overcrowding
            backBuffer[height][width] = 0;
          }
        } else {
          // handle dead cells based on number of neighbors
          if (neighborCount === 3) {
            // new cell is born
            backBuffer[height][width] = 1;
          } else {
            backBuffer[height][width] = 0;
          }
        }
      }
    }

    // change buffer index
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
