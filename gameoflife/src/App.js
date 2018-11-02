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
          <Presets />
        </div>
        <Buttons />
        <h2> Generations: {this.state.generation} </h2>
      </div>
    );
  }
}

export default App;
