import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      cycles: 0,
      clear: false,
      color: "#DB7093"
    }
  }
  componentDidMount() {
    this.gridStateInit()
    this.drawGrid()
  }
  gridStateInit = () => {
    for (let i=0; i<300; i+=20){
      for (let j=0; j<300; j+=20){
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

  nextBoard = () => {
    let stateBuffer = {...this.state};
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for (let i=0; i<300; i+=20){
      for (let j=0; j<300; j+=20){
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
        if (this.state[`${i}_${j}`] === "alive" && livingNeighbors > 3) {
          stateBuffer[`${i}_${j}`] = "dead"
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(i+1, j+1, 19, 19);
        } else if (this.state[`${i}_${j}`] === "alive" && livingNeighbors < 2) {
          stateBuffer[`${i}_${j}`] = "dead"
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(i+1, j+1, 19, 19);
        } else if (this.state[`${i}_${j}`] === "dead" && livingNeighbors === 3) {
          stateBuffer[`${i}_${j}`] = "alive"
          ctx.fillStyle = this.state.color
          ctx.fillRect(i+1, j+1, 19, 19);
        }
      }
    }
    return stateBuffer;
  }

  updateCells = () => {
    let cyclesCopy = this.state.cycles
    ++cyclesCopy;
    if(this.state.running){
      setTimeout(() => {
      let stateBuffer = this.nextBoard();
      this.setState ({...stateBuffer, cycles: cyclesCopy }, () => requestAnimationFrame(this.updateCells));
    }, 100)} else {
      let stateBuffer = this.nextBoard();
      this.setState({...stateBuffer, cycles: cyclesCopy })
      if (this.state.clear) {
        this.setState({cycles: 0})
      }
    }
  }
  updateCellColor = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for (let i=0; i<300; i+=20){
      for (let j=0; j<300; j+=20){
        if (this.state[`${i}_${j}`] === "alive") {
          ctx.fillStyle = this.state.color
          ctx.fillRect(i+1, j+1, 19, 19);
        }
      }
    }
  }
  buttonClick = (type) => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    switch(type){
      case "run":
        if (!this.state.running) {
          this.setState({running: true, clear: false})
          requestAnimationFrame(this.updateCells)
        }
        break;
      case "step":
        if(!this.state.running){
          this.setState({clear: false})
          requestAnimationFrame(this.updateCells)
        }
        break;
      case "stop":
        this.setState({running: false})
        break;
      case "clear":
        this.setState({running: false, clear: true})
        ctx.clearRect(0,0,c.width,c.height) //this clears the entire canvas
        this.drawGrid() // so i redraw it here
        this.gridStateInit() //reset state with all dead cells
        break;
      case "glider":
        this.setState({
          "120_80": "alive", 
          "120_100": "alive",
          "120_120": "alive",
          "100_120": "alive",
          "80_100": "alive"
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(121, 81, 19, 19);
        ctx.fillRect(121, 101, 19, 19);
        ctx.fillRect(121, 121, 19, 19);
        ctx.fillRect(101, 121, 19, 19);
        ctx.fillRect(81, 101, 19, 19);
        break;
      case "t":
        this.setState({
          "100_80": "alive", 
          "120_80": "alive", 
          "140_80": "alive",
          "120_100": "alive",
          "120_120": "alive",
          "120_140": "alive"
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(121, 81, 19, 19);
        ctx.fillRect(121, 101, 19, 19);
        ctx.fillRect(121, 121, 19, 19);
        ctx.fillRect(121, 141, 19, 19);
        ctx.fillRect(101, 81, 19, 19);
        ctx.fillRect(141, 81, 19, 19);
        break;
      case "arrow":
        this.setState({
          "120_100": "alive", 
          "140_120": "alive", 
          "160_140": "alive",
          "140_160": "alive",
          "120_180": "alive",
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(121, 101, 19, 19);
        ctx.fillRect(141, 121, 19, 19);
        ctx.fillRect(161, 141, 19, 19);
        ctx.fillRect(141, 161, 19, 19);
        ctx.fillRect(121, 181, 19, 19);
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
      ctx.fillStyle = this.state[`${x}_${y}`] === "alive" ? "#FFFFFF" : this.state.color;
      //plus 1 px for border
      ctx.fillRect(x+1, y+1, 19, 19);
      const cellStatus = this.state[`${x}_${y}`] === "alive" ? "dead" : "alive"
      this.setState({[`${x}_${y}`]: cellStatus});
      console.log(x,y)
    } else {
      return null;
    }
  }
  colorClick = (color) => {
    switch(color) {
      case "r":
        this.setState({color: "red"}, () => this.updateCellColor())
        break;
      case "o":
        this.setState({color: "#FF7F50"}, () => this.updateCellColor())
        break;
      case "y":
        this.setState({color: "#FEFA8A"}, () => this.updateCellColor())
        break;
      case "g":
        this.setState({color: "#00FA9A"}, () => this.updateCellColor())
        break;
      case "b":
        this.setState({color: "#1E90FF"}, () => this.updateCellColor())
        break;
      case "pu":
        this.setState({color: "#8A2BE2"}, () => this.updateCellColor())
        break;
      case "pi":
        this.setState({color: "#DB7093"}, () => this.updateCellColor())
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
            <button onClick={()=>this.buttonClick("step")}>Step</button>
            <button onClick={()=>this.buttonClick("stop")}>Stop</button>
            <button onClick={()=>this.buttonClick("clear")}>Clear</button>
          </div>
          <div>
            <h2>Rules</h2>
            <p className="rules">
              In the game of life each cell can be alive or dead. 
              Live cells will remain alive as long as they have at least 2 neighbors.
              Any less, and the cells will die of loneliness. 
              <br/><br/>However, more than 3 neighbors and the cells will feel totally overburdened 
              and just want to be left alone, so they feign death. But for your purposes, 
              we'll consider them truly dead.
              <br/><br/>If a cell is dead and lucky enough to be surrounded by 3 loving and supportive 
              neighbors, it will come to life, and thus, the Game of Life continues. 
            </p>
          </div>
        </div>
        <p className="belowText">Number of cycles: {this.state.cycles}</p>
        <p className="belowText">Presets</p>
        <div className="presets">
          <button onClick={()=>this.buttonClick("glider")}>Glider</button>
          <button onClick={()=>this.buttonClick("t")}>T</button>
          <button onClick={()=>this.buttonClick("arrow")}>Arrow</button>
        </div>
        <p className="belowText">Cell Color</p>
        <div className="colors">
          <button className="r" onClick={()=>this.colorClick("r")}>Red</button>
          <button className="o" onClick={()=>this.colorClick("o")}>Orange</button>
          <button className="y" onClick={()=>this.colorClick("y")}>Yellow</button>
          <button className="g" onClick={()=>this.colorClick("g")}>Green</button>
          <button className="b" onClick={()=>this.colorClick("b")}>Blue</button>
          <button className="pu" onClick={()=>this.colorClick("pu")}>Purple</button>
          <button className="pi" onClick={()=>this.colorClick("pi")}>Pink</button>
        </div>
      </div>
    );
  }
}

export default App;
