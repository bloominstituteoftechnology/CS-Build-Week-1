import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
// const demoCOLORS = [
//   [0, 0, 0],
//   [0x8f, 0, 0x5f],
//   [0x5f, 0, 0x8f],
//   [0, 0, 0xff],
//   [0, 0x5f, 0x7f],
//   [0x5f, 0x8f, 0x7f],
//   [0x8f, 0xff, 0x7f],
//   [0xff, 0x5f, 0x7f],
// ]
const COLORS = [
  [0xFF,0xFF,0xFF],
  [0,0,0],
  [0xFF,0,0]
]

class LifeCanvas extends Component {

  
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();
    this.props.update(this.stopStart, this.addGlider, this.clear, this.gliderGun);
    this.pause = false;
;
  }
  addBlock = (event) => {
    // return { x: event.offsetX, y: event.offsetY };

    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(`clicked on x: ${x} y: ${y}`);
    this.addGlider(Math.floor(x/2),Math.floor(y/2));
  }
  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
    this.refs.canvas.addEventListener('click', this.addBlock, false)
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
    const cells = this.life.getCells();
    const canvas = this.refs.canvas;
    const height = this.props.height;
    const width = this.props.width;
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0,0,width,height);
    for (let y = 0;y<height;y++) {
      for (let x = 0;x<width;x++) {
        // if (cells[y][x] > 1)
        //   console.log(`red cell ${cells[y][x]}  ${x} ${y} `);
        const state = cells[y][x] % COLORS.length;
        const color = COLORS[state];
        const index = (y * width  + x) * 4;
        imageData.data[index + 0] = color[0];
        imageData.data[index + 1] = color[1];
        imageData.data[index + 2] = color[2];   
        imageData.data[index + 3] = 0xFF// state > 0 ? 0xff : 0;             
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    if (!this.pause)
      requestAnimationFrame(() => {this.animFrame()});    
  }
  stopStart = () => {
    this.pause = !this.pause
    if (!this.pause)
      requestAnimationFrame(() => {this.animFrame()});
  }
  addGlider = (x=0,y=0) => {
    this.life.addGLider(x,y);
  }
  clear = () => {
    this.life.clear();
  }
  gliderGun = (x=0, y=0) => {
    this.life.glider_gun(x, y);
  }
  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height}  />
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {
   constructor(props) {
     super(props);
     this.state = {
       isPausedPrompt: 'Pause'
     }
     this.stopStart = null;
     this.glider = null; 
     this.clear = null;    
   }

  setupUpdate = (ss, gl,cl, gg) => {
    this.stopStart = ss;
    this.glider = gl;
    this.clear = cl;
    this.gliderGun = gg;
  }
  clearCanvas = () => {
    this.clear();
  }
  startGlider = () => {
    this.glider();
  }
  startGliderGun = () => {
    this.gliderGun();
  }   
  pause = () => {
     this.setState({
       isPausedPrompt: this.state.isPausedPrompt === 'Pause' ? 'Start' : 'Pause'
     });
     this.stopStart();
   }
  /**
   * Render
   */
  render() {
    return (
      <form>
        <LifeCanvas id='life' width={400} height={300} update={this.setupUpdate} />
        <button type='button' onClick={this.pause}>{this.state.isPausedPrompt}</button>
        <button type='button' onClick={this.startGlider}>Start Glider</button>
        <button type='button' onClick={this.startGliderGun}>Start Glider Gun</button> 
        <button type='button' onClick={this.clearCanvas}>Clear</button>
        <input type='submit' value='Restart' />
      </form>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}

export default App;
