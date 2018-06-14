/**
 * Implementation of Conway's game of Life
 */
const probability = 45; // a % represented by any number from 0 to 100.

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
    // console.log(this.cells[0][299][200], 'constructor');
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
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        // if (this.cells[this.activeBuffer][h][w] === undefined)
        //   console.log(h, w, this.cells[this.activeBuffer][h][w]);
        this.cells[this.activeBuffer][h][w] =
          Math.random() * 100 <= probability;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    const currentCells = this.cells[this.activeBuffer];
    const nextCells = this.cells[this.activeBuffer === 1 ? 0 : 1];

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        const count = this.getLiveNeighborCount.call(this, h, w);

        if (currentCells[h][w]) {
          if (count < 2 || count > 3) {
            nextCells[h][w] = false;
          } else {
            nextCells[h][w] = true;
          }
        } else {
          if (count === 3) {
            nextCells[h][w] = true;
          } else {
            nextCells[h][w] = false;
          }
        }
      }
    }
    this.activeBuffer = this.activeBuffer === 1 ? 0 : 1;
  }
  // 1. Any live cell with fewer than two live neighbors dies, as if by under population.

  getLiveNeighborCount(h, w) {
    const currentCells = this.cells[this.activeBuffer];
    let c = 0;

    if (currentCells[h - 1] && currentCells[h - 1][w - 1]) ++c;
    if (currentCells[h - 1] && currentCells[h - 1][w - 0]) ++c;
    if (currentCells[h - 1] && currentCells[h - 1][w + 1]) ++c;

    if (currentCells[h - 0] && currentCells[h + 0][w - 1]) ++c;
    if (currentCells[h - 0] && currentCells[h + 0][w + 1]) ++c;

    if (currentCells[h + 1] && currentCells[h + 1][w - 1]) ++c;
    if (currentCells[h + 1] && currentCells[h + 1][w - 0]) ++c;
    if (currentCells[h + 1] && currentCells[h + 1][w + 1]) ++c;

    return c;
  }
}

export default Life;
