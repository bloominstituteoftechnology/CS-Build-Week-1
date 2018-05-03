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

    this.currentBufferIndex = 0;

    //this.grid = Array2D(width, height);

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ]

    this.clear();
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
    for(let row = 0; row < this.height; row++)
    {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for(let row = 0; row < this.height; row++){
      for(let col = 0; col < this.width; col++){
        this.buffer[this.currentBufferIndex][row][col] = (Math.random() * MODULO) | 0;
        if (this.buffer[this.currentBufferIndex][row][col] === 1) {
          if (Math.random() < 0.1) {
            this.buffer[this.currentBufferIndex][row][col] = 2;
          }
        }
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    //console.log("stepping");
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    function countLivingNeighbors(row, col) {
      let neighbors = 0;

      // console.log("called countLivingNeighbors");

      for (let neighborRow = -1; neighborRow <= 1; neighborRow++) {
        // global row position for neighbor being tested
        let rowPos = row + neighborRow;
        if (rowPos < 0 || rowPos >= this.height) {
          // out of bounds
          continue;
        }
        for (let neighborCol = -1; neighborCol <= 1; neighborCol++) {
          let colPos = col + neighborCol;
          if (colPos < 0 || colPos >= this.width) {
            // out of bounds
            continue;
          }
          //we are in bounds
          if (currentBuffer[rowPos][colPos] === 1) {
            if (!(rowPos === row && colPos === col)) {
              neighbors++;
            }
          }
        }
      }

      return neighbors;
    }

    function checkForZombies(row, col) {
      let neighbors = 0;

      for (let neighborRow = -1; neighborRow <= 1; neighborRow++) {
        // global row position for neighbor being tested
        let rowPos = row + neighborRow;
        if (rowPos < 0 || rowPos >= this.height) {
          // out of bounds
          continue;
        }
        for (let neighborCol = -1; neighborCol <= 1; neighborCol++) {
          let colPos = col + neighborCol;
          if (colPos < 0 || colPos >= this.width) {
            // out of bounds
            continue;
          }
          //we are in bounds
          if (currentBuffer[rowPos][colPos] === 2) {
            if (!(rowPos === row && colPos === col)) {
              return true;
            }
          }
        }
      }

      return false;
    }

    for(let row = 0; row < this.height; row++){
      for(let col = 0; col < this.width; col++){
        let numberOfNeighbors = countLivingNeighbors.call(this, row, col);
        let hasZombieNeighbor = checkForZombies.call(this, row, col);
        let lifeState = 1;
        if (hasZombieNeighbor) { 
          lifeState = 2;
        }
        // if cell is alive or zombie
        if (currentBuffer[row][col] === 1 || currentBuffer[row][col] === 2) {
          if (numberOfNeighbors < 2) {
            // cell dies of loneliness
            backBuffer[row][col] = 0;
          }
          if (numberOfNeighbors === 2 || numberOfNeighbors === 3 || numberOfNeighbors === 4) {
            backBuffer[row][col] = lifeState;
          }
          if (numberOfNeighbors > 4) {
            // die of overpopulation
            backBuffer[row][col] = 0;
          }
        }
        // cell is dead
        else if (currentBuffer[row][col] === 0) {
          if (numberOfNeighbors === 3 || numberOfNeighbors === 4) {
            // come to life
            backBuffer[row][col] = lifeState;
          }
          else {
            // stay dead
            backBuffer[row][col] = 0;
          }
        }
        // invalid state
        else {
          console.log("Error, invalid state");
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
