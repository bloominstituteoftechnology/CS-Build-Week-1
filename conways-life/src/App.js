import React, { Component } from "react";

import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LifeCanvas from "./components/LifeCanvas";
import "./App.css";
import arrayClone from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.speed = 1;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false)),
      isPlaying: false,
      dropdownOpen: false,
      dropdownOpen2: false
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  toggle2 = () => {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  };
  selectBox = (row, col) => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[row][col] = !gridCopy[row][col];
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot select cell!");
    }
  };

  seedGame = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  gliderGun = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[5][1] = true;
      gridCopy[6][1] = true;
      gridCopy[5][2] = true;
      gridCopy[6][2] = true;
      gridCopy[5][11] = true;
      gridCopy[6][11] = true;
      gridCopy[7][11] = true;
      gridCopy[4][12] = true;
      gridCopy[8][12] = true;
      gridCopy[3][13] = true;
      gridCopy[9][13] = true;
      gridCopy[3][14] = true;
      gridCopy[9][14] = true;
      gridCopy[6][15] = true;
      gridCopy[4][16] = true;
      gridCopy[8][16] = true;
      gridCopy[5][17] = true;
      gridCopy[6][17] = true;
      gridCopy[7][17] = true;
      gridCopy[6][18] = true;
      gridCopy[3][21] = true;
      gridCopy[4][21] = true;
      gridCopy[5][21] = true;
      gridCopy[3][22] = true;
      gridCopy[4][22] = true;
      gridCopy[5][22] = true;
      gridCopy[2][23] = true;
      gridCopy[6][23] = true;
      gridCopy[1][25] = true;
      gridCopy[2][25] = true;
      gridCopy[6][25] = true;
      gridCopy[7][25] = true;
      gridCopy[3][35] = true;
      gridCopy[4][35] = true;
      gridCopy[3][36] = true;
      gridCopy[4][36] = true;
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  acorn = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[13][19] = true;
      gridCopy[13][20] = true;
      gridCopy[11][20] = true;
      gridCopy[12][22] = true;
      gridCopy[13][23] = true;
      gridCopy[13][24] = true;
      gridCopy[13][25] = true;
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  gridSmall = () => {
    this.rows = 20;
    this.cols = 40;
    this.clearButton();
  }

  gridLarge = () => {
    this.rows = 30;
    this.cols = 50;
    this.clearButton();
  }
  
  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playGame, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slowButton = () => {
    this.speed = 800;
    this.playButton();
  };

  fastButton = () => {
    this.speed = 1;
    this.playButton();
  };

  clearButton = () => {
    clearInterval(this.intervalId);
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    this.setState({
      gridFull: gridCopy,
      generation: 0,
      isPlaying: false
    });
  };

  playGame = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        //checking each neighbor
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      isPlaying: true,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seedGame();
  }

  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <LifeCanvas
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <h2>
          Generations:<div className="innerbox">{this.state.generation}</div>
        </h2>
        <ButtonGroup className="buttons">
          <Button onClick={this.playButton}>Play</Button>
          <Button onClick={this.pauseButton}>Pause</Button>
          <Button onClick={this.clearButton}>Clear</Button>
          <Button onClick={this.seedGame}>Seed</Button>
          <Button onClick={this.slowButton}>Slow</Button>
          <Button onClick={this.fastButton}>Fast</Button>
          <ButtonDropdown
            className="dropup"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Patterns</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.gliderGun}>Glider Gun</DropdownItem>
              <DropdownItem onClick={this.acorn}>Acorn</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown
            className="dropup"
            isOpen={this.state.dropdownOpen2}
            toggle={this.toggle2}
          >
            <DropdownToggle caret>Size</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.gridSmall}>Small</DropdownItem>
              <DropdownItem onClick={this.gridLarge}>Large</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }
}

export default App;
