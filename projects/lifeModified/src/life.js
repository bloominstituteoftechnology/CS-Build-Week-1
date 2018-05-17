/**
 * Implemention of a Conway's Game of Life
 */
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

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]

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
  clear() {
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    let buffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        let randomNum = Math.floor(Math.random() * 2);
        if (randomNum) randomNum = Math.ceil(Math.random() * 3);
        buffer[row][col] = randomNum;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const otherBufferIndex = 1 - this.currentBufferIndex;
    const currentBuffer = this.cells[this.currentBufferIndex];
    const otherBuffer = this.cells[otherBufferIndex];
    console.log('currentBuffer is', currentBuffer);
    // implement rules
    const rowsToBeChecked = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let neighbors = {
          red: 0,
          green: 0,
          blue: 0
        };
        // let alive = 0;
        for (let i = 0; i < rowsToBeChecked.length; i++) {
          const offset = rowsToBeChecked[i];
          const offsetRow = row + offset[0];
          const offsetCol = col + offset[1];
          if (offsetRow < 0 || offsetCol < 0 || offsetRow >= this.height || offsetCol >= this.width) continue;
          switch (currentBuffer[offsetRow][offsetCol]){
            case 0: 
                  break;
            case 1: 
                  neighbors.red++;
                  break;
            case 2: 
                  neighbors.green++;
                  break;
            case 3:
                  neighbors.blue++;
                  break;
            default:
                  console.log("error, invalid number");
                  break;
          }
        }
        const totalNeighbors = Object.values(neighbors).reduce((t, n) => t + n);

        let dominantColor = currentBuffer[row][col];
        if(neighbors.red > neighbors.blue && neighbors.red > neighbors.green){
          dominantColor = 1;
        }
        if(neighbors.green > neighbors.red && neighbors.green > neighbors.blue){
          dominantColor = 2;
        }
        if(neighbors.blue > neighbors.red && neighbors.blue > neighbors.green){
          dominantColor = 3;
        }
        
        // If living
        if (currentBuffer[row][col]){
          // do alive rules
          if(totalNeighbors < 2 || totalNeighbors > 3){
            otherBuffer[row][col] = 0;
          } else {
            otherBuffer[row][col] = dominantColor;
          }
        } else {
          // do dead rules
          if(totalNeighbors === 3){
            otherBuffer[row][col] = dominantColor;
          } else {
            otherBuffer[row][col] = currentBuffer[row][col];
          }
        }
      }
    }
    this.currentBufferIndex = otherBufferIndex;
  }
}

export default Life;