/**
 * Implemention of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width).fill(0);
  }

  return a.map(row => row.map(() => 0));
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

    // Allocate the double buffer
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
    this.buffer[this.currentBufferIndex] = this.buffer[this.currentBufferIndex].map(row => row.map(value => Math.random() < .8 ? 0 : 1));
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // Fill the offscreen buffer with the next life generation built
    // from the current buffer.

    /**
     * Count the neighbors of a cell
     */
    const countNeighbors = (x, y) => {
      // !!! TODO
      let neighbors = 0;
      if (y > 0 && this.buffer[this.currentBufferIndex][y - 1][x]) neighbors++;
      if (y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x]) neighbors++;
      if (x > 0 && this.buffer[this.currentBufferIndex][y][x - 1]) neighbors++;
      if (x < this.width - 1 && this.buffer[this.currentBufferIndex][y][x + 1]) neighbors++;
      if (x > 0 && y > 0 && this.buffer[this.currentBufferIndex][y - 1][x - 1]) neighbors++;
      if (y > 0 && x < this.width - 1 && this.buffer[this.currentBufferIndex][y - 1][x + 1]) neighbors++;
      if (x > 0 && y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x - 1]) neighbors++;
      if (x < this.width - 1 && y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x + 1]) neighbors++;
      return neighbors;
    }
    // Loop through and decide if the next generation is alive or dead
    // for each cell processed.
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    
    this.buffer[backBufferIndex] = this.buffer[backBufferIndex].map((row, y) => row.map((val, x) => {
      const neighbors = countNeighbors(x, y);
      if (neighbors === 3) return 1;
      if (this.buffer[this.currentBufferIndex][y][x] && neighbors === 2) return 1;
      return 0;
    }))

    // !!! TODO
    
    // Now the backBuffer is populated with the next generation life
    // data. So we declare that to be the new current buffer.
    this.currentBufferIndex = backBufferIndex;
    // !!! TODO
  }
}

export default Life;