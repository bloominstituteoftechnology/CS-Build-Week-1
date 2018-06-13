/**
 * Implemention of a CCA
 */

const MODULO = 4;

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
 * CCA class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.randomize();

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    let bufferPointer = this.cells[this.currentBufferIndex];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if ((row * col) % 125 === 0) {
          bufferPointer[row][col] = Math.floor(Math.random() * MODULO) + 1;
        } else {
          bufferPointer[row][col] = 0;
        }
      }
    }

    // for (let row = 0; row < this.height; row++) {
    //   for (let col = 0; col < this.width; col++) {
    //     if ((row * col) % 50 === 0 && Math.cos(row * col) > .2) {
    //       bufferPointer[row][col] = Math.floor(Math.random() * MODULO) + 1;
    //     } else {
    //       bufferPointer[row][col] = 0;
    //     }
    //   }
    // }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];

    const countNeighbors = (row, col) => {
      let colorCount = {
        red: 0,
        green: 0,
        blue: 0,
        black: 0,
        background: 0,
      };

      // After fixing ^^, add another color

      const testForMurder = (val) => {
        switch (val) {
          case 0:
            break;
          case 1:
            colorCount.red++;
            break;
          case 2:
            colorCount.green++;
            break;
          case 3:
            colorCount.blue++;
            break;
          case 4:
            colorCount.black++;
            break;
          default:
            console.log('error, invalid number');
            break;
        }
      };

      // West
      if (col > 0) {
        testForMurder(currentBuffer[row][col - 1]);
      }

      // Northwest
      if (col > 0 && row > 0) {
        testForMurder(currentBuffer[row - 1][col - 1]);
      }

      // North
      if (row > 0) {
        testForMurder(currentBuffer[row - 1][col]);
      }

      // Northeast
      if (col < this.width - 1 && row > 0) {
        testForMurder(currentBuffer[row - 1][col + 1]);
      }

      // East
      if (col < this.width - 1) {
        testForMurder(currentBuffer[row][col + 1]);
      }

      // Southeast
      if (col < this.width - 1 && row < this.height - 1) {
        testForMurder(currentBuffer[row + 1][col + 1]);
      }

      // South
      if (row < this.height - 1) {
        testForMurder(currentBuffer[row + 1][col]);
      }

      // Southwest
      if (col > 0 && row < this.height - 1) {
        testForMurder(currentBuffer[row + 1][col - 1]);
      }

      return colorCount;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const neighbors = countNeighbors(row, col);
        const totalNeighbors =
          neighbors.red + neighbors.green + neighbors.blue + neighbors.black;

        const lookUp = {
          0: 'background',
          1: 'red',
          2: 'green',
          3: 'blue',
          4: 'black',
          background: 0,
          red: 1,
          green: 2,
          blue: 3,
          black: 4,
        };

        let dominantColor = currentBuffer[row][col];
        let largest = lookUp[currentBuffer[row][col]];
        for (let key in neighbors) {
          if (neighbors[key] > neighbors[largest]) largest = key;
        }
        dominantColor = lookUp[largest];

        // "Elements of War"
        // Each cell is red, green, blue, or dead.
        // All Game of Life rules still apply.
        // When counting neighbors, also keep tally of how many neighbors of each color are present.
        // If at least ONE neighbor of a cell is the color that "beats" it, kill the cell. Red>Green>Blue>Red.
        // Every step, update each cell to be the same color as the most common color amongst its neighbors.
        // If tie, stay same color

        // If living
        if (currentBuffer[row][col]) {
          // do alive rules
          if (totalNeighbors < 2 || totalNeighbors > 3) {
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = dominantColor;
          }
        } else {
          // do dead rules
          if (totalNeighbors === 3) {
            backBuffer[row][col] = dominantColor;
          } else {
            backBuffer[row][col] = currentBuffer[row][col];
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
