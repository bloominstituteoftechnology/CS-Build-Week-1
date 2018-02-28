/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;
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
        const rand = Math.floor(Math.random() * MODULO);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    const currentBuffer = this.buffer[this.currentBufferIndex];
    const backBuffer = this.buffer[backBufferIndex];
    const w = this.width, h = this.height;

    const neighborsCounter = (x, y) => {
      let c = 0;
      if (x > 0 && currentBuffer[y][x - 1]) c++;
      if (x < w - 1 && currentBuffer[y][x + 1]) c++;
      if (y > 0 && currentBuffer[y - 1][x]) c++;
      if (y < h - 1 && currentBuffer[y + 1][x]) c++;
      if (x > 0 && y < h - 1 && currentBuffer[y + 1][x - 1]) c++;
      if (y > 0 && x < w - 1 && currentBuffer[y - 1][x + 1]) c++;
      if (x > 0 && y > 0 && currentBuffer[y - 1][x - 1]) c++;
      if (x < w - 1 && y < h - 1 && currentBuffer[y + 1][x + 1]) c++;
      return c;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const quantity = neighborsCounter(x, y);
        if (currentBuffer[y][x] && quantity === 2) backBuffer[y][x] = 1;
        else if (currentBuffer[y][x] && quantity === 3) backBuffer[y][x] = 1;
        else if (!currentBuffer[y][x] && quantity === 3) backBuffer[y][x] = 1;
        else backBuffer[y][x] = 0;
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
