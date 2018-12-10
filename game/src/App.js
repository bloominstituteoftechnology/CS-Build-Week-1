import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false
    }
  }
  componentDidMount() {
    this.gridStateInit()
    this.drawGrid()
  }
  gridStateInit = () => {
    for (let i=0; i<=300; i+=20){
      for (let j=0; j<=300; j+=20){
        this.setState({[`${i}_${j}`]: "dead"})
      }
    }
  }
  drawGrid = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for(let i=0; i<= 300; i+=20) {
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
  buttonClick = (type) => {
    switch(type){
      case "run":
        this.setState({running: true})
        break;
      case "stop":
        this.setState({running: false})
        break;
      case "clear":
        const c = this.refs.grid
        const ctx = c.getContext("2d");
        ctx.clearRect(0,0,c.width,c.height)
        this.drawGrid()
        this.gridStateInit()
        break;
    }
  }
  cellClick = (e) => {
    if (this.state.running === false){
      const c = this.refs.grid
      const ctx = c.getContext("2d");
      const boxSize = 20
      //offset squares to make up for where the grid is on the page
      const x = Math.floor(e.clientX / boxSize) * boxSize -39
      const y = Math.floor(e.clientY / boxSize) * boxSize -79
      ctx.fillStyle = this.state[`${x-1}_${y-1}`] === "alive" ? "#FFFFFF" : "#DB7093";
      //minus 1 px for border
      ctx.fillRect(x, y, 19, 19);
      const cellStatus = this.state[`${x-1}_${y-1}`] === "alive" ? "dead" : "alive"
      this.setState({[`${x-1}_${y-1}`]: cellStatus});
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Conway's Game of Life</h1>
        <div className="board">
          <canvas onClick={this.cellClick} ref="grid" width="301" height="301"/>
          <div className="presets">
            <button onClick={()=>this.buttonClick("run")}>Run</button>
            <button onClick={()=>this.buttonClick("stop")}>Stop</button>
            <button onClick={()=>this.buttonClick("clear")}>Clear</button>
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
