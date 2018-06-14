// /**
//  * Implementation of Conway's game of Life
//  */

//  const MODULO = 2;

// /**
//  * Make a 2D array helper function
//  */
// function Array2D(width, height) {
//   //NOTE:  Iterate through Array2D row first then column
//   let a = new Array(height);

//   for (let i = 0; i < height; i++) {
//     a[i] = new Array(width);
//   }

//   return a;
// }

// /**
//  * Life class
//  */
// class Life {

//   /**
//    * Constructor
//    */
//   constructor(width, height) {
//     // TODO: !!!! IMPLEMENT ME !!!!
//     this.width = width;
//     this.height = height;

//     this.cells = [
//       Array2D(width, height),
//       Array2D(width, height)
//     ];

//     this.genBuff = 0;

//     // this.randomize();
//     this.clear();
//   }
  
//   /**
//    * Return the current active buffer
//    * 
//    * TODO: This should NOT be modified by the caller
//    */
//   getCells() {
//     // TODO: !!!! IMPLEMENT ME !!!!
//     return this.cells[this.genBuff]; 
//   }

//   /**
//    * Clear the life grid
//    */
//   clear() {
//     // TODO: !!!! IMPLEMENT ME !!!!
//   }
  
//   /**
//    * Randomize the life grid
//    */
//   randomize() {
//     // TODO: !!!! IMPLEMENT ME !!!!
//     for(let height = 0; height < this.height; height++){
//       for(let width = 0; width < this.width; width++){
//         this.cells[this.gen][height][width] = (Math.random() * MODULO | 0)
//       }
//     }

//   }

//   /**
//    * Run the simulation for a single step
//    */
//   step() {
//     // TODO: !!!! IMPLEMENT ME !!!!
//     let currentGen = this.cells[this.genBuff];
//     let pastGen = this.cells[this.genBuff === 0? 1 : 0];

//     function countLives(height, width){
//       // const nextGen = (currentGen[height][width] + 1) % MODULO;
//       let genCount = 0;

//       // Treat cells off grid as dead
//       for (let rowOffset = -1; rowOffset <= 1; rowOffset++){
//         let rowPos = row + rowOffset;
//           //Check for out of bounds

//           if(rowPos < 0 || rowPos === this.height){
//             continue;
//           }

//           for (let colOffset = -1; colOffset <= 1; colOffset++){
//            let colPos = col + colOffset;

//             if(colPos < 0 || colPos === this.width){
//               continue;
//             }
//             //Don't count this cell
//             if(colOffset === 0 && rowOffset === 0){
//               continue;
//             }
//             if(currentGen[rowPos][colPos] === 1){
//               genCount++;
//             }
//           }
//       }

//       for (let height = 0; height < this.height; height++){
//         for (let width = 0; width < this.width; width++){
//           lifeCount = countLives.call(this, height, width);
//           if(currentGen[h, w] === 1){
//             pastGen[height][width] = 0;

//           }

//           else {
//             backBuffer[height][width] = 1;
//           }
//         }
//         else{
//           if()
//         }
//       }

//       // // North
//       // if(height > 0){
//       //   if(currentGen[height - 1][width] === nextGen){
//       //       counter++;
//       //     }
//       //   }
//       // // West
//       // if(width > 0){
//       //   if(currentGen[height][width - 1] === nextGen) {
//       //     counter++;
//       //   }
//       // }
//       // // NorthWest
//       // if(height > 0 && width > 0){
//       //   if (currentGen[height - 1][width -1] === nextGen){
//       //     counter++;
//       //   }
//       // }
//       // // SouthWest
//       // if(height < this.height - 1 && width > 0){
//       //   if (currentGen[height + 1][width - 1] === nextGen){
//       //     counter++;
//       //   }
//       // }
//       // // East
//       // if(width < this.width - 1){
//       //   if(currentGen[height][width + 1] === nextGen){
//       //     counter++;
//       //   }
//       // }
//       // // NorthEast
//       // if(height > 0 && width < this.width - 1){
//       //   if(currentGen[height - 1][width + 1] === nextGen){
//       //     counter++;
//       //   }
//       // }
//       // // SouthEast
//       // if(height < this.height - 1 && width > this.width - 1){
//       //   if(currentGen[height + 1][width + 1] === nextGen){
//       //     counter++;
//       //   }
//       // }
//       // // South
//       // if(height < this.height - 1){
//       //   if(currentGen[height + 1][width] === nextGen){
//       //     counter++;
//       //   }
//       // }
//     }
//   }
// }

// export default Life;

/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
class CCA {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.currentBufferIndex = 0;

    this.randomize();

    // console.log('cells array', this.cells);

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
    for(let height = 0; height < this.height; height++){
      for(let width = 0; width < this.width; width++){
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0? 1 : 0];
    
    function hasInfectiousNeighbor(height, width){
      const nextVal = (currentBuffer[height][width] + 1) % MODULO;
      // console.log('infect')
      // West
      if(width > 0){
        if(currentBuffer[height][width - 1] === nextVal) {
          return true;
        }
      }
      if(height > 0){
        if(currentBuffer[height - 1][width] === nextVal){
          return true;
        }
      }
      if(width < this.width - 1){
        if(currentBuffer[height][width + 1] === nextVal){
          return true;
        }
      }
      if(height < this.height - 1){
        if(currentBuffer[height + 1][width] === nextVal){
          return true;
        }
      }
    }
      for (let height = 0; height < this.height; height++){
        for (let width = 0; width < this.width; width++){
          if (hasInfectiousNeighbor.call(this, height, width)){
            backBuffer[height][width] = (currentBuffer[height][width] + 1) % MODULO;
          }
          else {
            backBuffer[height][width] = currentBuffer[height][width];
          }
        }
      }
      // else{
      //   return false;
      // }

      this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;

    
  }
}

export default CCA;
