/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++)
    a[i] = new Array(width);

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
      Array2D(width, height),
    ];
    this.clear()
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
    for (let i = 0; i < this.height; i++)
      this.buffer[this.currentBufferIndex][i].fill(0);
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for (let i = 0; i < this.height; i++)
      for (let j = 0; j < this.width; j++)
        this.buffer[this.currentBufferIndex][i][j] =
          Math.floor(Math.random() * MODULO);
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const countNeighbors = (x, y, options = { border: 'wrap' }) => {
      let neighborCount = 0;

      if (options.border === 'zero') {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          const yPos = y + yOffset;
          if (yPos < 0 || yPos >= this.height) continue;
          
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            const xPos = x + xOffset;
            if (xPos < 0 || xPos >= this.width) continue;

            if (xPos === x && yPos === y) continue;

            neighborCount += currentBuffer[yPos][xPos];
          }
        }
      } else if (options.border === 'wrap') {
        const north = y <= 0 
          ? this.height - 1 
          : y - 1;
        const south = y >= this.height - 1
          ? 0
          : y + 1;
        const west = x <= 0
          ? this.width - 1
          : x - 1;
        const east = x >= this.width - 1
          ? 0
          : x + 1;

        neighborCount =
          currentBuffer[north][west] +
          currentBuffer[north][x] +
          currentBuffer[north][east] +
          currentBuffer[south][west] +
          currentBuffer[south][x] +
          currentBuffer[south][east] +
          currentBuffer[y][west] +
          currentBuffer[y][east]; 
      } else {
        throw new Error('unknown border option ' + options.border);
      }
      return neighborCount;
    };
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = countNeighbors(x, y);
        const cell = currentBuffer[y][x];

        if (cell === 1) {
          if (neighbors > 3 || neighbors < 2) {
            backBuffer[y][x] = 0;
          } else {
            backBuffer[y][x] = 1;
          }
        } else {
          if (neighbors === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }
    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
