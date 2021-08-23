import React, { Component } from 'react';
import { Main, GenerationSection } from './AppStyles';

import GridSection from './components/grid/GridSection';
import ControlSection from './components/controls/ControlSection';
import RulesSection from './components/rules/RulesSection';

import { cellInitAlgo, cellPresetAlgo, CellAlgo, clearCellsAlgo } from './CellAlgo';


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
    let nextNodeHolder = cellPresetAlgo(currentNodeHolder, e.target.value);
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
    let nextNodeHolder = CellAlgo(currentNodeHolder);
    this.setState(prevState => {
      return { currentNodeHolder: nextNodeHolder, generation: prevState.generation + 1 };
    });
  }

  endGame = () => {
    clearInterval(interval);
    this.setState({ canClick: true });
  }

  clearCells = () => {
    let currentNodeHolder = this.state.currentNodeHolder.slice();
    let nextNodeHolder = clearCellsAlgo(currentNodeHolder);
    this.setState({ currentNodeHolder: nextNodeHolder, generation: 0 });
  }

  render() {
    return (
      <Main>
        <h1>Conway's Game of Life</h1>
        <GridSection
          currentNodeHolder={this.state.currentNodeHolder}
          canClick={this.state.canClick}
        />
        <GenerationSection>
          <h2>Generation: {this.state.generation}</h2>
        </GenerationSection>
        <ControlSection 
          canClick={this.state.canClick}
          gridSizeValue={this.state.gridSizeValue}
          endGame={this.endGame}
          clearCells={this.clearCells}
          startGame={this.startGame}
          stepGeneration={this.stepGeneration}
          selectGridPreset={this.selectGridPreset}
          handleGridSizeChange={this.handleGridSizeChange}
        />
        <RulesSection />
      </Main>
    );
  }
}

export default App;
