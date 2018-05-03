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
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.buffer[this.currentBufferIndex][y][x] = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const backBufferIndex = this.currentBufferIndex === 1 ? 0 : 1;
    const currentBuffer = this.buffer[this.currentBufferIndex];
    const backBuffer = this.buffer[backBufferIndex];

    const checkAliveNeighbors = (x, y) => {

      let count = 0;
      
      // North ~ Top
      if (y > 0)
        if (currentBuffer[y - 1][x] === 1) count++;
      // South ~ Bottom
      if (y < this.height - 1)
        if (currentBuffer[y + 1][x] === 1) count++;
      // West ~ Left
      if (x > 0)
        if (currentBuffer[y][x - 1] === 1) count++;
      // East ~ Right
      if (x < this.width - 1)
        if (currentBuffer[y][x + 1] === 1) count++;

      // Diagonals
      // North West ~ Top Left
      if (y > 0 && x > 0)
        if (currentBuffer[y - 1][x - 1] === 1) count++;
      // North East ~ Top Right
      if (y > 0 && x < this.width - 1)
        if (currentBuffer[y - 1][x + 1] === 1) count++;
      // South West ~ Bottom Left
      if (y < this.height - 1 && x > 0)
        if (currentBuffer[y + 1][x - 1] === 1) count++;
      // South East ~ Bottom Right
      if (y < this.height - 1 && x < this.width - 1)
        if (currentBuffer[y + 1][x + 1] === 1) count++;

      return count;

    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        
        const livingNeighborsCount = checkAliveNeighbors(x, y);

        const currentState = currentBuffer[y][x];
        let futureState = currentState;

        if (currentState === 1) {
          if (livingNeighborsCount < 2) {
            futureState = 0;
          }
          else if (livingNeighborsCount > 3) {
            futureState = 0;
          }
        } else {
          if (livingNeighborsCount === 3) {
            futureState = 1;
          }
        }

        backBuffer[y][x] = futureState;

      }
    }

    this.currentBufferIndex = backBufferIndex;

  }
}

export default Life;
