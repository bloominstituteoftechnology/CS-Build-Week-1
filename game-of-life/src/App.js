import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './gameComponents/LifeCanvas.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      generation:0
    }
  }
  render() {
    return (
      <div className="App">
        <LifeCanvas/>
        <p>Current generation: {this.state.generation}</p>
      </div>
    );
  }
}

export default App;
