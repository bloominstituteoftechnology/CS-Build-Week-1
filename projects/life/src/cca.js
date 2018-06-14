

/**
 * Implemention of a Life
 */

const MODULO = 2;

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
    
    function hasLife(row, col){
      let lifeCount = 0;

      // Off Grid === Dead

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++){
        let rowPos = row + rowOffset;
        if(rowPos < 0 || rowPos === this.height){
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++){
        let colPos = col + colOffset;

          if(colPos < 0 || colPos === this.width){
            continue;
          }
          if(colOffset === 0 && rowOffset === 0){
            continue;
          }
          if(currentBuffer[rowPos][colPos] === 1){
            lifeCount++;
          }
        }
        
      }
      // console.log(lifeCount);
      return lifeCount;
    }

      for (let height = 0; height < this.height; height++){
        
        for (let width = 0; width < this.width; width++){
         let lifeCount = hasLife.call(this, height, width)
         
        //  console.log(lifeCount)
          if(currentBuffer[height][width] === 1){

            // console.log('currentBuffer')
            
            if(lifeCount < 2 || lifeCount > 3){
              backBuffer[height][width] = 0;
            }
            else{
              backBuffer[height][width] = 1;
            }
            
          }
          else {
            if(lifeCount === 3){
              backBuffer[height][width] = 1;
            }
            else{
              backBuffer[height][width] = 0;
            }
          }
        }
      }  
      this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
