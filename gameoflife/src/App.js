import React, { Component } from 'react';
import './App.css';
// import ReactCanvas from 'react-canvas';
import Grid from './Components/Grid';
import Presets from './Components/Presets';
import Buttons from './Components/Buttons';
class App extends Component {
  constructor() {
    super();
    this.speed= 100;
    this.rows= 20;
    this.columns=20;
    this.state={
      generation:0,
      gridFull: Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
    }
  }

  selectBox= (rows,columns) => {
    let gridCopy= arrayClone(this.state.gridFull);
    gridCopy[rows][columns] = !gridCopy[rows][columns];
    this.setState({
      gridFull:gridCopy
    })
  }

  clear= () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
  }

  randomize= (clear) => {
    //this.clear();
    let gridCopy =arrayClone(this.state.gridFull);
    for (let i =0; i<this.rows; i++) {
      for (let j=0; j<this.columns; j++) {
        if (Math.floor(Math.random()*4)===1) {
          gridCopy[i][j]= true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Top">
          <Grid 
            gridFull={this.state.gridFull}
            rows={this.rows}
            columns={this.columns} 
            selectBox={this.selectBox}
          />
          <Presets
            randomize={this.randomize}
          />
        </div>
        <Buttons 
          clear=  {this.clear}
        />
        <h2> Generations: {this.state.generation} </h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
