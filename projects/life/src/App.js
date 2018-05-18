import React, { Component } from 'react';
import Life from './life';
import './App.css';

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
    this.setup = 1;
    // this.life.getImageData();
  }
  setupCanvasWithImg() {
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let img = new Image();
    img.src = "data:image/gif;base64,R0lGODlh9AGQAYAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDY2RjZCMDUyN0ExMUU4QjI4N0NERTg5N0E4MTE5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDY2RjZCMTUyN0ExMUU4QjI4N0NERTg5N0E4MTE5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJFMkRFNzg5NTI3OTExRThCMjg3Q0RFODk3QTgxMTk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJFMkRFNzhBNTI3OTExRThCMjg3Q0RFODk3QTgxMTk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGw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";
    ctx.drawImage(img, 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let buffer = imageData.data;
    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        if (buffer[index] === 0xff) {
          let currentNumber = cells[row][col];
          let color =
            currentNumber === 1 ? [0x00, 0x00, 0x00] : [0x00, 0xff, 0x66];
          buffer[index] = color[0];
          buffer[index + 1] = color[1];
          buffer[index + 2] = color[2];
          buffer[index + 3] = 0xff;
        }
      }
    }
    this.life.drawCanvas(imageData);
    ctx.putImageData(imageData, 0, 0);
    // this.setup = 0;
  }
  /**
   * Component did mount
   */
  componentDidMount() {
    this.setupCanvasWithImg();

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }
  /**
   * Handle an animation frame
   */

  animFrame(timestamp) {
    if (this.setup) {
      this.setupCanvasWithImg();
      this.setup = 0;
    }
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let buffer = imageData.data;

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++){
        let index = (row * this.props.width + col) * 4;
 
        let currentNumber = cells[row][col];
        let color = currentNumber === 0 ? [0x00, 0x00, 0x00] : [0x00, 0xFF, 0x66];
        buffer[index] = color[0];
        buffer[index + 1] = color[1];
        buffer[index + 2] = color[2];
        buffer[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
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
        <LifeCanvas width={500} height={400} />
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
