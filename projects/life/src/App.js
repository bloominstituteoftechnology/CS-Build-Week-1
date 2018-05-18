import React, { Component } from 'react';
import Life from './life';
import './App.css';

const blackOrWhite = [[0, 0, 0], [0, 161, 214], [11, 214, 0], [255, 0, 0]];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.state = {
      armySizes: [],
      finished: false,
      winner: null,
    }
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    // Request another animation frame
    this.life.step();
    // Update life and get cells
    let life = this.life.getCells();
    this.setState({armySizes: this.life.getArmySizes()});
    let done = this.life.getDone();
    if(done) {
      this.setState({finished:true});
      if(this.state.armySizes[0] > this.state.armySizes[1]) this.setState({winner: "Eastern"})
      else this.setState({winner:"Western"})
    }

    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let buffer = imageData.data;

    // Convert the cell values into white or black for the canvas
    for (let row = 0; row < this.props.height; row++) {
      for (let column = 0; column < this.props.width; column++) {
        let index = (row * this.props.width + column) * 4;

        //conway
        // let currentNumber = life[row][column] % 2;

        //war
        let currentNumber = life[row][column];

        buffer[index + 0] = blackOrWhite[currentNumber][0];
        buffer[index + 1] = blackOrWhite[currentNumber][1];
        buffer[index + 2] = blackOrWhite[currentNumber][2];
        buffer[index + 3] = 0xff;
      }
    }
    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    // Next generation of life
    this.life.step();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }, 0);

  }

  /**
   * Render
   */
  render() {
    return (
      <div>
      <h5>Eastern Army Size: {this.state.armySizes[0]}</h5>
      <h5> Western Army Size: {this.state.armySizes[1]}</h5>
      <canvas ref="canvas" width={this.props.width} height={this.props.height} />
      {this.state.finished ? <h3>The Winner is the {this.state.winner} Army </h3> : null}
      
      </div>
    );
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
        <LifeCanvas width={500} height={500} />
      </div>
    );
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
