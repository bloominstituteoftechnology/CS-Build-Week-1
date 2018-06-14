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

    this.cells = [Array2D(width, height), Array2D(width, height)];
    this.currentBufferIndex = 0;
    this.randomize();
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
    for(let height = 0; height < this.height; height++){
      for(let width = 0; width < this.width; width++){
        this.cells[this.currentBufferIndex][height][width] = 0;
      }
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for(let height = 0; height < this.height; height++){
      for(let width = 0; width < this.width; width++){
        this.cells[this.currentBufferIndex][height][width] = Math.round(Math.random());
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function isAlive(height, width) {
      let count = 0;
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width])
          count++;
      }
      if (height < this.height - 1 && width < this.width -1) {
        if (currentBuffer[height + 1][width + 1])
          count++;
      }
      if (height < this.height - 1 && width > 0) {
        if (currentBuffer[height + 1][width - 1])
          count++;
      }
      if (height > 0) {
        if (currentBuffer[height - 1][width])
          count++;
      }
      if (height > 0 && width < this.width - 1) {
        if (currentBuffer[height - 1][width + 1])
          count++;
      }
      if (height > 0 && width > 0) {
        if (currentBuffer[height - 1][width - 1])
            count++;
      }
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1])
          count++;
      }
      if (width > 0) {
        if (currentBuffer[height][width - 1])
          count++;
      }

      if (currentBuffer[height][width] === 1) {
        if (count === 2 || count === 3)
          return 1;
      }

      if (currentBuffer[height][width] === 0){
        if (count === 3)
          return 1;
        if (Math.random() < .001)
          return 1;
      }

      if (currentBuffer[height][width] === 1){
        if (count === 0) {
          return Math.random() <= .01 ? 2 : 0;
        }
          
      }

      if (currentBuffer[height][width] === 2){ // mutate all living neighbors
        if (Math.random() <= .01)
          return 1;
        if (height < this.height - 1){  
          if (currentBuffer[height + 1][width])
            backBuffer[height + 1][width] = 2;
        }
      
        if (height < this.height - 1 && width < this.width -1) {
          if (currentBuffer[height + 1][width + 1])
            backBuffer[height + 1][width + 1] = 2;
        }
        if (height < this.height - 1 && width > 0) {
          if (currentBuffer[height + 1][width - 1])
          backBuffer[height + 1][width - 1] = 2
        }
        if (height > 0) {
          if (currentBuffer[height - 1][width])
            backBuffer[height - 1][width] = 2;
        }
        if (height > 0 && width < this.width - 1) {
          if (currentBuffer[height - 1][width + 1])
            backBuffer[height - 1][width + 1] = 2;
        }
        if (height > 0 && width > 0) {
          if (currentBuffer[height - 1][width - 1])
              backBuffer[height - 1][width - 1] = 2;
        }
        if (width < this.width - 1) {
          if (currentBuffer[height][width + 1])
            backBuffer[height][width + 1] = 2
        }
        if (width > 0) {
          if (currentBuffer[height][width - 1])
            backBuffer[height][width - 1] = 2;
        }
      }
      return 0;
      
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        // if (isAlive.call(this, height, width)) {
        //   backBuffer[height][width] = 1;
        // } else {
        //   backBuffer[height][width] = 0;
        // }
        backBuffer[height][width] = isAlive.call(this, height, width);
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
