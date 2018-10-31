import React, { Component } from 'react';
import './App.css';
import Grid from "./Components/Grid";
import Styled from 'styled-components';

const Container = Styled.div`
  display: flex;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  constructor(props){
    super(props);
    this.speed = 100;
    this.rows = 20;
    this.cols = 20;
    this.state = {
      currentGen: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let grid = arrayClone(this.state.gridFull);
    grid[row][col] = !grid[row][col];
		this.setState({gridFull: grid});
  }



  seedGrid = () => {
    let grid = arrayClone(this.state.gridFull);
    for(let i = 0; i < this.rows; i++) {
      for(let j=0; j< this.cols; j++) {
        if(Math.floor(Math.random() * 4) === 1) {
          grid[i][j] = true;
        }
      }
    }
    this.setState({gridFull: grid});
  }

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for(let i = 0; i < this.rows; i++) {
      for(let j=0; j< this.cols; j++) {
        let count = 0;
        if (i > 0) if(g[i-1][j]) count++;
        if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({gridFull: g2, currentGen: this.state.currentGen+1});
  }

  startGame = () => {
    console.log("started!")
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed)
    this.play();
  }

  stopGame =() => {
    console.log("stopped!")
    clearInterval(this.intervalId);
  }

  clearGrid = () => {
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({gridFull: grid, currentGen: 0})
  }

  componentDidMount() {
    //this.seedGrid();
    //this.startGame();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Game of Life</h2>
        </header>
        <Container>
          <Grid clearGrid={this.clearGrid}  
            cols={this.cols} 
            rows={this.rows}
            gridFull={this.state.gridFull}
            selectBox={this.selectBox}/>
          <ButtonContainer>
            <div>Current: {this.state.currentGen}</div>
            <Button onClick={this.startGame}>Start</Button>
            <Button onClick={this.stopGame}>Stop</Button>
            <Button onClick={this.clearGrid}>Clear</Button>
          </ButtonContainer>
        </Container>
      </div>
    );
  }

  
}

function arrayClone (arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
