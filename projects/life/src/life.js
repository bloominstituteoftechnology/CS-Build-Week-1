/**
 * Implementation of Conway's game of Life
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
    this.currentBufferIndex = 0;
    this.buffer = [Array2D(width, height), Array2D(width, height)];
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
    for (let i = 0; i < this.height; i++) {
      this.buffer[this.currentBufferIndex][i].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.buffer[this.currentBufferIndex][i][j] = Math.round(Math.random());
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // const getCell = (x, y) => {
    //   if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
    //     return false;
    //   }
    //   return currentBuffer[y][x];
    // };

    const countInfectiousNeighbor = (x, y, options = { border: 'wrap' }) => {
      let count = 0;
      if (options.border === 'wrap') {
        let north = y - 1;
        let south = y + 1;
        let west = x - 1;
        let east = x + 1;
        if (north < 0) {
          north = this.height - 1;
        }
        if (south > this.height - 1) {
          south = 0;
        }
        if (west < 0) {
          west = this.width - 1;
        }
        if (east > this.width - 1) {
          east = 0;
        }

        count =
          currentBuffer[north][west] +
          currentBuffer[north][x] +
          currentBuffer[north][east] +
          currentBuffer[y][east] +
          currentBuffer[y][west] +
          currentBuffer[south][x] +
          currentBuffer[south][east] +
          currentBuffer[south][west];
      } else if (options.border === 'wrap') {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          let yPos = y + yOffset;
          if (yPos < 0 || yPos >= this.height) {
            continue;
          }

          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            let xPos = x + xOffset;
            if (xPos < 0 || xPos >= this.width) {
              continue;
            }
            if (yPos === y && xPos === x) {
              continue;
            }

            count += currentBuffer[yPos][xPos];
          }
        }
        // if (getCell(x - 1, y - 1)) {
        //   count++;
        // }
        // if (getCell(x, y - 1)) {
        //   count++;
        // }
        // if (getCell(x + 1, y - 1)) {
        //   count++;
        // }
        // if (getCell(x + 1, y)) {
        //   count++;
        // }
        // if (getCell(x + 1, y + 1)) {
        //   count++;
        // }
        // if (getCell(x, y + 1)) {
        //   count++;
        // }
        // if (getCell(x - 1, y + 1)) {
        //   count++;
        // }
        // if (getCell(x - 1, y)) {
        //   count++;
        // }
      } else {
        throw new Error('Unknown border option: ' + options.border);
      }
      return count;
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (currentBuffer[y][x]) {
          if (countInfectiousNeighbor(x, y) < 2) {
            backBuffer[y][x] = 0;
          } else if (
            countInfectiousNeighbor(x, y) > 1 &&
            countInfectiousNeighbor(x, y) < 4
          ) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        } else if (!currentBuffer[y][x]) {
          if (countInfectiousNeighbor(x, y) === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }

    this.currentBufferIndex = backBufferIndex;
  }

  dropGlider(x, y) {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const getCell = (x, y) => {
      if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
        return null;
      }
      return currentBuffer[y][x];
    };

    if (
      getCell(x, y - 1) === 0 &&
      getCell(x + 1, y) === 0 &&
      getCell(x + 1, y + 1) === 0 &&
      getCell(x, y + 1) === 0 &&
      getCell(x - 1, y + 1) === 0
    ) {
      backBuffer[y - 1][x] = 1;
      backBuffer[y][x + 1] = 1;
      backBuffer[y + 1][x + 1] = 1;
      backBuffer[y + 1][x] = 1;
      backBuffer[y + 1][x - 1] = 1;
      this.currentBufferIndex = backBufferIndex;
    }
  }
}

export default Life;
