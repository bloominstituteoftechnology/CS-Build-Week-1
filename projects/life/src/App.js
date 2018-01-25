import React, { Component } from 'react';
import Life from './life';
import './App.css';

<<<<<<< HEAD
class LifeCanvas extends Component {

  constructor(props) {
    super(props);
=======
/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

<<<<<<< HEAD
  componentDidMount = () => requestAnimationFrame(() => this.animFrame());

  animFrame = () => {
    let width = this.props.width;
    let height = this.props.height;

    const cells = this.life.getCells();

    const display = this.refs.display;
    const context = display.getContext('2d');
    const image = context.getImageData(0, 0, width, height);

    let index = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        const isAlive = cells[y][x];
        const color = !isAlive ? 0x00: 0x10;

        image.data[index] = color * 100;
        image.data[index + 1] = color; 
        image.data[index + 2] = color;
        image.data[index + 3] = 0xff;  

        index += 4;
      }
    }

    context.putImageData(image, 0, 0);
    this.life.step();

    requestAnimationFrame(() => this.animFrame());
  }
  render =() => {
    return (
      <div className="display-wrapper">
        <div>
          <canvas ref="display" id="canvas" width={this.props.width} height={this.props.height} />
          <Controls life={this.life}/>
        </div>
      </div>
      );
  }
}

class Controls extends Component {
  constructor(props){
    super();
    this.life = props.life;
  }
  render(){
    return (
      <div className="App-wrapper-life-controls">
        <button onClick={() => this.life.clear()}> Clear</button>
        <button  onClick={() => this.life.randomize()}> Randomize</button>
      </div>
    );
  }
}

class LifeApp extends Component {
  render() {
    return (
      <div>
        <LifeCanvas width={300} height={300} />
=======
  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
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
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300} />
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
      </div>
    )
  }
}

<<<<<<< HEAD
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className='App-header'><h1>LAMBDA SCHOOL: GAME OF LIFE</h1></header>
        <div className='App-wrapper'>
          <LifeApp />
        </div>
        <footer className='footer'> Copyright 2018 Track Seven Development </footer>
=======
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
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
      </div>
    );
  }
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
