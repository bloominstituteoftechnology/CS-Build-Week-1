import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import Grid from './Grid';
import G from './G';

class App extends Component {
  constructor() {
    super();
    this.speed = 100
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
    
    componentDidMount(){
      this.random();
    }
    
    
  render() {
    return (
      <div>
        <G 
        gridFull={this.state.gridFull}
        rows={this.rows}
        cols={this.cols}
        selectCell={this.selectCell}
        />
        <h2>Gens: {this.state.gen}</h2>
      </div>
    );
  }
}
function arrayClone(arr){//for nested array
  return JSON.parse(JSON.stringify(arr));
};

export default App;
