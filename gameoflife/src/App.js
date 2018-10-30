import React, { Component } from 'react';
import './App.css';
// import ReactCanvas from 'react-canvas';
import Grid from './Components/Grid';
import Presets from './Components/Presets';
import Buttons from './Components/Buttons';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Top">
          <Grid />
          <Presets />
        </div>
        <Buttons />
      </div>
    );
  }
}

export default App;
