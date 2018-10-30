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
      gens: 0
    }
  }

  toggleRun = () => {this.setState({ running: !this.state.running })};
  handleClear = () => {this.setState({ clear: !this.state.clear, gens: 0 })};
  handleGen = () => {this.setState({ gens: this.state.gens+1 })}

  render() {
    return (
      <div className="App">
        Main App
        <Board
          clear={this.state.clear}
          running={this.state.running}
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
