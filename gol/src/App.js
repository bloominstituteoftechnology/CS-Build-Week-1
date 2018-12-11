import React, { Component } from "react";
import "./App.css";
import Grid from "./components/GameGrid";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curGrid: [],
      x: 16,
      y: 16,
      running: false,
      nextGrid: [],
      afterNextGrid: [],
      intervalID: 0,
      gen: 1
    };
  }
  newGrid = () => {
    let freshGrid = [];
    for (let index = 0; index < this.state.x * this.state.y; index++) {
      freshGrid.push({ alive: false, color: "#ffffff", isClickable: true });
    }
    this.setState({
      curGrid: freshGrid,
      nextGrid: freshGrid,
      afterNextGrid: freshGrid,
      gen: 1
    });
  };
  determineLife = (cellID, gridArr) => {
    let holdingArr = [];
    //top right bottom left
    let touchs = [false, false, false, false];
    if (cellID < this.state.x) {
      touchs[0] = true;
    }
    if (cellID >= this.state.curGrid.length - this.state.x) {
      touchs[2] = true;
    }
    if ((cellID + 1) % this.state.y === 0) {
      touchs[1] = true;
    }
    if (cellID % this.state.y === 0) {
      touchs[3] = true;
    }

    if (!touchs[0]) {
      holdingArr.push(gridArr[cellID - this.state.x].alive);
      if (!touchs[1]) {
        holdingArr.push(gridArr[cellID - this.state.x + 1].alive);
      }
      if (!touchs[3]) {
        holdingArr.push(gridArr[cellID - this.state.x - 1].alive);
      }
    }
    if (!touchs[2]) {
      holdingArr.push(gridArr[cellID + this.state.x].alive);
      if (!touchs[1]) {
        holdingArr.push(gridArr[cellID + this.state.x + 1].alive);
      }
      if (!touchs[3]) {
        holdingArr.push(gridArr[cellID + this.state.x - 1].alive);
      }
    }
    if (!touchs[1]) {
      holdingArr.push(gridArr[cellID + 1].alive);
    }
    if (!touchs[3]) {
      holdingArr.push(gridArr[cellID - 1].alive);
    }
    const cellcount = holdingArr.filter(i => i === true).length;
    if (cellcount === 3) {
      return true;
    }
    if (cellcount === 2 && gridArr[cellID].alive) {
      return true;
    }
    return false;
  };
  arrayCalc = arr => {
    return arr.map((e, i, a) => {
      const isAlive = this.determineLife(i, a);
      const color = isAlive ? "#000000" : "#ffffff";
      return { alive: isAlive, color: color, isClickable: e.isClickable };
    });
  };
  toggleClick = () => {
    this.setState({
      curGrid: this.state.curGrid.map(e => {
        e.isClickable = !e.isClickable;
        return e;
      })
    });
  };
  gameLoop = () => {
    const newArr = this.arrayCalc(this.state.afterNextGrid);
    let plusOne = this.state.gen + 1;
    this.setState({
      curGrid: [...this.state.nextGrid],
      nextGrid: [...this.state.afterNextGrid],
      afterNextGrid: newArr,
      gen: plusOne
    });
  };
  waitTime = () => {
    const interval = setInterval(() => {
      this.gameLoop();
    }, 500);
    this.setState({
      intervalID: interval
    });
  };
  stopSim = () => {
    clearInterval(this.state.intervalID);
    this.toggleClick();
    this.setState({
      running: false
    });
  };
  resetSim = () => {
    this.stopSim();
    this.newGrid();
  };
  newSim = () => {
    if(this.state.running){
      return;
    }
    this.toggleClick();
    const newArr = this.arrayCalc(this.state.curGrid);
    const lastArr = this.arrayCalc(newArr);
    this.setState(
      {
        running: true,
        nextGrid: newArr,
        afterNextGrid: lastArr
      },
      () => {
        this.waitTime();
      }
    );
  };
  setGrid = e => {
    this.resetSim();
    let gridCopy = [];
    for (let index = 0; index < this.state.x * this.state.y; index++) {
      gridCopy.push({ alive: false, color: "#ffffff", isClickable: true });
    }
    const middleX = Math.floor(this.state.x / 2);
    const middleY = Math.floor(this.state.y / 2);
    const fillin = { alive: true, color: "#000000", isClickable: true };

    switch (e.target.value) {
      case "random":
      gridCopy =  gridCopy.map(e=>{
        if(Math.random() >=.75){
          return Object.create(fillin);
        }
        return e;
      })
      this.setState({
        curGrid: gridCopy
      });
        break;
      case "block":
        gridCopy[middleY * this.state.x + middleX] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY - 1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY - 1) * this.state.x + 1 + middleX - 1] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
      case "beehive":
        gridCopy[(middleY - 1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY - 1) * this.state.x + 1 + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY + 1) * this.state.x - 1 + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY + 1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX - 2] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX + 1] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "loaf":
        gridCopy[(middleY - 1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY - 1) * this.state.x + 1 + middleX - 1] = Object.create(fillin);
     
        gridCopy[(middleY + 1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX - 2] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY+2) * this.state.x + middleX ] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "blinker":
        gridCopy[(middleY) * this.state.x + middleX ] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX - 1] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "toad":
        gridCopy[(middleY) * this.state.x + middleX ] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX - 2] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX - 1] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "beacon":
       
        gridCopy[(middleY) * this.state.x + middleX ] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +2] = Object.create(fillin);
        
        gridCopy[(middleY-1) * this.state.x + middleX + 1] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX - 1] = Object.create(fillin);
        gridCopy[(middleY-2) * this.state.x + middleX +2] = Object.create(fillin);
        
        gridCopy[(middleY-2) * this.state.x + middleX + 1] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "pulsar":
        if(this.state.x < 15 ||this.state.y < 15){
          console.log(`Not enough room`);
          break;
        }
        gridCopy[(middleY-2) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY-3) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY-4) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY-2) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY-3) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY-4) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY-2) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY-3) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY-4) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY-2) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY-3) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY-4) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX -2 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX -3 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX -4 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +2 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +3 ] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +4 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX -2 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX -3 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX -4 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX +2 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX +3 ] = Object.create(fillin);
        gridCopy[(middleY-6) * this.state.x + middleX +4 ] = Object.create(fillin);
        gridCopy[(middleY+2) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY+3) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY+4) * this.state.x + middleX -1 ] = Object.create(fillin);
        gridCopy[(middleY+2) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY+3) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY+4) * this.state.x + middleX -6 ] = Object.create(fillin);
        gridCopy[(middleY+2) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY+3) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY+4) * this.state.x + middleX +1 ] = Object.create(fillin);
        gridCopy[(middleY+2) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY+3) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY+4) * this.state.x + middleX +6 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -2 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -3 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -4 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +2 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +3 ] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +4 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX -2 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX -3 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX -4 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX +2 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX +3 ] = Object.create(fillin);
        gridCopy[(middleY+6) * this.state.x + middleX +4 ] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "pentadecathlon":
        if(this.state.x < 8||this.state.y < 16){
          console.log(`Not enough room`);
        }
        gridCopy[(middleY) * this.state.x + middleX] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX-1] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX-2] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX+1] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX+2] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX+2] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX-3] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX-3] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX-4] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX+3] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX-5] = Object.create(fillin);
        gridCopy[(middleY) * this.state.x + middleX+4] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "glider":
        gridCopy[0] = Object.create(fillin);
        gridCopy[this.state.y*2] = Object.create(fillin);
        gridCopy[this.state.y*2+1] = Object.create(fillin);
        gridCopy[this.state.y+1] = Object.create(fillin);
        gridCopy[this.state.y+2] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "lspaceship":
        gridCopy[0] = Object.create(fillin);
        gridCopy[3] = Object.create(fillin);
        gridCopy[this.state.y*2] = Object.create(fillin);
        gridCopy[this.state.y*3+1] = Object.create(fillin);
        gridCopy[this.state.y*3+2] = Object.create(fillin);
        gridCopy[this.state.y*3+3] = Object.create(fillin);
        gridCopy[this.state.y*3+4] = Object.create(fillin);
        gridCopy[this.state.y*2+4] = Object.create(fillin);
        gridCopy[this.state.y*1+4] = Object.create(fillin);

        this.setState({
          curGrid: gridCopy
        });
        break;
        case "r":
        gridCopy[middleY * this.state.x + middleX] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX -1] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +1] = Object.create(fillin);


        this.setState({
          curGrid: gridCopy
        });
        break;
        case "diehard":
        
        gridCopy[middleY * this.state.x + middleX -3] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -3] = Object.create(fillin);
        gridCopy[middleY * this.state.x + middleX -4] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +1] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +2] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +3] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX +2] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
        case "acorn":
        
        gridCopy[middleY * this.state.x + middleX] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -2] = Object.create(fillin);
        gridCopy[(middleY-1) * this.state.x + middleX -2] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX -3] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +1] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +2] = Object.create(fillin);
        gridCopy[(middleY+1) * this.state.x + middleX +3] = Object.create(fillin);
        this.setState({
          curGrid: gridCopy
        });
        break;
      
      default:
        break;
    }
  };
  toggleCell = e => {
    let newArr = [...this.state.curGrid];
    newArr[e.target.id].alive = !newArr[e.target.id].alive;
    if (newArr[e.target.id].alive) {
      newArr[e.target.id].color = "#000000";
    } else {
      newArr[e.target.id].color = "#ffffff";
    }
    this.setState({
      curGrid: newArr
    });
  };
  componentDidMount() {
    this.newGrid();
  }
  render() {
    return (
      <div className="App">
        <Grid
          pixels={this.state.curGrid}
          x={this.state.x}
          y={this.state.y}
          clickHandle={this.toggleCell}
        />
        <button onClick={this.newSim}>Start</button>

        <button onClick={this.stopSim}>Stop</button>
        <button onClick={this.resetSim}>Reset</button>

        <div className="gen">
          Current Gen is:
          {this.state.gen}
        </div>

        <select onChange={this.setGrid}>
          <option value="blank">User Defined</option>
          <option value="random">Random</option>
          <option value="block">Block</option>
          <option value="beehive">Beehive</option>
          <option value="loaf">Loaf</option>
          <option value="blinker">Blinker</option>
          <option value="toad">Toad</option>
          <option value="beacon">Beacon</option>
          <option value="pulsar">Pulsar</option>
          <option value="pentadecathlon">Pentadecathlon</option>
          <option value="glider">Glider</option>
          <option value="lspaceship">Lightweight Spaceship</option>
          <option value="r">R-Petominio</option>
          <option value="diehard">Diehard</option>
          <option value="acorn">Acorn</option>

        </select>
      </div>
    );
  }
}

export default App;
