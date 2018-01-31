import React, { Component } from "react";
import Life from "./life";
import "./App.css";

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      life: new Life(props.width, props.height),
      continueAnimation: false
    };

    this.prevTime = null;

    this.state.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.drawCanvas();
    requestAnimationFrame(timeStamp => {
      this.animFrame(timeStamp);
    });
  }

  // componentWillUnmount() {
  //   //this.scontinueAnimation = false;
  // }

  drawCanvas() {
    const { width, height } = this.props;

    const cells = this.state.life.getCells();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const imageData = ctx.getImageData(0, 0, width, height);

    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        const idx = (y * width + x) * 4;
        let color = [0, 0, 0];

        if (cell === 1) {
          color = [255, 165, 0];
        }

        imageData.data[idx] = color[0];
        imageData.data[idx + 1] = color[1];
        imageData.data[idx + 2] = color[2];
        imageData.data[idx + 3] = 0xff;
      });
    });

    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Handle an animation frame
   */
  animFrame(timeStamp) {
    if (this.state.continueAnimation) {
      if (!this.prevTime) {
        this.prevTime = timeStamp;
      }
      requestAnimationFrame(timeStamp => this.animFrame(timeStamp));
      let delta = timeStamp - this.prevTime;
      let interval = 1000 / 25;

      if (delta > interval) {
        this.prevTime = timeStamp - delta % interval;
        this.drawCanvas();
        this.state.life.step();
      }
    }
  }

  randomize = async e => {
    e.preventDefault();
    const life = new Life(this.props.width, this.props.height);
    life.randomize();

    await this.setState({ life });

    this.drawCanvas();
  };

  handleStart = async e => {
    e.preventDefault();

    await this.setState({
      continueAnimation: !this.state.continueAnimation
    });
    if (this.state.continueAnimation) {
      requestAnimationFrame(timeStamp => this.animFrame());
    }
  };

  clear = async e => {
    e.preventDefault();

    await this.setState({
      life: new Life(this.props.width, this.props.height),
      continueAnimation: false
    });

    this.drawCanvas();
  };

  addGlider = e => {
    e.preventDefault();

    this.state.life.addGlider();
    this.drawCanvas();
  };

  addGliderGun = e => {
    e.preventDefault();

    this.state.life.addGosperGliderGun();
    this.drawCanvas();
  };

  /**
   * Render
   */
  render() {
    const startStop = this.state.continueAnimation ? "Stop" : "Start";
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
        <div className="button-wrapper">
          <div className="button" onClick={this.handleStart}>
            {startStop}
          </div>
          <div className="button" onClick={this.randomize}>
            Randomize
          </div>
          <div className="button" onClick={this.clear}>
            Clear
          </div>
          <div className="button" onClick={this.addGlider}>
            Add Glider
          </div>
          <div className="button" onClick={this.addGliderGun}>
            Add Glider Gun
          </div>
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
        <LifeCanvas width={100} height={100} />
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
        <h1 className="App-header">The Game of Life</h1>
        <LifeApp />
      </div>
    );
  }
}

export default App;
