/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;
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
        for (let y = 0; y < this.height; y++) {
            this.buffer[this.currentBufferIndex][y].fill(0);
        }
    }
    /**
     * Randomize the life grid
     */
    randomize() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const rand = Math.floor(Math.random() * MODULO);
                this.buffer[this.currentBufferIndex][y][x] = rand;
            }
        }
    }
    dropBomb() {
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
  
  sterlize() {
    for (let y = 25; y < this.height - 25; y++) {
      for (let x = 25; x < this.width - 25; x++) {
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
      Math.random() * (this.width - randystart) + randystart
    );
    for (let y = randystart; y < randyend; y++) {
      for (let x = randxstart; x < randxend; x++) {
        // const rand = Math.floor(Math.random() * 2);
        this.buffer[this.currentBufferIndex][y][x] = 1;
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
        // See if we have neighbor to infect this one
        function numberOfLivingNeighbors(x, y) {
            const nextValue = 1;
            let counter = 0;
            // North
            if (y > 0) {
                if (currentBuffer[y - 1][x] === nextValue) {
                    counter++;
                }
            }
            //NorthWest
            if (y > 0 && x > 0) {
                if (currentBuffer[y - 1][x - 1] === nextValue) {
                    counter++;
                }
            }
            //NorthEast
            if (y > 0 && x < this.width - 1) {
                if (currentBuffer[y - 1][x + 1] === nextValue) {
                    counter++;
                }
            }
            // South
            if (y < this.height - 1) {
                if (currentBuffer[y + 1][x] === nextValue) {
                    counter++;
                }
            }
            //SouthEast
            if (y < this.height - 1 && x < this.width - 1) {
                if (currentBuffer[y + 1][x + 1] === nextValue) {
                    counter++;
                }
            }
            //SouthWest
            if (y < this.height - 1 && x > 0) {
                if (currentBuffer[y + 1][x - 1] === nextValue) {
                    counter++;
                }
            }
            // West
            if (x > 0) {
                if (currentBuffer[y][x - 1] === nextValue) {
                    counter++;
                }
            }
            // East
            if (x < this.width - 1) {
                if (currentBuffer[y][x + 1] === nextValue) {
                    counter++;
                }
            }
            return counter;
        }
        // Loop through and decide the state of the next generation (alive or dead in Game of Life)
        // for each cell processed
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let count = numberOfLivingNeighbors.call(this, x, y);
                // more than 3 = dead
                if (currentBuffer[y][x] === 0 && count === 3) {
                    backBuffer[y][x] = 1;
                    // fewer than 2 = dead
                } else if (currentBuffer[y][x] === 1 && count < 2) {
                    backBuffer[y][x] = 0;
                    // 2 or 3 = lives on
                } else if (currentBuffer[y][x] === 1 && (count === 2 || count === 3)) {
                    backBuffer[y][x] = 1;
                    // dead cell neighbors = 3 then live on
                } else if (currentBuffer[y][x] === 1 && count > 3) {
                    backBuffer[y][x] = 0;
                } else {
                    backBuffer[y][x] = 0;
                }
            }
        }
        this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
}
export default Life;