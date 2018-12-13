import React, { Component } from 'react';
import GridSection from './components/HOC/GridSection';
import ControlSection from './components/HOC/ControlSection';
import { CellAlgo, cellPresetAlgo, cellInitAlgo } from './CellAlgo';
import './App.css';


let interval;

class App extends Component {
  state = {
    currentNodeHolder: [],
    canClick: true,
    generation: 0,
    gridSizeValue: 16
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    let nextNodeHolder = cellInitAlgo(this.state.gridSizeValue);
    this.setState({ currentNodeHolder: nextNodeHolder });
  }

  handleGridSizeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => {
      this.init();
    }, 0);
  }

  selectGridPreset = (e) => {
    let currentNodeHolder = this.state.currentNodeHolder.slice();
    let nextNodeHolder = cellPresetAlgo(currentNodeHolder, e.target.value)
    this.setState({ currentNodeHolder: nextNodeHolder });
  }

  stepGeneration = () => {
    this.playGame();
  }

  startGame = () => {
    this.setState({canClick: false});
    interval = setInterval(() => {
      this.playGame();
    }, 500);
  }

  playGame = () => {
    let currentNodeHolder = this.state.currentNodeHolder.slice();
    let nextNodeHolder = CellAlgo(currentNodeHolder)
    this.setState(prevState => {
      return { currentNodeHolder: nextNodeHolder, generation: prevState.generation + 1 };
    });
  }

  endGame = () => {
    clearInterval(interval);
    this.setState({ canClick: true });
  }

  clearCells = () => {
    let nextNodeHolder = this.state.currentNodeHolder.slice();

    for (let i = 0; i < nextNodeHolder.length; i++) {
      for (let j = 0; j < nextNodeHolder.length; j++) {
        if (nextNodeHolder[i][j].isAlive) {
          nextNodeHolder[i][j].isAlive = false;
        }
      }
    }
    
    this.setState({ currentNodeHolder: nextNodeHolder, generation: 0 });
  }

  render() {
    return (
      <main className="main-container">
        <GridSection
          currentNodeHolder={this.state.currentNodeHolder}
          canClick={this.state.canClick}
        />
        <hr/>
        <ControlSection 
          canClick={this.state.canClick}
          gridSizeValue={this.state.gridSizeValue}
          generation={this.state.generation}
          endGame={this.endGame}
          clearCells={this.clearCells}
          startGame={this.startGame}
          stepGeneration={this.stepGeneration}
          selectGridPreset={this.selectGridPreset}
          handleGridSizeChange={this.handleGridSizeChange}
        />
      </main>
    );
  }
}

export default App;
