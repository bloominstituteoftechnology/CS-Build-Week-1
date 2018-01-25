/**
 * Implemention of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
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
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.currentBuf = 0;
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBuf];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBuf][y].fill(0)
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBuf];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.round((Math.random()))
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let buffer = this.buffer[this.currentBuf];
    let buffer2 = this.buffer[this.currentBuf === 0 ? 1 : 0];

    const allNeighbors =(x, y, alive) => {
      let neighborCount = 0
      let buffer = this.buffer[this.currentBuf];
      for (let xN = x - 1; xN <= x + 1 && xN < this.width; xN++) {
        if (neighborCount > 3) {
          break;
        }
        if (xN < 0) {
          continue;
        }
        for (let yN = y - 1; yN <= y + 1 && yN < this.height; yN++) {
          if ((yN === y && xN === x) || yN < 0) {
            continue;
          }
          let neighbor = buffer[yN][xN]
          if (neighbor === 1) {
            neighborCount++
          }
        }
      }
      if (alive) {
        if (neighborCount >= 2 && neighborCount <= 3) {
          return true
        } else {
          return false
        }
      } else {
        if (neighborCount === 3) {
          return true
        } else {
          return false
        }
      }
    }

    // eslint-disable-next-line
    let neighbors = (x, y, alive) => {
      let neighborCount = 0
      if (y >= 1 && buffer[y - 1][x] === 1) {
        neighborCount++
      } 
      if (y + 1 < this.height && buffer[y + 1][x] === 1) {
        neighborCount++
      }
      if (x >= 1 && buffer[y][x - 1] === 1) {
        neighborCount++
      }
      if (x + 1 < this.width && buffer[y][x + 1] === 1) {
        neighborCount++
      }

      if (alive) {
        if (neighborCount >= 2 && neighborCount <= 3) {
          return true
        } else {
          return false
        }
      } else {
        if (neighborCount === 3) {
          return true
        } else {
          return false
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let cell = buffer[y][x];
        let alive = cell === 1 ? true : false;
        alive = allNeighbors(x, y, alive)
        buffer2[y][x] = alive ? 1 : 0
      }
    }


    this.currentBuf = this.currentBuf === 0 ? 1 : 0
  }
}

export default Life;