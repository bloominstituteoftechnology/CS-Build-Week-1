import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.drawGrid()
  }
  drawGrid = () => {
    const c = document.getElementById("grid");
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
  render() {
    return (
      <div className="App">
        <canvas id="grid"width="500" height="500"/>
      </div>
    );
  }
}

export default App;
