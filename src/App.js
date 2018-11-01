import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Buttons from './Buttons';

// import Grid from './Grid';
import G from './G';

class App extends Component {
  constructor() {
    super();
    this.speed = 300
    this.rows = 30
    this.cols = 50
    this.state = {
        gen: 0,
        // gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
      }
    }
    
    
    selectCell = (row, col) => {
      let gridCopy = arrayClone(this.state.gridFull);
      // let gridCopy = this.state.gridFull.slice();
      console.log(row,col)
      console.log(gridCopy)
      gridCopy[row][col] = !gridCopy[row][col];
      this.setState({
        gridFull: gridCopy
      });
    }

    random = () => {
      let gridCopy = arrayClone(this.state.gridFull);
      for(let i = 0; i < this.rows; i++) {
        for(let j = 0; j<this.cols; j++) {
          if (Math.floor(Math.random() * 5) ===1){//when random number 1-5 =1 cell alive
            gridCopy[i][j] = true;
          }
        }
      }
      
      this.setState({
        gridFull: gridCopy

      });
    }
    x = () => {
      let gridCopy = arrayClone(this.state.gridFull);
      for(let i = 0; i < this.rows; i++) {
        for(let j = 0; j<this.cols; j++) {
          
            gridCopy[12][25] = true;
            gridCopy[12][20] = true;
            gridCopy[11][26] = true;
            gridCopy[11][19] = true;
            gridCopy[10][27] = true;
            gridCopy[10][18] = true;
            gridCopy[18][26] = true;
            gridCopy[13][21] = true;
            gridCopy[13][24] = true;
            gridCopy[14][23] = true;
            gridCopy[15][22] = true;
            gridCopy[16][21] = true;
            gridCopy[17][20] = true;
            gridCopy[14][22] = true;
            gridCopy[15][23] = true;
            gridCopy[16][24] = true;
            gridCopy[17][25] = true;
            gridCopy[19][27] = true;
            gridCopy[19][18] = true;

            gridCopy[19][32] = true;
            gridCopy[19][34] = true;
            gridCopy[18][34] = true;
            gridCopy[17][36] = true;
            gridCopy[16][36] = true;
            gridCopy[15][36] = true;
            gridCopy[16][38] = true;
            gridCopy[14][38] = true;
            gridCopy[15][39] = true;
            gridCopy[15][38] = true;
            
          }
        }
      
      this.setState({
        gridFull: gridCopy

      });
    }

    g15 = () =>{
      this.cols= 15;
      this.rows=15;
      this.handleClearBtn();
    } 
    
    handlePlayBtn = () => {
      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.handlePlay, this.speed);
    }
    slow = () => {
      this.speed = 1000;
      this.handlePlayBtn()
    }
    fast = () => {
      this.speed = 100;
      this.handlePlayBtn()
    }
    handlePauseBtn = () => {
      clearInterval(this.intervalId)
    }
    handleClearBtn = () => {
      var clr = Array(this.rows).fill(Array(this.cols).fill(false));
      this.setState({
        gridFull: clr,
        gen:0
      })
    }
    handlePlay = () => {
      let currentg = this.state.gridFull;
      let nextg = arrayClone(this.state.gridFull);
  
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0;
          if (i > 0) if (currentg[i - 1][j]) count++;
          if (i > 0 && j > 0) if (currentg[i - 1][j - 1]) count++;
          if (i > 0 && j < this.cols - 1) if (currentg[i - 1][j + 1]) count++;
          if (j < this.cols - 1) if (currentg[i][j + 1]) count++;
          if (j > 0) if (currentg[i][j - 1]) count++;
          if (i < this.rows - 1) if (currentg[i + 1][j]) count++;
          if (i < this.rows - 1 && j > 0) if (currentg[i + 1][j - 1]) count++;
          if (i < this.rows - 1 && j < this.cols - 1) if (currentg[i + 1][j + 1]) count++;
          if (currentg[i][j] && (count < 2 || count > 3)) nextg[i][j] = false;
          if (!currentg[i][j] && count === 3) nextg[i][j] = true;
        }
      }
      this.setState({
        gridFull: nextg,
        gen: this.state.gen + 1
      });
  
    }
    
     
    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    
    componentDidMount(){
      this.x();
      // this.handlePlayBtn();
    }
    
    
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <h2>Gens: {this.state.gen}</h2>
        
        <G 
        gridFull={this.state.gridFull}
        rows={this.rows}
        cols={this.cols}
        selectCell={this.selectCell}
        />
        <Buttons 
        handlePlayBtn={this.handlePlayBtn}
        handlePauseBtn={this.handlePauseBtn}
        handleClearBtn={this.handleClearBtn}
        random={this.random}
        slow={this.slow}
        fast={this.fast}
        g15={this.g15}
        />
        <h3>Click a cell to make it live, click again to make it dead.</h3>
        <h1>Rules</h1>
        <h3>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</h3>
        <h3>Any live cell with two or three live neighbors lives on to the next generation.</h3>
        <h3>Any live cell with more than three live neighbors dies, as if by overpopulation.</h3>
        <h3>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</h3>
        
      </div>
    );
  }
}
function arrayClone(arr){//for nested array
  return JSON.parse(JSON.stringify(arr));
};

export default App;
