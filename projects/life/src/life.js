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
    // console.log('start step');
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        // this.flag = false;
        // if (h === 1 && w === 1) {
        //   console.log('count: ', this.getLiveNeighborCount.call(this, h, w));

        //   this.flag = true;
        // }
        const count = this.getLiveNeighborCount.call(this, h, w);
        // console.log(
        //   'count: ',
        //   count,
        //   'h: ',
        //   h,
        //   'w: ',
        //   w,
        //   'value: ',
        //   currentCells[h][w]
        // );
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
    // console.log(0, 0, this.cells[this.activeBuffer][0][0]);
    // console.log(0, 1, this.cells[this.activeBuffer][0][1]);
    // console.log(0, 2, this.cells[this.activeBuffer][0][2]);
    // console.log(1, 0, this.cells[this.activeBuffer][1][0]);
    // console.log(1, 1, this.cells[this.activeBuffer][1][1]);
    // console.log(1, 2, this.cells[this.activeBuffer][1][2]);
    // console.log(2, 0, this.cells[this.activeBuffer][2][0]);
    // console.log(2, 1, this.cells[this.activeBuffer][2][1]);
    // console.log(2, 2, this.cells[this.activeBuffer][2][2]);
    // console.log('end step');
    this.activeBuffer = this.activeBuffer === 1 ? 0 : 1;
  }
  // 1. Any live cell with fewer than two live neighbors dies, as if by under population.

  getLiveNeighborCount(h, w) {
    const currentCells = this.cells[this.activeBuffer];
    let c = 0;

    if (h - 1 >= 0) {
      if (currentCells[h - 1][w - 1]) {
        if (this.flag) console.log(1, h - 1, w - 1);
        ++c;
      }
      if (currentCells[h - 1][w - 0]) {
        if (this.flag) console.log(2, h - 1, w);
        ++c;
      }
      if (currentCells[h - 1][w + 1]) {
        if (this.flag) console.log(3, h - 1, w + 1);
        ++c;
      }
    }

    if (currentCells[h][w - 1]) {
      if (this.flag) console.log(4, h, w - 1);
      ++c;
    }
    if (currentCells[h][w + 1]) {
      if (this.flag) console.log(6, h, w + 1);
      ++c;
    }

    if (h + 1 < this.height) {
      if (currentCells[h + 1][w - 1]) {
        if (this.flag) console.log(7, h + 1, w - 1);
        ++c;
      }
      if (currentCells[h + 1][w - 0]) {
        if (this.flag) console.log(8, h + 1, w);
        ++c;
      }
      if (currentCells[h + 1][w + 1]) {
        if (this.flag) console.log(9, h + 1, w + 1);
        ++c;
      }
    }

    return c;
  }
}

export default Life;
