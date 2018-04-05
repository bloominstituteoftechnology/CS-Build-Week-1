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
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;
    this.buffer = [
      Array2D(width,height),
      Array2D(width,height)
    ];
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for( let y=0; y< this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
   const buffer = this.buffer[this.currentBufferIndex]
   for (let y = 0; y < this.height; y++) {
     for( let x = 0; x < this.width; x++) {
       buffer[y][x] = Math.floor(Math.random()* 2);
     }
   }
  }

//   stop() {
// let backBufferIndex =this.currentBufferIndex === 0? 1:0;
// let currentBuffer = this.buffer[this.currentBufferIndex];
// let backBuffer =  this.buffer[backBufferIndex];

// this.currentBuffer = backBuffer;
//   }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
let backBufferIndex =this.currentBufferIndex === 0? 1:0;
let currentBuffer = this.buffer[this.currentBufferIndex];
let backBuffer =  this.buffer[backBufferIndex];

const findLiveNeighbors = (x, y, options={border: 'nowrap'}) => {
  let liveNeighbors = 0;

  if(options.border ==='wrap') {
    let north = y - 1;
    let south = y + 1;
    let west = x - 1;
    let east = x - 1;

    if ( north < 0) {
      north = this.height - 1;
    }
    if ( south > this.height -1) {
      south = 0;
    }
    if (west > 0){
      west = this.width -1;
    }
    if (east > this.width -1) {
      east = 0;
    }

    liveNeighbors =
    currentBuffer[north][west] +
    currentBuffer[north][x] +
    currentBuffer[north][east] +
    currentBuffer[y][west] +
    currentBuffer[y][east] +
    currentBuffer[south][x] +
    currentBuffer[south][west]+
    currentBuffer[south][east];

  } else if (options.border === 'nowrap') {
    for (let j =-1; j <= 1; j++) {
      let yPos = y + j;
      if (yPos < 0 || yPos >= this.height) {
        continue;
      }
      for (let k= -1; k <= 1; k++) {
        let xPos = x + k;
        if (xPos < 0 || xPos >= this.width) {
          continue;
        }
        if (yPos ===y && xPos === x ) {
          continue;
        }
      
        liveNeighbors += currentBuffer[yPos][xPos];
      }
    }
  } else {
  throw new Error('Unknown border option: ' + options.border);
  }
   return liveNeighbors;
}

// // Any live cell with fewer than two live neighbours dies 
// // Any live cell with more than three live neighbours dies 
// if cells alive 
//   if liveNeighbors < 2 || liveNeighbors > 3
//   cell dies
for (let y = 0; y < this.height;y++) {
  for(let x = 0; x < this.width; x++) {

    let neighbours = (findLiveNeighbors.bind(this))(x,y);
    const thisCell =  currentBuffer[y][x];
    
    if (thisCell === 1) {
      if (neighbours< 2 || neighbours > 3) {
        backBuffer[y][x] = 0;
      } else {
        backBuffer[y][x] = 1;
      }
    } else {
      if ( neighbours === 3) {
      backBuffer[y][x] = 1;
        } else {
          backBuffer[y][x] = 0;
        }
      }
    }
  }
 this.currentBufferIndex = backBufferIndex
}
}



export default Life;
