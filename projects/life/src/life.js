import gliderGun from './gliderGun.js';
/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  const a = new Array(height);
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
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
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
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    const cB = this.buffer[this.currentBufferIndex]; // currentBuffer
    const bB = this.buffer[backBufferIndex]; // backBuffer
    const w = this.width, h = this.height;

    const countNeighbors = (x, y) => {
      let c = 0; // counter
      if (x > 0 && cB[y][x - 1]) c++;
      if (x < w - 1 && cB[y][x + 1]) c++;
      if (y > 0 && cB[y - 1][x]) c++;
      if (y < h - 1 && cB[y + 1][x]) c++;
      if (x > 0 && y < h - 1 && cB[y + 1][x - 1]) c++;
      if (y > 0 && x < w - 1 && cB[y - 1][x + 1]) c++;
      if (x > 0 && y > 0 && cB[y - 1][x - 1]) c++;
      if (x < w - 1 && y < h - 1 && cB[y + 1][x + 1]) c++;
      return c;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const counter = countNeighbors(x, y);
        const cell = cB[y][x];
        if (cell && counter === 2) bB[y][x] = 1;
        else if (cell && counter === 3) bB[y][x] = 1;
        else if (!cell && counter === 3) bB[y][x] = 1;
        else bB[y][x] = 0;
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }

  addGlider() {
    const randX = Math.floor(Math.random() * (this.width - 100)) + 1;
    const randY = Math.floor(Math.random() * (this.height - 100)) + 1;
    const cB = this.buffer[this.currentBufferIndex]; // currentBuffer
    cB[randY - 1][randX - 1] = 0;     // 0 1 0
    cB[randY - 1][randX] = 1;         // 0 0 1
    cB[randY - 1][randX + 1] = 0;     // 1 1 1
    cB[randY][randX - 1] = 0;
    cB[randY][randX] = 0;
    cB[randY][randX + 1] = 1;
    cB[randY + 1][randX - 1] = 1;
    cB[randY + 1][randX] = 1;
    cB[randY + 1][randX + 1] = 1;
  }

  addGliderGun() {
    const randX = Math.floor(Math.random() * (this.width - 100)) + 40;
    const randY = Math.floor(Math.random() * (this.height - 100)) + 40;
    const cB = this.buffer[this.currentBufferIndex]; // currentBuffer
    for (let y = 0; y < gliderGun.length; y++) {
      for (let x = 0; x < gliderGun[0].length; x++) {
        cB[randY + y][randX + x] = gliderGun[y][x];
      }
    }

  }
}

export default Life;
