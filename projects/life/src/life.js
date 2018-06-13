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
    this.height = height;
    this.width = width;
    this.active = false;
    this.activeBuffer = 0;
    this.cells = [Array2D(height, width), Array2D(height, width)];
    console.log(this.cells[0][299][200], 'constructor');
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.activeBuffer];
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
    console.log(this.height, 'this.height');
    console.log(this.width, 'this.width');
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        // if (this.cells[this.activeBuffer][h][w] === undefined)
        //   console.log(h, w, this.cells[this.activeBuffer][h][w]);
        this.cells[this.activeBuffer][h][w] = Math.round(Math.random()) === 1;
      }
    }
    console.log(this.cells);
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
  }
}

export default Life;
