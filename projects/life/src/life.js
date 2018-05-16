/**
 * Implementation of Conway's game of Life
 */
const MODULO = 8;
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[ i ] = new Array(width);
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

    this.currentIndex = 0;
    this.buffers = [Array2D(width, height), Array2D(width, height)];

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
    return this.buffers[ this.currentIndex ];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffers[ this.currentIndex ];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[ row ][ col ] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let nextIndex = this.currentIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffers[ this.currentIndex ];
    let nextBuffer = this.buffers[ this.nextIndex ];

    // Switch the current buffer index for the next step
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
}

export default Life;
