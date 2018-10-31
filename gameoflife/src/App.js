import React, { Component } from 'react';
import './App.css';
import Grid from "./Components/Grid";
import Styled from 'styled-components';
import Rules from "./Components/Rules";
import About from "./Components/About";
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

const Container = Styled.div`
  display: flex;
  justify-content: space-between;
`;

const Gameboard = Styled.div `
  display: flex;
  margin: 50px 250px 0 0;
`;

const Head = Styled.h2 `
  text-align: center;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
`;

const Sidebar = Styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: orange;
  width: 20%;
  
`;

const Window = Styled.div `
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
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
      displayRules: false,
      displayAbout: false
    }
  }

  selectBox = (row, col) => {
    let grid = arrayClone(this.state.gridFull);
    grid[row][col] = !grid[row][col];
		this.setState({gridFull: grid});
  }

  toggleRules = () => {
    this.setState({displayRules: !this.state.displayRules})
  }

  toggleAbout = () => {
    this.setState({displayAbout: !this.state.displayAbout})
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
      <Window >
        <div style={{height: '100px', backgroundColor: 'orange'}}>
        <Head>Game of Life</Head>
        </div>
        <Container>
          <Sidebar>
          <ButtonContainer>
            <Button onClick={this.toggleRules}>
						  Rules
              {this.state.displayRules ? <Rules toggleRules={this.toggleRules}/> : null}
					  </Button>
            <Button onClick={this.toggleAbout}>
              About
              {this.state.displayAbout ? <About toggleAbout={this.toggleAbout}/> : null}
            </Button>
            </ButtonContainer>
            <div>Current: {this.state.currentGen}</div>
            <ButtonContainer>
              <Button onClick={this.startGame}>Start</Button>
              <Button onClick={this.stopGame}>Stop</Button>
              <Button onClick={this.clearGrid}>Clear</Button>
            </ButtonContainer>
          </Sidebar>
          

          <Gameboard>
            <Grid clearGrid={this.clearGrid}  
              cols={this.cols} 
              rows={this.rows}
              gridFull={this.state.gridFull}
              selectBox={this.selectBox}/>
          </Gameboard>
        </Container>
      </Window>
    );
  }

  
}

function arrayClone (arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
