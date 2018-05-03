/**
 * Implementation of Conway's game of Life
 */

const ALIVE = 1;
const DEAD = 0;

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
    this.width = width;
    this.height = height;

    this.i = 0;

    this.buffer = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height),
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.i];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.i][row].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize(prob) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.buffer[this.i][row][col] = Math.random() < prob ? ALIVE : DEAD;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const bI = this.i === 0 ? 1 : 0;
    const bB = this.buffer[bI];
    const cB = this.buffer[this.i];

    const nextCondition = (r, c) => {
      const status = cB[r][c];
      let neighbors = 0;

      for (let x = r - 1; x <= r + 1; x++) {
        if (x < 0 || x > this.height - 1) {
          continue;
        }
        for (let y = c - 1; y <= c + 1; y++) {
          if (y < 0 || y > this.width - 1) {
            continue;
          }

          if (cB[x][y] === ALIVE && `${x}${y}` !== `${r}${c}`) neighbors++;
        }
      }

      // /* north */
      // if (r > 0 && cB[r - 1][c] === ALIVE) neighbors++;

      // /* northeast */
      // if (r > 0 && c < this.width - 1 && cB[r - 1][c + 1] === ALIVE)
      //   neighbors++;

      // /* east */
      // if (c < this.width - 1 && cB[r][c + 1] === ALIVE) neighbors++;

      // /* southeast */
      // if (
      //   c < this.width - 1 &&
      //   r < this.height - 1 &&
      //   cB[r + 1][c + 1] === ALIVE
      // )
      //   neighbors++;

      // /* south */
      // if (r < this.height - 1 && cB[r + 1][c] === ALIVE) neighbors++;

      // /* southwest */
      // if (r < this.height - 1 && c > 0 && cB[r + 1][c - 1] === ALIVE)
      //   neighbors++;

      // /* west */
      // if (c > 0 && cB[r][c - 1] === ALIVE) neighbors++;

      // /* PNW */
      // if (c > 0 && r > 0 && cB[r - 1][c - 1] === ALIVE) neighbors++;

      /* currently alive */
      if (status === ALIVE) {
        if (neighbors === 2 || neighbors === 3) return ALIVE;

        return DEAD;
      }

      /* currently dead */
      if (neighbors === 3) return ALIVE;

      return DEAD;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        bB[row][col] = nextCondition(row, col);
      }
    }

    this.i = this.i === 0 ? 1 : 0;
  }
}

export default Life;
