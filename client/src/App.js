import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Panel from './Panel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      clear: false,
      gens: 0,
      speed: 500
    }
  }

  toggleRun = () => {this.setState({ running: !this.state.running })};
  handleClear = () => {this.setState({ clear: !this.state.clear, gens: 0 })};
  handleGen = () => {this.setState({ gens: this.state.gens+1 })}
  handleSpeed = (ms) => {this.setState({ speed: ms })}

  render() {
    return (
      <div className="App">
        <div className='header'>
          <h1 className='title'>Conway's Game of Life</h1>
          <div className='icon' onClick={'Rules'}>Rules</div>
          <div className='button' onClick={() => this.handleSpeed(250)}>250 ms</div>
          <div className='button' onClick={() => this.handleSpeed(500)}>500 ms</div>
          <div className='button' onClick={() => this.handleSpeed(1000)}>1000 ms</div>
          <div className='icon' onClick={'Algorithm'}>Algorithm</div>
        </div>
        <Board
          clear={this.state.clear}
          running={this.state.running}
          speed={this.state.speed}
          handleClear={this.handleClear}
          handleGen={this.handleGen}
        />
        <Panel
          gens={this.state.gens}
          toggleRun={this.toggleRun}
          handleClear={this.handleClear}
        />
      </div>
    );
  }
}

export default App;
