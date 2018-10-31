import React, { Component } from 'react';
import '../styles/App.css';
import Board from './Board';
import Panel from './Panel';
import Header from './Header';

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
  handleClear = () => {this.setState({ clear: !this.state.clear, gens: 0, speed: 500 })};
  handleGen = () => {this.setState({ gens: this.state.gens+1 })}
  handleSpeed = (ms) => {this.setState({ speed: ms })}

  render() {
    return (
      <div className="App">
        <Header
          handleSpeed={this.handleSpeed}
        />
        <Board
          clear={this.state.clear}
          running={this.state.running}
          speed={this.state.speed}
          handleClear={this.handleClear}
          handleGen={this.handleGen}
        />
        <Panel
          gens={this.state.gens}
          speed={this.state.speed}
          toggleRun={this.toggleRun}
          handleClear={this.handleClear}
        />
        <div id="ruleModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Rules for the game...</p>
          </div>
        </div>
        <div id="algModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Algorithm info here...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// create modal for rules and algorithm desc
// figure out the generation counter
