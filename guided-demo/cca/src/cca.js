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
    return this.buffer[this.currentBuf]
  }

  /**
   * Clear the cca grid
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBuf][y].fill(0)
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    let buffer = this.buffer[this.currentBuf];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let value = Math.floor((Math.random() * 8))
        buffer[y][x] = value
      }
    }
    console.log('Randomizing cells...')
  }

  getNeighbors(x, y, cell) {
    let neighbors = false
    let buffer = this.buffer[this.currentBuf];
    for (let xN = x - 1; xN <= x + 1 && xN < this.width; xN++) {
      if (neighbors === true) {
        break
      }
      if (xN < 0) {
        continue;
      }
      for (let yN = y - 1; yN <= y + 1 && yN < this.height; yN++) {
        if ((yN === y && xN === x) || yN < 0) {
          continue;
        }
        let neighbor = buffer[yN][xN]
        if (cell === neighbor) {
          neighbors = true
          break;
        }
      }
    }
    return neighbors
  }

  /**
   * Run the simulation for a single step
   */
  step(corners = false) { // corners boolean determines if corners are accepted
    let neighbors = (x, y, value) => {
      if (y >= 1 && buffer[y - 1][x] === value) {
        return true;
      } 
      // if (y + 1 < this.height && buffer[y + 1][x] === value) {
      //   return true;
      // }
      if (x >= 1 && buffer[y][x - 1] === value) {
        return true;
      }
      if (x + 1 < this.width && buffer[y][x + 1] === value) {
        return true;
      }
      return false
    }

    let buffer = this.buffer[this.currentBuf];
    let buffer2 = this.buffer[(this.currentBuf === 0 ? 1 : 0)];

    for (let y = 0; y < buffer.length; y++) {
      for (let x = 0; x < buffer[y].length; x++) { 
        let value = buffer[y][x]
        let compare = (value + 1) % MODULO
        
        if (!corners) {
          if (neighbors.call(this, x, y, compare)) {
            value = compare
          }
        } else {
          if (this.getNeighbors(x, y, compare)) {
            value = compare
          }
        }
        buffer2[y][x] = value;
      }
    }
    this.currentBuf = (this.currentBuf === 0 ? 1 : 0)
  }
}

export default CCA;