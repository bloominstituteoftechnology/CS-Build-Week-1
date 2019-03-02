import React, { Component } from "react";

class Canvas extends Component {
  state = {
    simRun: true,
    cycleCount: 0,
    runSpeed: 800
  };

  gridState = () => {
    for (let i = 0; i < 375; i += 25) {
      for (let j = 0; j < 375; j += 25) {
        this.setState({ [`${i / 25},${j / 25}`]: "deadite" });
      }
    }
  };

  handleClick = e => {
    if (!this.handleTimer) {
      const canvo = this.refs.canvas;
      const ctx = canvo.getContext("2d");
      const pos = canvo.getBoundingClientRect();
      const squareSize = 25;
      ctx.fillStyle = "#F39C12";
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
        e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
        squareSize,
        squareSize
      );
      let tempX = (e.clientX - pos.x - ((e.clientX - pos.x) % squareSize)) / 25;
      let tempY = (e.clientY - pos.y - ((e.clientY - pos.y) % squareSize)) / 25;
      let selectedCell = `${tempX},${tempY}`;
      this.setState({ [`${selectedCell}`]: "living" });
    } else {
      console.log("Grid is not interactive while simulation is running");
    }
  };

  handleDoubleClick = e => {
    if (this.state.simRun === false) {
      const canvo = this.refs.canvas;
      const ctx = canvo.getContext("2d");
      const pos = canvo.getBoundingClientRect();
      const squareSize = 25;
      let xStart = e.clientX - pos.x - ((e.clientX - pos.x) % squareSize);
      let yStart = e.clientY - pos.y - ((e.clientY - pos.y) % squareSize);
      ctx.clearRect(xStart, yStart, squareSize, squareSize);
      ctx.strokeRect(xStart, yStart, squareSize, squareSize);
      // ctx.strokeStyle = 'rgba(111, 111, 111, 0.8)';
      let tempCoord = `${(e.clientX -
        pos.x -
        ((e.clientX - pos.x) % squareSize)) /
        25},${(e.clientY - pos.y - ((e.clientY - pos.y) % squareSize)) / 25}`;
      this.setState({ [`${tempCoord}`]: "deadite" });
    } else {
      console.log("Grid is not interactive while simulation is running");
    }
  };

  simulationToggle = e => {
    this.setState({ simRun: !this.state.simRun });
  };

  clearCanvas = e => {
    this.pauseGame();
    this.setState({ simRun: false, cycleCount: 0 });
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.initCanvas();
    this.gridState();
  };

  initCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = 375;
    ctx.canvas.height = 375;
    ctx.strokeStyle = "rgba(444, 444, 444, 0.8)";
    ctx.fillStyle = "#041180";
    ctx.fillRect(0, 0, 375, 375);
    for (let x = 0; x <= 375; x += 25) {
      for (let y = 0; y <= 375; y += 25) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 375);
        ctx.moveTo(0, y);
        ctx.lineTo(375, y);
        ctx.stroke();
      }
    }
  };

  updateCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const squareSize = 25;
    for (let item in this.state) {
      let xVal = parseInt(item.substring(0, item.indexOf(",")));
      let yVal = parseInt(item.substring(item.indexOf(",") + 1));
      if (this.state[item] === "deadite") {
        ctx.clearRect(xVal * 25, yVal * 25, squareSize, squareSize);
        // ctx.strokeStyle = "#7D3C98";
        ctx.strokeStyle = "rgba(444, 444, 444, 0.8)";
        ctx.strokeRect(xVal * 25, yVal * 25, squareSize, squareSize);
        // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        // ctx.fillRect(xVal * 25, yVal * 25, squareSize, squareSize);
        // ctx.strokeRect(xVal * 25, yVal * 25, squareSize, squareSize);
      } else if (this.state[item] === "living") {
        ctx.fillStyle = "#F39C12";
        ctx.fillRect(xVal * 25, yVal * 25, squareSize, squareSize);
      }
    }
  };

  gameCycle = () => {
    if (this.state.simRun) {
      let stateBuffer = { ...this.state };
      for (let x = 0; x <= 375; x += 25) {
        for (let y = 0; y <= 375; y += 25) {
          let LNC = 0;
          let topLeftN = `${x / 25 - 1},${y / 25 - 1}`;
          let topN = `${x / 25},${y / 25 - 1}`;
          let topRightN = `${x / 25 + 1},${y / 25 - 1}`;
          let leftN = `${x / 25 - 1},${y / 25}`;
          let rightN = `${x / 25 + 1},${y / 25}`;
          let botLeftN = `${x / 25 - 1},${y / 25 + 1}`;
          let botN = `${x / 25},${y / 25 + 1}`;
          let botRightN = `${x / 25 + 1},${y / 25 + 1}`;
          if (this.state[topLeftN] === "living") {
            ++LNC;
          }
          if (this.state[topN] === "living") {
            ++LNC;
          }
          if (this.state[topRightN] === "living") {
            ++LNC;
          }
          if (this.state[leftN] === "living") {
            ++LNC;
          }
          if (this.state[rightN] === "living") {
            ++LNC;
          }
          if (this.state[botLeftN] === "living") {
            ++LNC;
          }
          if (this.state[botN] === "living") {
            ++LNC;
          }
          if (this.state[botRightN] === "living") {
            ++LNC;
          }
          let tempCell = `${x / 25},${y / 25}`;
          if (this.state[tempCell] === "living" && LNC > 3) {
            stateBuffer[tempCell] = "deadite";
          } else if (this.state[tempCell] === "living" && LNC < 2) {
            stateBuffer[tempCell] = "deadite";
          } else if (this.state[tempCell] === "deadite" && LNC === 3) {
            stateBuffer[tempCell] = "living";
          }
        }
      }
      let cycleCountTemp = this.state.cycleCount;
      cycleCountTemp++;
      this.setState({ ...stateBuffer, cycleCount: cycleCountTemp });
      this.updateCanvas();
    }
  };

  pauseGame = () => {
    this.setState({ simRun: false });
    if (this.handleTimer) {
      window.clearTimeout(this.handleTimer);
      this.handleTimer = null;
    }
  };

  runSimulation = () => {
    this.setState({ simRun: true });
    this.gameCycle();
    this.handleTimer = window.setTimeout(() => {
      this.runSimulation();
    }, this.state.runSpeed);
  };

  stepOnce = () => {
    this.setState({ simRun: true });
    this.timer = window.setTimeout(() => {
      this.gameCycle();
    }, 250);

    // this.setState({simRun: false});
  };

  componentDidMount() {
    this.gridState();
    this.initCanvas();
  }

  slow = () => {
    // console.log('test');
    this.setState({ runSpeed: 1100 });
  };

  fast = () => {
    // console.log('test');
    this.setState({ runSpeed: 375 });
  };

  pulsar = () => {
    this.clearCanvas();
    this.setState({
      "0,10": "living",
      "0,4": "living",
      "1,10": "living",
      "1,4": "living",
      "10,0": "living",
      "10,1": "living",
      "10,12": "living",
      "10,13": "living",
      "10,14": "living",
      "10,2": "living",
      "10,5": "living",
      "10,6": "living",
      "10,8": "living",
      "10,9": "living",
      "12,10": "living",
      "12,4": "living",
      "12,5": "living",
      "12,9": "living",
      "13,10": "living",
      "13,4": "living",
      "14,10": "living",
      "14,4": "living",
      "2,10": "living",
      "2,4": "living",
      "2,5": "living",
      "2,9": "living",
      "4,0": "living",
      "4,1": "living",
      "4,12": "living",
      "4,13": "living",
      "4,14": "living",
      "4,2": "living",
      "4,5": "living",
      "4,6": "living",
      "4,8": "living",
      "4,9": "living",
      "5,10": "living",
      "5,12": "living",
      "5,2": "living",
      "5,4": "living",
      "5,6": "living",
      "5,8": "living",
      "6,10": "living",
      "6,4": "living",
      "6,5": "living",
      "6,9": "living",
      "8,10": "living",
      "8,4": "living",
      "8,5": "living",
      "8,9": "living",
      "9,10": "living",
      "9,12": "living",
      "9,2": "living",
      "9,4": "living",
      "9,6": "living",
      "9,8": "living"
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    }, 500);
  };

  toad = () => {
    this.clearCanvas();
    this.setState({
      "5,6": "living",
      "6,6": "living",
      "7,6": "living",
      "6,5": "living",
      "7,5": "living",
      "8,5": "living"
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    });
  };

  beacon = () => {
    this.clearCanvas();
    this.setState({
      "5,4": "living",
      "6,4": "living",
      "5,5": "living",
      "8,6": "living",
      "7,7": "living",
      "8,7": "living"
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    });
  };

  render() {
    return (
      <div className="GameOfLife">
        <h2>Conway's Game of Life</h2>
        <div className="top-contain">
          <div className="canvas">
            <p>Generation: {this.state.cycleCount}</p>
            <canvas
              className="canvas-grid"
              ref="canvas"
              onClick={this.handleClick}
              onDoubleClick={this.handleDoubleClick}
            />
            <div className="controls">
              <button className="button" onClick={this.runSimulation}>
                Start
              </button>
              <button className="button" onClick={this.pauseGame}>
                Stop{" "}
              </button>
              <button className="button" onClick={this.clearCanvas}>
                Clear Board
              </button>
              <button className="button" onClick={this.stepOnce}>
                Step
              </button>
            </div>
            <p>Sample Configurations</p>
            <div>
              <button className="button" onClick={this.pulsar}>
                Pulsar
              </button>
              <button className="button" onClick={this.toad}>
                Toad
              </button>
              <button className="button" onClick={this.beacon}>
                Beacon
              </button>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="slow"
                name="speed"
                value="slow"
                onClick={this.slow}
                className="radio"
              />
              <label>slow</label>
              <input
                type="radio"
                id="fast"
                name="speed"
                value="fast"
                onClick={this.fast}
                className="radio"
              />
              <label>fast</label>
            </div>
          </div>
          <div className="rules">
            <h3>RULES</h3>
            <p>>> Any live cell with fewer than two live neighbors dies</p>
            <p>>> Any live cell with two or three live neighbors lives on</p>
            <p>>> Any live cell with more than three live neighbors dies</p>
            <p>
              >> Any dead cell with exactly three live neighbors becomes a live
              cell
            </p>
            {/* <h3>History</h3>
            <p>
              The game made its first public appearance in a 1970 issue of
              Scientific American. Since then, it has attracted plenty of
              interest due in part because of the vast ways the patterns can
              evolve. The game has been used by scientists to illustrate the
              possible evolution of complex contructs. The game's "popularity"
              was bolstered by its appearance just as computer access became
              more prevalent and affordable.
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
