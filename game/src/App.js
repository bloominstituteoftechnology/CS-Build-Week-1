import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.drawGrid()
  }
  drawGrid = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for(let i=0; i<= 300; i+=10) {
      ctx.beginPath()
      //vertical
      ctx.moveTo((i+.5), 0);
      ctx.lineTo((i+.5), 300);
      //horizontal
      ctx.moveTo(0, (i+.5));
      ctx.lineTo(300, (i+.5));
      ctx.stroke();
   }
  }
  handleClick = (e) => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    const boxSize = 10
    ctx.fillStyle = "#DB7093";
    ctx.fillRect(Math.floor(e.clientX / boxSize) * boxSize,
      Math.floor(e.clientY / boxSize) * boxSize,
      boxSize, boxSize);
  }

  render() {
    return (
      <div className="App">
        <canvas onClick={this.handleClick} ref="grid" width="500" height="500"/>
      </div>
    );
  }
}

export default App;
