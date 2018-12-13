import React, { Component } from 'react';
import './App.css';

const colorWheel = ["red", "#FF7F50", "#FEFA8A", "#00FA9A", "#1E90FF", "#8A2BE2", "#DB7093"]

class Game extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      cycles: 0,
      clear: false,
      color: "#DB7093",
      rainbowColor: 0,
      rainbowMode: false
    }
  }
  componentDidMount() {
    this.gridStateInit()
    this.drawGrid()
  }
  gridStateInit = () => {
    for (let i=0; i<400; i+=10){
      for (let j=0; j<400; j+=10){
        this.setState({[`${i}_${j}`]: "dead"})
      }
    }
  }
  drawGrid = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    ctx.strokeStyle = "blue"
    for(let i=0; i<= 400; i+=10) {
      ctx.beginPath()
      //vertical
      ctx.moveTo((i+.5), 0);
      ctx.lineTo((i+.5), 400);
      //horizontal
      ctx.moveTo(0, (i+.5));
      ctx.lineTo(400, (i+.5));
      ctx.stroke();
   }
  }
  clearGrid = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height) //this clears the entire canvas
    this.drawGrid() // so i redraw it here
    this.gridStateInit() //reset state with all dead cells
  }
  nextBoard = () => {
    let stateBuffer = {...this.state};
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for (let i=0; i<400; i+=10){
      for (let j=0; j<400; j+=10){
        let livingNeighbors = 0
        let neighborTop = `${i}_${j-10}`
        let neighborBot = `${i}_${j+10}`
        let neighborL = `${i-10}_${j}`
        let neighborR = `${i+10}_${j}`
        let neighborTopL = `${i-10}_${j-10}`
        let neighborTopR = `${i+10}_${j-10}`
        let neighborBotL = `${i-10}_${j+10}`
        let neighborBotR = `${i+10}_${j+10}`
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
          ctx.fillRect(i+1, j+1, 9, 9);
        } else if (this.state[`${i}_${j}`] === "alive" && livingNeighbors < 2) {
          stateBuffer[`${i}_${j}`] = "dead"
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(i+1, j+1, 9, 9);
        } else if (this.state[`${i}_${j}`] === "dead" && livingNeighbors === 3) {
          stateBuffer[`${i}_${j}`] = "alive"
          ctx.fillStyle = this.state.color
          ctx.fillRect(i+1, j+1, 9, 9);
        }
      }
    }
    return stateBuffer;
  }
  updateCells = (step) => {
    let cyclesCopy = this.state.cycles
    ++cyclesCopy;
    if (this.state.running) {
      setTimeout(() => {
      let stateBuffer = this.nextBoard();
      this.setState ({...stateBuffer, cycles: cyclesCopy }, () => requestAnimationFrame(this.updateCells));
    }, 100)} else if (step === "step") {
      let stateBuffer = this.nextBoard();
      this.setState({...stateBuffer, cycles: cyclesCopy })
    } else if (this.state.clear){
      this.setState({cycles: 0}, () => this.clearGrid())
    }
  }
  updateCellColor = () => {
    const c = this.refs.grid
    const ctx = c.getContext("2d");
    for (let i=0; i<400; i+=10){
      for (let j=0; j<400; j+=10){
        if (this.state[`${i}_${j}`] === "alive") {
          ctx.fillStyle = this.state.color
          ctx.fillRect(i+1, j+1, 9, 9);
        }
      }
    }
  }
  rainbowMode = () => {
    if (this.state.rainbowMode){
      let nextColor = this.state.rainbowColor;
      nextColor = (nextColor + 1) % 7
      this.setState({color: colorWheel[nextColor], rainbowColor: nextColor}, this.updateCellColor)
      setTimeout(this.rainbowMode, 100)
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
          requestAnimationFrame(() => this.updateCells("step"))
        }
        break;
      case "stop":
        this.setState({running: false, rainbowMode: false})
        break;
      case "clear":
        this.setState({running: false, clear: true, rainbowMode: false}, () => this.updateCells())
        break;
      case "glider":
        this.setState({
          "60_40": "alive", 
          "60_50": "alive",
          "60_60": "alive",
          "50_60": "alive",
          "40_50": "alive"
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(61, 41, 9, 9);
        ctx.fillRect(61, 51, 9, 9);
        ctx.fillRect(61, 61, 9, 9);
        ctx.fillRect(51, 61, 9, 9);
        ctx.fillRect(41, 51, 9, 9);
        break;
      case "t":
        this.setState({
          "210_210": "alive", 
          "190_210": "alive", 
          "200_210": "alive",
          "200_220": "alive",
          "200_230": "alive",
          "200_240": "alive"
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(211, 211, 9, 9);
        ctx.fillRect(191, 211, 9, 9);
        ctx.fillRect(201, 211, 9, 9);
        ctx.fillRect(201, 221, 9, 9);
        ctx.fillRect(201, 231, 9, 9);
        ctx.fillRect(201, 241, 9, 9);
        break;
      case "arrow":
        this.setState({
          "120_120": "alive", 
          "130_130": "alive", 
          "140_140": "alive",
          "130_150": "alive",
          "120_160": "alive",
        });
        ctx.fillStyle = this.state.color
        ctx.fillRect(121, 121, 9, 9);
        ctx.fillRect(131, 131, 9, 9);
        ctx.fillRect(141, 141, 9, 9);
        ctx.fillRect(131, 151, 9, 9);
        ctx.fillRect(121, 161, 9, 9);
        break;
    }
  }
  cellClick = (e) => {
    if (this.state.running === false){
      const c = this.refs.grid
      const ctx = c.getContext("2d");
      const rect = c.getBoundingClientRect()
      const boxSize = 10
      const x = Math.floor((e.clientX - rect.left) / boxSize) * boxSize
      const y = Math.floor((e.clientY - rect.top)/ boxSize) * boxSize
      ctx.fillStyle = this.state[`${x}_${y}`] === "alive" ? "#FFFFFF" : this.state.color;
      //plus 1 px for border
      ctx.fillRect(x+1, y+1, 9, 9);
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
        this.setState({color: "red", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "o":
        this.setState({color: "#FF7F50", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "y":
        this.setState({color: "#FEFA8A", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "g":
        this.setState({color: "#00FA9A", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "b":
        this.setState({color: "#1E90FF", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "pu":
        this.setState({color: "#8A2BE2", rainbowMode: false}, () => this.updateCellColor())
        break;
      case "pi":
        this.setState({color: "#DB7093", rainbowMode: false}, () => this.updateCellColor())
      case "ra":
        this.setState({rainbowMode: true}, this.rainbowMode);
    }
  }

  render() {
    return (
      <div className="gameContainer cardface front">
        <h1 className="title">Conway's Game of Life</h1>
        <div className="board">
          <div className="leftControls">
            <div className="presetContainer">
              <p className="">Presets</p>
              <div className="presets">
                <button onClick={()=>this.buttonClick("glider")}>Glider</button>
                <button onClick={()=>this.buttonClick("t")}>T</button>
                <button onClick={()=>this.buttonClick("arrow")}>Arrow</button>
              </div>
            </div>
            <div className="colorContainer">
              <p className="">Cell Color</p>
              <div className="colors">
                <button className="r color" onClick={()=>this.colorClick("r")}>Red</button>
                <button className="o color" onClick={()=>this.colorClick("o")}>Orange</button>
                <button className="y color" onClick={()=>this.colorClick("y")}>Yellow</button>
                <button className="g color" onClick={()=>this.colorClick("g")}>Green</button>
                <button className="b color" onClick={()=>this.colorClick("b")}>Blue</button>
                <button className="pu color" onClick={()=>this.colorClick("pu")}>Purple</button>
                <button className="pi color" onClick={()=>this.colorClick("pi")}>Pink</button>
                <button className="ra color" onClick={()=>this.colorClick("ra")}>Rainbow</button>
              </div>
            </div>
          </div>
          <canvas onClick={this.cellClick} ref="grid" width="401" height="401"/>
          <div className="rightControls">
            <button onClick={()=>this.buttonClick("run")}>Run</button>
            <button onClick={()=>this.buttonClick("step")}>Step</button>
            <button onClick={()=>this.buttonClick("stop")}>Stop</button>
            <button onClick={()=>this.buttonClick("clear")}>Clear</button>
          </div>
        </div>
        <p className="cycles">Number of cycles: {this.state.cycles}</p>
      </div>
    );
  }
}

export default Game;
