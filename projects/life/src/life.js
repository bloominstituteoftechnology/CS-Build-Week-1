/**
 * Implementation of Conway's game of Life
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
    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.currentBufferIndex];
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
    let currentBuffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        currentBuffer[row][col] = Math.floor(Math.random() * 4);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];
    let height = this.height;
    let width = this.width;

    // function neighbors(row, col){
    //   let count = 0;

    //   //northwest
    //   if(col > 0 && row > 0){
    //     if(currentBuffer[row - 1][col - 1] === 1){
    //       count++;
    //     }
    //   }
    //   //northeast
    //   if(col < width - 1 && row > 0){
    //     if(currentBuffer[row -1 ][col + 1] === 1){
    //       count++;
    //     }
    //   }
    //   //southwest
    //   if(col > 0 && row < height -1){
    //     if(currentBuffer[row + 1][col - 1] === 1){
    //       count++;
    //     }
    //   }
    //   //southeast
    //   if(col < width - 1 && row < height -1){
    //     if(currentBuffer[row + 1][col + 1] === 1){
    //       count++;
    //     }
    //   }

    //   //west
    //   if(col > 0){
    //     if(currentBuffer[row][col-1] === 1){
    //       count++;
    //     }
    //   }
     
    //   //east
    //   if(col < width - 1){
    //     if(currentBuffer[row][col+1] === 1){
    //       count++;
    //     }
    //   }

    //   //north
    //   if(row > 0){
    //     if(currentBuffer[row - 1][col] === 1){
    //       count++;
    //     }
    //   }

    //   //south
    //   if(row < height - 1){
    //     if(currentBuffer[row + 1][col] === 1){
    //       count++;
    //     }
    //   }

    //   return count;
    // }

    

    function colorNeighbors(row, col){
      let colorCount = {
        red: 0,
        green: 0,
        blue: 0,
      };

      function addColor(num){
        switch (num){
          case 0: 
            // nothing
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
          default:
            console.log("error, invalid number");
            break;
        }
      }

      // west
      if(col > 0){
        addColor(currentBuffer[row][col - 1]);
      }
      // northwest
      if(col > 0 && row > 0){
        addColor(currentBuffer[row - 1][col - 1]);
      }
      // northeast
      if(col < width - 1 && row > 0){
        addColor(currentBuffer[row -1 ][col + 1]);
      }
      // southwest
      if(col > 0 && row < height -1){
        addColor(currentBuffer[row + 1][col - 1]);
      }
      // southeast
      if(col < width - 1 && row < height -1){
        addColor(currentBuffer[row + 1][col + 1]);
      }
      // east
      if(col < width - 1){
        addColor(currentBuffer[row][col+1]);
      }
      // north
      if(row > 0){
        addColor(currentBuffer[row - 1][col]);
      }
      // south
      if(row < height - 1){
        addColor(currentBuffer[row + 1][col]);
      }
      return colorCount;
    }

    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {

        const neighbors = colorNeighbors.call(this, row, col);
        const totalNeighbors = neighbors.red + neighbors.green + neighbors.blue;

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

        // alive WAR
        if (currentBuffer[row][col]){
          //console.log('found alive cell');
          // do alive rules
          //console.log(totalNeighbors);
          if(totalNeighbors < 2 || totalNeighbors > 3){
            //console.log('and killed it');
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = dominantColor;
          }
        } else {
          // dead WAR
          if(totalNeighbors === 3){
            backBuffer[row][col] = dominantColor;
          } else {
            backBuffer[row][col] = currentBuffer[row][col];
          }
        }

        // alive
        // CONWAYS LIFE
        // if(currentBuffer[row][col] === 1){
        //   const count = neighbors(row, col);
        //   if(count === 2 || count === 3){
        //     backBuffer[row][col] = 1;
        //   }else{
        //     backBuffer[row][col] = 0;
        //   }
        // }

        // dead
        // CONWAYS LIFE
        // if(currentBuffer[row][col] === 0){
        //   const count = neighbors(row, col);
        //   if(count === 3){
        //     backBuffer[row][col] = 1;
        //   }else{
        //     backBuffer[row][col] = 0;
        //   }
        // }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
