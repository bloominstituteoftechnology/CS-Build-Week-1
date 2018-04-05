import React, { Component } from 'react';
import Life from './life';
import './App.css';

import Button from './Components/Button/Button';

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

    this.state = {
      stepsToTake: 30,
      stepsTaken: 0,
      totalSteps: 0,
      stopped: false,
      stepping: false,
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.startAnimation();
  }

  step = () => {
    this.setState({
      stepsTaken: 0,
      stepping: true,
    });
    this.startAnimation();
  };

  startAnimation = () => {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  };

  onSetStepsToTake = e => {
    this.setState({
      stepsToTake: e.target.value,
      stopped: false,
    });
  };

  toggleStart = () => {
    this.setState({
      stopped: !this.state.stopped,
    });
    if (this.state.stopped) {
      this.setState({
        stepping: false,
      });
      this.startAnimation();
    }
  };

  /**
   * Handle an animation frame
   */
  animFrame() {
    this.setState(prevState => {
      return {
        stepsTaken: prevState.stepsTaken + 1,
        totalSteps: prevState.totalSteps + 1,
      };
    });
    if (!this.state.stopped || (this.state.stepping && this.state.stepsTaken < this.state.stepsToTake)) {
      let width = this.props.width;
      let height = this.props.height;

      let cells = this.life.getCells();

      let canvas = this.refs.canvas;
      let ctx = canvas.getContext('2d');

      let imageData = ctx.getImageData(0, 0, width, height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let index = (y * width + x) * 4;

          let color = cells[y][x] === 0 ? 0x00 : 0xff;

          imageData.data[index + 0] = 0x80; // Red channel
          imageData.data[index + 1] = color; // Green channel
          imageData.data[index + 2] = color; // Blue channel
          imageData.data[index + 3] = 0xff; // Alpha channel, 0xff = opaque
        }
      }

      // Put the new image data back on the canvas

      ctx.putImageData(imageData, 0, 0);

      // Next generation of life
      this.life.step();

      // Request another animation frame

      this.startAnimation();
    }
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        <div className="button-container">
          <div>
            <Button label={'step'} handleClick={this.step} />
          </div>
          <div>
            <Button label={this.state.stopped ? 'start' : 'stop'} handleClick={this.toggleStart} />
          </div>
        </div>

        <div>
          <text>Steps Taken this Round: </text>
          {this.state.stepsTaken}
        </div>
        <div>
          <text>Total Steps Taken: </text>
          {this.state.totalSteps}
        </div>
        <div>
          <text>Put how many steps to go at a time</text>
          <input value={this.state.stepsToTake} onChange={this.onSetStepsToTake} />
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
        <LifeCanvas width={1800} height={600} />
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
