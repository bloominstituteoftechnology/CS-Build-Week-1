import React, { Component } from 'react';
import Life from './life.js';
import './App.css';

const COLORS = [[0, 0, 0], [0xff, 0xff, 0xff]];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();

    this.state = {
      weaponSelect: 1,
      draw: 0,
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  animFrame() {
    const cells = this.life.getCells();
    const height = this.props.height;
    const width = this.props.width;

    // Get canvas framebuffer, a packed RGBA array
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    canvas.style.width = canvas.width * 2 + 'px';
    canvas.style.height = canvas.height * 2 + 'px';
    let imageData = ctx.getImageData(0, 0, width, height);

    // Convert the cell values into white or black for the canvas
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]; // Red
        imageData.data[index + 1] = color[1]; // Blue
        imageData.data[index + 2] = color[2]; // Green
        imageData.data[index + 3] = 0xff; // Alpha, 0xff === 255 === opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    ctx.scale(4, 4);

    // Update life and get cells
    this.life.step();

    // Request another animation frame
    requestAnimationFrame(() => {
      this.animFrame();
    });
    // Next generation of life
  }

  toggleDraw(e) {
    console.log(this.state);
    if (this.state.draw === 0) {
      this.setState({ draw: 1 });
      console.log('draw');
    } else {
      this.setState({ draw: 0 });
      console.log('no draw');
    }
  }

  draw(e) {
    if (this.state.draw === 1) {
      this.life.draw(e.clientX, e.clientY);
      this.setState({ x: e.screenX, y: e.screenY });
      console.log('drawing');
    }
  }

  chooseWeapon = i => e => {
    this.setState({ weaponSelect: i });
    console.log(this.state);
  };

  fireWeapon(e) {
    switch (this.state.weaponSelect) {
      case 1:
        this.life.glider(e.clientX, e.clientY);
        break;
      case 2:
        this.life.switchEngine(e.clientX, e.clientY);
        break;
      case 3:
        this.life.railGun(e.clientX, e.clientY);
        break;
      case 4:
        this.life.pulsar(e.clientX, e.clientY);
        break;
      case 5:
        this.life.phaseBlaster(e.clientX, e.clientY);
        break;
    }
    // console.log(this.refs.canvas);
  }

  Sterilization(e) {
    this.life.Sterilization();
    COLORS[1] = [0xff, 0x00, 0x00];
  }

  dropPopulationBomb(e) {
    this.life.dropPopulationBomb();
    COLORS[1] = [0x00, 0xff, 0x37];
  }

  assimilation(e) {
    this.life.Assimilation();
    COLORS[1] = [0x68, 0xc7, 0xff];
  }

  randomize(e) {
    this.life.randomize();
    COLORS[1] = [0xff, 0xff, 0xff];
  }

  clear(e) {
    this.life.clear();
  }

  render() {
    return (
      <div>
        <div>
          <canvas
            ref="canvas"
            width={this.props.width}
            height={this.props.height}
            onMouseMove={this.draw.bind(this)}
            onClick={this.fireWeapon.bind(this)}
          />
        </div>
        <div>
          <button onClick={this.Sterilization.bind(this)}>Sterilization</button>
          <button onClick={this.dropPopulationBomb.bind(this)}>
            Population Bomb
          </button>
          <button onClick={this.assimilation.bind(this)}>Assimilation</button>
          <button onClick={this.clear.bind(this)}>Extinction</button>
          <button onClick={this.randomize.bind(this)}>Randomize</button>
        </div>
        <div>
          <span>Select Weapon</span>
          <button onClick={this.chooseWeapon.bind(this)(1)}>Glider</button>
          <button onClick={this.chooseWeapon.bind(this)(2)}>Engine</button>
          <button onClick={this.chooseWeapon.bind(this)(3)}>2x Rail Gun</button>
          <button onClick={this.chooseWeapon.bind(this)(4)}>Pulsar</button>
          <button onClick={this.chooseWeapon.bind(this)(5)}>
            Phase Blaster
          </button>
        </div>
        <div>
          <span />
          <button onClick={this.toggleDraw.bind(this)}>Toggle Draw</button>
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
   */
  render() {
    return (
      <div>
        <LifeCanvas
          width={Math.floor(300)}
          height={Math.floor(300)}
          width={Math.floor(window.innerWidth / 2)}
          height={Math.floor((window.innerHeight - 100) / 2)}
        />
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
