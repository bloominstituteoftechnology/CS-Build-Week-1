import React, { Component } from 'react';
import '../styles/App.css';
import Board from './Board';
import Panel from './Panel';
import Header from './Header';
import Templates from './Templates';
import Algmodal from './Algmodal';
import Rulemodal from './Rulemodal';

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
        <Rulemodal
          handleRuleClose={this.handleRuleClose}
        />
        <Algmodal
          handleAlgClose={this.handleAlgClose}
        />
      </div>
    );
  }
}

export default App;

// figure out the generation counter
