<<<<<<< HEAD
const Array2D = (width, height) => {
  let arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }
  return arr;
}

class Life {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentCanvas = 1;

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    
    this.clear();
  }
  
  getCells = () => this.buffer[this.currentCanvas];
  
  clear = () => {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++){
        this.buffer[this.currentCanvas][y][x] = 0;
      }
    }
  }
  
  randomize = () => {

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.buffer[this.currentCanvas][y][x] = Math.floor(Math.random()*2);
      }
    }
  }

  findNeighbors = (x, y) => {
    const topBuffer = this.buffer[this.currentCanvas];

    let count = 0;

      // Singele Space Awa All Directions
      let top = y - 1;
      let bottom = y + 1;
      let left = x - 1;
      let right = x + 1;

      //Find Edges
      if (left < 0) left = this.width - 1;       
      if (top < 0) top = this.height - 1;
      if (right === this.width) right = 0;
      if (bottom === this.height) bottom = 0;
      
      //Add Neighbors
      return count =[

                topBuffer[top][x],  
      topBuffer[y][left],topBuffer[y][right],                
              topBuffer[bottom][x], 

              topBuffer[top][left],         
    topBuffer[top][right], topBuffer[bottom][left],      
            topBuffer[bottom][right]

      ].reduce((a,b) => a+b , 0);   
  }

  step = () => {
    const bottomBuffer = this.buffer[!this.currentCanvas ? 1: 0];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {

        const count = this.findNeighbors(x, y);
        const pixel = this.buffer[this.currentCanvas][y][x];

        pixel?
          count < 2 || count > 3 ? bottomBuffer[y][x] = 0 : bottomBuffer[y][x] = 1
        :
          count === 3 ?  bottomBuffer[y][x] = 1 : bottomBuffer[y][x] = 0;
      }
    }    
    this.currentCanvas = !this.currentCanvas ? 1: 0;
=======
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
    // !!!! IMPLEMENT ME !!!!
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
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
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
  }
}

export default Life;