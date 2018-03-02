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
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();

    this.sterilization = this.sterilization.bind(this);
    this.assimilation = this.assimilation.bind(this);
    this.dropPopulationBomb = this.dropPopulationBomb.bind(this);
    this.life.step.hasLivingNeighbor.options.wrap = this.life.step.hasLivingNeighbor.options.wrap.bind(
      this
    );

    this.state = {
      stop: false,
      step: false
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  // toggle wrap
  handleWrap(e) {
    !this.life.step.handleLivingNeighbor.options.wrap
      ? this.life.step.handleLivingNeighbor.options.wrap === true
      : this.life.step.handleLivingNeighbor.options.wrap === false;
  }

  // randomly adds life
  dropPopulationBomb(e) {
    this.life.dropPopulationBomb();
    // COLORS[1] = [0x00, 0xff, 0x37];
  }

  //
  assimilation(e) {
    this.life.assimilation();
    COLORS[1] = [0xd3, 0xd3, 0xd3];
  }

  //
  sterilization(e) {
    this.life.sterilization();
  }

  // handleReset(e) {
  //   window.location.reload();
  // }

  handleClear(e) {
    this.life.clear();
  }

  handleStop(e) {
    !this.state.stop
      ? this.setState({ stop: true })
      : this.setState({ stop: false }, () => {
          this.animFrame();
        });
  }

  random_rgb() {
    let o = Math.round,
      r = Math.random,
      s = 255;
    COLORS[1] = [o(r() * s), o(r() * s), o(r() * s)];
    // [0xd3, 0xd3, 0xd3]
  }

  // handleStep(e) {
  //   this.state.step
  //     ? this.setState({ stop: false }, this.life.step())
  //     : this.setState({ stop: true }, this.animFrame());
  // }

  animFrame() {
    if (!this.state.stop) {
      const cells = this.life.getCells();
      const height = this.props.height;
      const width = this.props.width;

      // Get canvas framebuffer, a packed RGBA array
      const canvas = this.refs.canvas;
      let ctx = canvas.getContext("2d");

      // these lines zoom the canvas
      // canvas.style.width = canvas.width * 1.25 + "px";
      // canvas.style.height = canvas.height * 1.25 + "px";
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
      // if (this.motion === true) {
      this.life.step();
      // }

      // Request another animation frame
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }
  }

  /**
   * Render
   */
  //           <button onClick={e => this.handleStep(e)}>Single Step</button>
  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
        <div>
          <button onClick={e => this.life.randomize(e)}>Genisis</button>
          {}
          <button onClick={e => this.handleWrap(e)}>Wrap</button>
          {}
          <button onClick={e => this.handleClear(e)}>Mass Extinction</button>
          {}
          <button onClick={e => this.handleStop(e)}>
            {this.state.stop ? "Start" : "Stop"}
          </button>
          {}
          <button onClick={e => this.random_rgb(e)}>Random Color</button>
        </div>
        <div />
        <div>
          <button onClick={e => this.assimilation(e)}>Disrupt Nature</button>
          {}
          <button onClick={e => this.dropPopulationBomb(e)}>
            Population Bloom
          </button>
          {}
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
