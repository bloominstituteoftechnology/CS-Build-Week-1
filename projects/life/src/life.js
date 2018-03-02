/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
 * CCA class
 */
class CCA {
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

  Sterilization() {
    for (let y = 10; y < this.height - 10; y++) {
      for (let x = 10; x < this.width - 10; x++) {
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  Assimilation() {
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randxstart) + randxstart
    );

    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  pulsar(x, y) {
    // console.log(x, y);
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);

    const y2 = y + 10;
    const x2 = x + 10;
    for (y; y < y2; y++) {
      for (x; x < x2; x++) {
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
    // for (let y = 25; y < this.height - 25; y++) {
    //   for (let x = 25; x < this.width - 25; x++) {
    //     this.buffer[this.currentBufferIndex][y][x] = 1;
    //   }
    // }
  }

  draw(x, y) {
    // console.log(x, y);
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);

    const y2 = y + 3;
    const x2 = x + 3;
    for (y; y < y2; y++) {
      for (x; x < x2; x++) {
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
    // for (let y = 25; y < this.height - 25; y++) {
    //   for (let x = 25; x < this.width - 25; x++) {
    //     this.buffer[this.currentBufferIndex][y][x] = 1;
    //   }
    // }
  }

  phaseBlaster(x, y) {
    // console.log(x, y);
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);
    const y2 = y + 1;
    const x2 = x + 1;

    for (y; y < y2; y++) {
      for (let z = 0; z < this.width; z++) {
        this.buffer[this.currentBufferIndex][y][z] = 1;
      }
    }

    for (x; x < x2; x++) {
      for (let z = 0; z < this.height; z++) {
        this.buffer[this.currentBufferIndex][z][x] = 1;
      }
    }
  }

  railGun(a, b) {
    // a = Math.floor(Math.pow(a, 0.5));
    // b = Math.floor(Math.pow(b, 0.5));
    a = Math.floor(a / 2);
    b = Math.floor(b / 2);

    let gun = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    for (let y = 0; y < gun.length; y++) {
      for (let x = 0; x < gun[y].length; x++) {
        this.buffer[this.currentBufferIndex][b + y][a + x] = gun[y][x];
      }
    }
  }

  glider(a, b) {
    a = Math.floor(a / 2);
    b = Math.floor(b / 2);

    let glider = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    for (let y = 0; y < glider.length; y++) {
      for (let x = 0; x < glider[y].length; x++) {
        this.buffer[this.currentBufferIndex][b + y][a + x] = glider[y][x];
      }
    }
  }

  switchEngine(a, b) {
    a = Math.floor(a / 2);
    b = Math.floor(b / 2);

    let engine = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    for (let y = 0; y < engine.length; y++) {
      for (let x = 0; x < engine[y].length; x++) {
        this.buffer[this.currentBufferIndex][b + y][a + x] = engine[y][x];
      }
    }
  }

  dropPopulationBomb() {
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randystart) + randystart
    );

    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // console.log(this.currentBufferIndex);
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid of the current active buffer
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid (values 0-7)
   */
  randomize() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  // step() {
  //   let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  //   let currentBuffer = this.buffer[this.currentBufferIndex];
  //   let backBuffer = this.buffer[backBufferIndex];

  //   function checkNeighbours(x, y) {
  //     // console.log(status);
  //     let NLN = 0;

  //     if (x > 0 && y > 0 && x < this.width - 1 && y < this.height - 1) {
  //       // northeast [y-1][x-1]
  //       if (currentBuffer[y - 1][x - 1] === 1) NLN++;
  //       // north [y-1]
  //       if (currentBuffer[y - 1][x] === 1) NLN++;
  //       // northwest [y-1][x+1]
  //       if (currentBuffer[y - 1][x + 1] === 1) NLN++;
  //       // west [x+1]
  //       if (currentBuffer[y][x + 1] === 1) NLN++;
  //       // southwest [y+1][x+1]
  //       if (currentBuffer[y + 1][x + 1] === 1) NLN++;
  //       // south [y+1]
  //       if (currentBuffer[y + 1][x] === 1) NLN++;
  //       // southeast [y+1][x-1]
  //       if (currentBuffer[y + 1][x - 1] === 1) NLN++;
  //       // east [x-1]
  //       if (currentBuffer[y][x - 1] === 1) NLN++;
  //     }

  //     return NLN;
  //   }

  //   for (let y = 0; y < this.height; y++) {
  //     for (let x = 0; x < this.width; x++) {
  //       let neighborCount = checkNeighbours.call(this, x, y);

  //       if (currentBuffer[y][x] === 1) {
  //         if (neighborCount === 2 || neighborCount === 3) {
  //           backBuffer[y][x] = 1;
  //         } else {
  //           backBuffer[y][x] = 0;
  //         }
  //       }

  //       if (currentBuffer[y][x] === 0) {
  //         if (neighborCount === 3) {
  //           backBuffer[y][x] = 1;
  //         } else {
  //           backBuffer[y][x] = 0;
  //         }
  //       }
  //     }
  //   }
  //   this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  // }

  step() {
    // initialize backBufferIndex to 0, and toggle back and forth between the two
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    // initialize current buffer to this.buffer of the current index
    let currentBuffer = this.buffer[this.currentBufferIndex];
    // initialize the back buffer to this.buffer of the back buffer index, which will always be in opposition to the current buffer
    let backBuffer = this.buffer[backBufferIndex];

    // function to check for living neighbors
    const hasLivingNeighbor = (x, y, options = { wrap: false }) => {
      let LNCounter = 0,
        zCounter = 0,
        zMod = 2;

      // option to wrap
      if (!options.wrap) {
        // confine your looping to the size of the canvas
        // if (y > 0 && y < this.height - 1 && x > 0 && x < this.width - 1) {
        //   // North neighbor of cell x, y
        //   if (currentBuffer[y - 1][x] % zMod === 1) {
        //     LNCounter++;
        //     if (currentBuffer[y - 1][x] === 3) zCounter++;
        //   }

        //   // northeast
        //   if (currentBuffer[y - 1][x + 1] === 1) LNCounter++;

        //   // East
        //   if (currentBuffer[y][x + 1] === 1) LNCounter++;

        //   // southeast
        //   if (currentBuffer[y + 1][x + 1] === 1) LNCounter++;

        //   // South
        //   if (currentBuffer[y + 1][x] === 1) LNCounter++;

        //   //southwest
        //   if (currentBuffer[y + 1][x - 1] === 1) LNCounter++;

        //   // West
        //   if (currentBuffer[y][x - 1] === 1) LNCounter++;

        //   // northwest
        //   if (currentBuffer[y - 1][x - 1] === 1) LNCounter++;
        // }
        // } else if (options.wrap) {
        let north = y - 1;
        let east = x + 1;
        let south = y + 1;
        let west = x - 1;

        // check to see if we need to wrap
        if (north < 0) north = this.height - 1;
        if (east >= this.width) east = 0;
        if (south >= this.height) south = 0;
        if (west < 0) west = this.width - 1;

        LNCounter =
          currentBuffer[north][x] +
          currentBuffer[north][east] +
          currentBuffer[y][east] +
          currentBuffer[south][east] +
          currentBuffer[south][x] +
          currentBuffer[south][west] +
          currentBuffer[y][west] +
          currentBuffer[north][west];
      } else {
        throw new Error('unknown border option' + options.wrap);
      }

      // return count of our neighbors is alive for use in the RULES!
      return LNCounter;
    };

    // loop through and decide on the state of the next generation for each cell processed
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // grab the neighborCounter
        let neighborCounter = hasLivingNeighbor(x, y);
        // grab the currently displayed cell (less typing)
        let currentCell = currentBuffer[y][x];

        // if this cell is currently alive
        if (currentCell === 1) {
          // if the live neighbors are <2 or >3
          if (neighborCounter < 2 || neighborCounter > 3) {
            // this cell dies in the next buffer
            backBuffer[y][x] = 0;
          }
          // if the live neighbors equal 2 or 3
          if (neighborCounter === 2 || neighborCounter === 3) {
            // this cell lives in the next buffer
            backBuffer[y][x] = 1;
          }
        }
        // if this cell is currently dead
        if (currentCell === 0) {
          // if live neighbors is exactly 3
          if (neighborCounter === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }
    // switch the currentBufferIndex
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;
