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

  this.currentBufferIndex=0;
  this.cells= [Array2D(width, height), Array2D(width, height)];
  
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
  clear()  {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    for(let height=0; this.height; height++) {
     for(let width=0; this.width; width++){
      this.cells[this.currentBufferIndex][height][width]=(Math.random() *MODULO) | 0;
     } 
    }

  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer =this.cells[this.currentBufferIndex];
    let backBuffer =this.cells[this.currentBufferIndex === 0? 1:0];

//see if we have a neighbor that can infect this cell and change its color
    function hasInfectiousNeighbor(height, width){
     if(currentBuffer ===undefined){
      console.log('broken');
     }
      const nextValue =(currentBuffer[height][width] +1) % MODULO;

      //west
    if (width > 0) {
      if(currentBuffer[height][width-1] ===nextValue) {
        return true;

      }
    }
//north
if (height > 0) {
  if(currentBuffer[height-1][width]===nextValue){
    return true;
    }
  }
  //east
  if (width <this.width-1){
    if(currentBuffer[height][width+1]===nextValue){
      return true;
    }
  }
  //south
  if (height > 0) {
  if(currentBuffer[height+1][width]===nextValue){
    return true;
  }
}
for(let h=0; height<this.height; h++){
  for(let w=0; width<this.width; w++){
if(hasInfectiousNeighbor.call(this, this.h, this.w)){
   backbuffer[height][width] =(currentBuffer[height][width] +1) % MODULO;

}else{
  backbuffer[height][width] =currentBuffer[height][width];
}
this.currentBufferIndex=this.currentBufferIndex=== 0 ? 1: 0;
}
}
export default CCA;