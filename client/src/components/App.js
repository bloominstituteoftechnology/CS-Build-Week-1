import React, { Component } from 'react';
import '../styles/App.css';
import Board from './Board';
import Panel from './Panel';
import Header from './Header';
import Templates from './Templates';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      clear: false,
      gens: 0,
      speed: 500,
      template: ''
    }
  }

  toggleRun = () => {this.setState({ running: !this.state.running })};
  handleClear = () => {this.setState({ clear: !this.state.clear, gens: 0, speed: 500, template: '' })};
  handleGen = () => {this.setState({ gens: this.state.gens+1 })}
  handleSpeed = (ms) => {this.setState({ speed: ms })}
  handleRules = () => {document.getElementById('ruleModal').style.display = "block"};
  handleAlgHist = () => {document.getElementById('algModal').style.display = "block"};
  handleRuleClose = () => {document.getElementById('ruleModal').style.display = "none"};
  handleAlgClose = () => {document.getElementById('algModal').style.display = "none"};
  handleTemplate = (template) => {this.setState({ template })}
  handleStopTem = () => {this.setState({ template: '' })}

  render() {
    return (
      <div className="App">
        <Header
          handleSpeed={this.handleSpeed}
          handleRules={this.handleRules}
          handleAlgHist={this.handleAlgHist}
        />
        <Board
          clear={this.state.clear}
          running={this.state.running}
          speed={this.state.speed}
          template={this.state.template}
          handleClear={this.handleClear}
          handleGen={this.handleGen}
          handleStopTem={this.handleStopTem}
        />
        <Panel
          gens={this.state.gens}
          speed={this.state.speed}
          toggleRun={this.toggleRun}
          handleClear={this.handleClear}
        />
        <Templates
          handleTemplate={this.handleTemplate}
        />
        <div id="ruleModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.handleRuleClose}>&times;</span>
            <h1>Game of life Rules:</h1>
            <ol>
              <li>1. Any LIVE cell with fewer than two live neighbors dies, as if by underpopulation.</li>
              <li>2. Any LIVE cell with two or three live neighbors lives on to the next generation.</li>
              <li>3. Any LIVE cell with more than three live neighbors dies, as if by overpopulation.</li>
              <li>4. Any DEAD cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
            </ol>
            <h1>Controls:</h1>
            <p>Choose a figure from the templates below or make your own by click on a cell. The start/stop button 
              advances the cells generation(based off an iteration of the rules). Game speed can be controlled from 
              the buttons in the panel below.
            </p>
          </div>
        </div>
        <div id="algModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.handleAlgClose}>&times;</span>
            <p>Describe more about Conway’s “Game of Life”, such as whether or not it is Turing Complete or the 
              history of this cellular automaton. TODO
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// create modal for rules and algorithm desc
// figure out the generation counter
