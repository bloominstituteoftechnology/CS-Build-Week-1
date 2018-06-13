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
    // TODO: !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    // this.randomize();
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * TODO: This should NOT be modified by the caller
   */
  getCells() {
    // TODO: !!!! IMPLEMENT ME !!!!
    return this.cells; 
  }

  /**
   * Clear the life grid
   */
  clear() {
    // TODO: !!!! IMPLEMENT ME !!!!
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // TODO: !!!! IMPLEMENT ME !!!!
    // for(let height = 0; height < this.height; height++){
    //   for(let width = 0; width < this.width; width++){
    //     this.cells[height][width] = (Math.random() * MODULO | 0)
    //   }
    // }

  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // TODO: !!!! IMPLEMENT ME !!!!
  }
}

export default Life;
