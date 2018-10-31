import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CellGrid from './components/cellgrid';

class App extends Component {
  state = {
    simActive: false,
    generation: 0
  }

  startSim() {
    if(!this.state.simActive)
    this.setState({simActive: true});
  }

  stopSim() {
    this.setState({simActive: false});
  }

  upGeneration() {
    let generationplus = this.state.generation;
    generationplus++;
    this.setState({generation: generationplus});
  }

  render() {
    return (
      <div className="App">
        <CellGrid upGeneration={this.upGeneration} simActive={this.state.simActive}/>
        <button onClick={() => this.startSim()}>Start Simulation </button>
      </div>
    );
  }
}

export default App;
