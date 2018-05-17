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

    this.cells = [ Array2D(width, height), Array2D(width, height) ];

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
    let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      buffer[row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = Math.floor(Math.random() * 2);
      }
    }
  }

  addGlider() {
    // pick a random spot
    const x = Math.floor(Math.random() * (this.height - 5));
    const y = Math.floor(Math.random() * (this.width - 5));
    const glider = {
      12: 1,
      23: 1,
      31: 1,
      32: 1,
      33: 1
    };

    let buffer = this.cells[this.currentBufferIndex];
    for (let row = x; row < x + 5; row++) {
      for (let col = y; col < y + 5; col++) {
        if (glider[`${row - x}${col - y}`]) buffer[row][col] = 1;
        else buffer[row][col] = 0;
      }
    }
    console.log('added at: ', x, y);
  }

  addGospelGliderGun() {
    const x = Math.floor(Math.random() * (this.height - 36));
    const y = Math.floor(Math.random() * (this.width - 9));
    const glider = {
      '024': 1,
      122: 1,
      124: 1,
      212: 1,
      213: 1,
      220: 1,
      221: 1,
      234: 1,
      235: 1,
      311: 1,
      315: 1,
      320: 1,
      321: 1,
      334: 1,
      335: 1,
      400: 1,
      401: 1,
      410: 1,
      416: 1,
      420: 1,
      421: 1,
      500: 1,
      501: 1,
      510: 1,
      514: 1,
      516: 1,
      517: 1,
      522: 1,
      524: 1,
      610: 1,
      616: 1,
      624: 1,
      711: 1,
      715: 1,
      812: 1,
      813: 1
    };

    let buffer = this.cells[this.currentBufferIndex];
    for (let row = x; row < x + 9; row++) {
      for (let col = y; col < y + 36; col++) {
        const colY = `${col - y}`.length === 2 ? `${col - y}` : `0${col - y}`;
        if (glider[`${row - x}${colY}`]) buffer[row][col] = 1;
        else buffer[row][col] = 0;
      }
    }
    console.log('added at: ', x, y);
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const otherBufferIndex = 1 - this.currentBufferIndex;
    const currentBuffer = this.cells[this.currentBufferIndex];
    const otherBuffer = this.cells[otherBufferIndex];
    console.log('currentBuffer is', currentBuffer);
    // implement rules
    const rowsToBeChecked = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let alive = 0;
        for (let i = 0; i < rowsToBeChecked.length; i++) {
          const offset = rowsToBeChecked[i];
          const offsetRow = row + offset[0];
          const offsetCol = col + offset[1];
          if (offsetRow < 0 || offsetCol < 0 || offsetRow >= this.height || offsetCol >= this.width) continue;
          if (currentBuffer[offsetRow][offsetCol] === 1) alive++;
          if (alive > 4) break;
        }
        if (currentBuffer[row][col] === 1) {
          if (alive === 2 || alive === 3) otherBuffer[row][col] = 1;
          else otherBuffer[row][col] = 0;
        } else {
          if (alive === 3) otherBuffer[row][col] = 1;
          else otherBuffer[row][col] = 0;
        }
      }
    }

    this.currentBufferIndex = otherBufferIndex;
  }
}

export default Life;
