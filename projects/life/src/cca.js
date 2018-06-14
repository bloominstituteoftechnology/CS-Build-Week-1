

/**
 * Implemention of a Life
 */

const MODULO = 5;
const CHANCE_TREE = .01;

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
        // if(Math.random() < CHANCE_TREE) {
          // this.cells[this.currentBufferIndex][height][width] = 5;
        // }
        // else{
          this.cells[this.currentBufferIndex][height][width] = (Math.random() * 2) | 0;
        // }
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0? 1 : 0];
    
    function hasLife(row, col){
      let lifeCount = 0;
      let hasVines = false;

      // Off Grid === Dead

      for (let rowOffset = -7; rowOffset <= 0; rowOffset++){
        let rowPos = row + rowOffset;
        if(rowPos < 0 || rowPos === this.height){
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++){
        let colPos = col + colOffset;

          if(colPos < 0 || colPos === this.width){
            continue;
          }
          if(colOffset === 0 && rowOffset === 20){
            continue;
          }
          // if(currentBuffer[rowPos][colPos] === 2){
          //   hasVines = true;
          // }
          if(currentBuffer[rowPos][colPos] === 1){
            lifeCount++;
          }
          
          
          if(rowPos === 0){
            // colPos--;
            lifeCount = 0;
          }
          // if(currentBuffer[rowPos] === 50){
          //   continue;
          // }
          if(rowPos === 100){
            // colPos--;
            continue;
          }
          // if(currentBuffer[rowPos] === 120){
          //   continue;
          // }
          // if(rowPos === 150){
          //   // colPos--;
          //   lifeCount = 0;
          // }
          if(rowPos === 200){
            // colPos--;
            lifeCount = 0;
          }
          // if(rowPos === 250){
          //   // colPos--;
          //   lifeCount = 0;
          // }
          if(rowPos === 300){
            // colPos--;
            continue;
          }

          // if(hasVines === true){
          //   // lifeCount++;
          //   continue;
          // }
        }

    
        
      }
      // console.log(lifeCount);
      return {lifeCount, hasVines};
    }

      for (let height = 0; height < this.height; height++){
        
        for (let width = 0; width < this.width; width++){
         let {lifeCount, hasVines} = hasLife.call(this, height, width)
         
        //  console.log(lifeCount)

          if(currentBuffer[height][width] === 2){
            backBuffer[height][width] = 2;
            lifeCount++;
          }
          
          else{
          if(currentBuffer[height][width] === 1){
            
            // console.log('currentBuffer')
            
            if(lifeCount < 2 || lifeCount > 10){
              backBuffer[height][width] = 2;
            }
            if(lifeCount < 2 || lifeCount > 3){
              backBuffer[height][width] = 1;
            }
          
            
            else{
              backBuffer[height][width] = 2;
            }
            
            
          }

          
        
          else {
            if(lifeCount === 1){
              backBuffer[height][width] = 1;
              // lifeCount--;
            }
            if(lifeCount === 2){
              backBuffer[height][width] = 2;
              lifeCount = 0;
            }
            
            else{
              backBuffer[height][width] = 0;
              
            }
          }
        }
        }
      }  
      this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
