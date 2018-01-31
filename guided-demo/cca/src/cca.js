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
    this.cca = null;
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.parent = parent;
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
    let colorAmount = Number(this.parent.state.count) > 0 && Number(this.parent.state.count) < 4 ? 4 : Number(this.parent.state.count);
    if(colorAmount === 0) colorAmount = Math.floor(Math.random() * 20) | 4;
    console.log(colorAmount);
    for(let i = 0; i < colorAmount; i++) {
      COLORS[i] = inputColors[Math.floor(Math.random() * inputColors.length)];
    }
    this.parent.setState({colors:COLORS});
    const buffer = this.buffer[this.currentCanvas];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = (Math.random() * COLORS.length) | 0; 
      }
    }

  }

  findNeighbor = (x, y) => {
    const topBuffer = this.buffer[this.currentCanvas];
    const nextValue = (topBuffer[y][x] + 1) % COLORS.length ;
    const offset = 1;

    //start
    if (x > offset && (topBuffer[y][x-offset] === nextValue) && this.parent.state.left) return true; 
    if (y > offset && (topBuffer[y-offset][x] === nextValue) && this.parent.state.up) return true;

    //end
    if (x < this.width - offset && (topBuffer[y][x+offset] === nextValue) && this.parent.state.right) return true;
    if (y < this.height - offset && (topBuffer[y+offset][x] === nextValue) && this.parent.state.down) return true;

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

}

export default CCA;