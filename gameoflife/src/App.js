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
    this.rows= 30;
    this.columns=50;
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
          />
          <Presets />
        </div>
        <Buttons />
      </div>
    );
  }
}

export default App;
