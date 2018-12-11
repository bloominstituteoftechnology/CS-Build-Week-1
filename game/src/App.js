import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      cycles: 0
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
    ctx.strokeStyle = "blue"
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

  moveCells = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    if(this.state.running){
      let stateBuffer = {...this.state};
      for (let i=0; i<=300; i+=20){
        for (let j=0; j<=300; j+=20){
          let livingNeighbors = 0
          let neighborTop = `${i}_${j-20}`
          let neighborBot = `${i}_${j+20}`
          let neighborL = `${i-20}_${j}`
          let neighborR = `${i+20}_${j}`
          let neighborTopL = `${i-20}_${j-20}`
          let neighborTopR = `${i+20}_${j-20}`
          let neighborBotL = `${i-20}_${j+20}`
          let neighborBotR = `${i+20}_${j+20}`
          if (this.state[neighborTop] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborBot] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborL] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborR] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborTopL] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborTopR] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborBotL] === "alive"){
            ++livingNeighbors
          }
          if (this.state[neighborBotR] === "alive"){
            ++livingNeighbors
          }
          console.log("neighbors", livingNeighbors)
          if (this.state[`${i}_${j}`] === "alive" && livingNeighbors > 3) {
            console.log("o no cell die")
            stateBuffer[`${i}_${j}`] = "dead"
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(i+1, j+1, 19, 19);
          } else if (this.state[`${i}_${j}`] === "alive" && livingNeighbors < 2) {
            console.log("o no cell die")
            stateBuffer[`${i}_${j}`] = "dead"
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(i+1, j+1, 19, 19);
          } else if (this.state[`${i}_${j}`] === "dead" && livingNeighbors === 3) {
            console.log("come to liiiife")
            stateBuffer[`${i}_${j}`] = "alive"
            ctx.fillStyle = "#DB7093"
            ctx.fillRect(i+1, j+1, 19, 19);
          }
        }
      }
      this.setState(stateBuffer);
      let cyclesCopy = this.state.cycles
      ++cyclesCopy;
      this.setState({cycles: cyclesCopy})
      requestAnimationFrame(this.moveCells);
    }
  }
  buttonClick = (type) => {
    switch(type){
      case "run":
        this.setState({running: true})
        requestAnimationFrame(this.moveCells)
        break;
      case "stop":
        this.setState({running: false})
        break;
      case "clear":
        const c = this.refs.grid
        const ctx = c.getContext("2d");
        ctx.clearRect(0,0,c.width,c.height) //this clears the entire canvas
        this.drawGrid() // so i redraw it here
        this.gridStateInit() //reset state with all dead cells
        this.setState({cycles: 0})//restart cycles
        break;
    }
  }
  cellClick = (e) => {
    if (this.state.running === false){
      const c = this.refs.grid
      const ctx = c.getContext("2d");
      const boxSize = 20
      //offset squares to make up for where the grid is on the page
      //minus 9 on clientX because I had issues with it reporting a larger number than
      //I expected, can't figure out for now so using brute force
      const x = Math.floor((e.clientX - 9) / boxSize) * boxSize -40
      const y = Math.floor(e.clientY / boxSize) * boxSize -80
      ctx.fillStyle = this.state[`${x}_${y}`] === "alive" ? "#FFFFFF" : "#DB7093";
      //plus 1 px for border
      ctx.fillRect(x+1, y+1, 19, 19);
      const cellStatus = this.state[`${x}_${y}`] === "alive" ? "dead" : "alive"
      this.setState({[`${x}_${y}`]: cellStatus});
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
          <div className="controls">
            <button onClick={()=>this.buttonClick("run")}>Run</button>
            <button onClick={()=>this.buttonClick("stop")}>Stop</button>
            <button onClick={()=>this.buttonClick("clear")}>Clear</button>
          </div>
          <div>
            <h2>Rules</h2>
            <p>some stuff goes here later</p>
          </div>
        </div>
        <p className="cycles">Number of cycles: {this.state.cycles}</p>
      </div>
    );
  }
}

export default App;
