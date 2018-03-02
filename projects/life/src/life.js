/**
 * Implementation of Conway's game of Life
 */

// create a two dimensional array to hold our game grid
function Array2D(width, height) {
  let a = new Array(height);
  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }
  return a;
}

class Life {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    // initialize the buffer index to 0, for switching which buffer is displaying later
    this.currentBufferIndex = 0;
    // initialize two buffers, currentBuffer (on screen) & backBuffer (off screen)
    this.buffer = [Array2D(width, height), Array2D(width, height)];
    // make all cells black
    this.clear();
  }

  // return the arrays
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }

  // clear entire window
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  // randomly assign life to cells
  randomize() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  // wipe out everything except a 25 pixel border
  sterilization() {
    for (let y = 25; y < this.height - 25; y++) {
      for (let x = 25; x < this.width - 25; x++) {
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  assimilation() {
    // choose random y & x coordinates for start positions
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    // choose random y & x coordinates for end positions
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randystart) + randystart
    );
    // loop through the pixels between start and stop values
    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        // const rand = Math.floor(Math.random() * 2);
        // set these cells to alive
        this.buffer[this.currentBufferIndex][y][x] = 1;
      }
    }
  }

  // creates random life
  dropPopulationBomb() {
    // start positions
    const randystart = Math.floor(Math.random() * this.height);
    const randxstart = Math.floor(Math.random() * this.width);
    // end positions
    const randyend = Math.floor(
      Math.random() * (this.height - randystart) + randystart
    );
    const randxend = Math.floor(
      Math.random() * (this.width - randystart) + randystart
    );
    // loop from start to stop positions
    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        // select a random value 1 or 2
        const rand = Math.floor(Math.random() * 2);
        // and assign it to these cells
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // initialize backBufferIndex to 0, and toggle back and forth between the two
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    // initialize current buffer to this.buffer of the current index
    let currentBuffer = this.buffer[this.currentBufferIndex];
    // initialize the back buffer to this.buffer of the back buffer index, which will always be in opposition to the current buffer
    let backBuffer = this.buffer[backBufferIndex];

    // function to check for living neighbors
    const hasLivingNeighbor = (x, y, options = { wrap: false }) => {
      let LNCounter = 0;

      // option to wrap
      if (!options.wrap) {
        // confine your looping to the size of the canvas
        if (y > 0 && y < this.height - 1 && x > 0 && x < this.width - 1) {
          // North neighbor of cell x, y
          if (currentBuffer[y - 1][x] === 1) LNCounter++;

          // northeast
          if (currentBuffer[y - 1][x + 1] === 1) LNCounter++;

          // East
          if (currentBuffer[y][x + 1] === 1) LNCounter++;

          // southeast
          if (currentBuffer[y + 1][x + 1] === 1) LNCounter++;

          // South
          if (currentBuffer[y + 1][x] === 1) LNCounter++;

          //southwest
          if (currentBuffer[y + 1][x - 1] === 1) LNCounter++;

          // West
          if (currentBuffer[y][x - 1] === 1) LNCounter++;

          // northwest
          if (currentBuffer[y - 1][x - 1] === 1) LNCounter++;
        }
      } else if (options.wrap) {
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
        throw new Error('unknown border option' + options.border);
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
// give me life!
export default Life;
