import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  componentDidMount() {
    const gridStateInit = {}
    for(let i=0; i<=300; i+=10){
      for(let j=0; j<=300; j+=10){
        this.setState({[`${i}_${j}`]: "dead"})
      }
    }
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
    //offset squares to make up for where the grid is on the page
    //minus 1 px for border
    const x = Math.floor(e.clientX / boxSize) * boxSize - 49
    const y = Math.floor(e.clientY / boxSize) * boxSize - 79
    ctx.fillStyle = this.state[`${x}_${y}`] === "alive" ? "#FFFFFF" : "#DB7093";
    //minus 1 px for border
    ctx.fillRect(x, y, 9, 9);
    const cellStatus = this.state[`${x}_${y}`] === "alive" ? "dead" : "alive"
    this.setState({[`${x}_${y}`]: cellStatus});
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Conway's Game of Life</h1>
        <div className="board">
          <canvas onClick={this.handleClick} ref="grid" width="301" height="301"/>
          <div className="presets">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
          <div>
            <h2>Rules</h2>
            <p>some stuff goes here later</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
