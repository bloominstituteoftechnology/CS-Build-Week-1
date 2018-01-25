<<<<<<< HEAD
import {COLORS} from './App';

const Array2D = (width, height) => {
	const arr = new Array(height);
  for (let i = 0; i < height; i++) arr[i] = new Array(width);
	return arr;
}
  
class CCA {
  constructor(width, height, parent) {
    this.width = width;
    this.height = height;
    this.currentCanvas = 1;

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.colors = parent;
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
    
    const inputColors = require('./color_converter/colors');
    const colorAmount = Math.floor(Math.random() * 10);
    for(let i = 0; i < colorAmount; i++) {
      COLORS[i] = inputColors[Math.floor(Math.random() * inputColors.length)];
    }
    this.colors.setState({colors:COLORS});
    const buffer = this.buffer[this.currentCanvas];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random() * COLORS.length) | 0; 
      }
    }

  }

  findNeighbor = (x, y) => {
    const bottomBufferIndex = !this.currentCanvas ? 1: 0;
    const topBuffer = this.buffer[this.currentCanvas];
    const bottomBuffer = this.buffer[bottomBufferIndex];
    const nextValue = (topBuffer[y][x] + 1) % COLORS.length ;
    const offset = 1;

    //start
    if (x > offset && (topBuffer[y][x-offset] === nextValue)) return true; 
    if (y > offset && (topBuffer[y-offset][x] === nextValue)) return true;

    //end
    if (x < this.width - offset && (topBuffer[y][x+offset] === nextValue)) return true;
    if (y < this.height - offset && (topBuffer[y+offset][x] === nextValue)) return true;

    return false;
  }

  step = () => {
    const topBuffer = this.buffer[this.currentCanvas];
    const bottomBufferIndex = !this.currentCanvas ? 1: 0;    
    const bottomBuffer = this.buffer[bottomBufferIndex];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.findNeighbor(x, y) ? bottomBuffer[y][x] = (topBuffer[y][x] + 1) % COLORS.length  : bottomBuffer[y][x] = topBuffer[y][x];
      }
    }
     
    this.currentCanvas = !this.currentCanvas ? 1: 0;
  }

=======
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

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
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
  }

  /**
   * Run the simulation for a single step
   */
  step() {
  }
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
}

export default CCA;