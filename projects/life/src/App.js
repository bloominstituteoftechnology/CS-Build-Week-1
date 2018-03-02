import React, { Component } from "react";
import Life from "./life";
import "./App.css";

const COLORS = [
  [0x00, 0x00, 0x00], // black
  [0x00, 0xff, 0xff], // blue
  [0xff, 0x00, 0x00] // red
];

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
    this.life.randomize();

    this.sterilization = this.sterilization.bind(this);
    this.assimilation = this.assimilation.bind(this);
    this.dropPopulationBomb = this.dropPopulationBomb.bind(this);
  }

  dropPopulationBomb(e) {
    this.life.dropPopulationBomb();
    COLORS[1] = [0x00, 0xff, 0x37];
  }

  assimilation(e) {
    this.life.assimilation();
    COLORS[1] = [0xd3, 0xd3, 0xd3];
  }

  sterilization(e) {
    this.life.sterilization();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  handleReset(e) {
    window.location.reload();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //
    const cells = this.life.getCells();
    const height = this.props.height;
    const width = this.props.width;

    // Get canvas framebuffer, a packed RGBA array
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    canvas.style.width = canvas.width * 1.25 + "px";
    canvas.style.height = canvas.height * 1.25 + "px";
    let imageData = ctx.getImageData(0, 0, width, height);

    // Convert the cell values into white or black for the canvas
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]; // red
        imageData.data[index + 1] = color[1]; // green
        imageData.data[index + 2] = color[2]; // blue
        imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Next generation of life
    this.life.step();

    // Request another animation frame
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
        <div>
          <button onClick={e => this.handleReset(e)}>Reset Game</button>
          { }
          <button onClick={e => this.assimilation(e)}>Borgify</button>
          { }
          <button onClick={e => this.dropPopulationBomb(e)}>Population Bloom</button>
          { }
          <button onClick={e => this.sterilization(e)}>Population Nuke</button>
        </div>
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
   * <LifeCanvas width={600} height={500} style="width:1200px;height:1000px;"/>
   * <LifeCanvas width={600} height={500}/>
   */
  render() {
    return (
      <div>
        <div className="canvas">
          <LifeCanvas width={600} height={500} />
        </div>
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
        Conway's Game of Life
        <LifeApp />
      </div>
    );
  }
}

export default App;
