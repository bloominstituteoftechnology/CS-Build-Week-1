import React, { Component } from 'react';
import GridSection from './components/grid/GridSection';
import ControlSection from './components/controls/ControlSection';
import { cellInitAlgo, cellPresetAlgo, CellAlgo, clearCellsAlgo } from './CellAlgo';

import { Main, MainHeader } from './AppStyles';

// grid section - dark bg and dead cells, neon dark cell borders for all cells
// neon bright alive cells
// 4:3 aspect ratio cells desktop, and more tower-like for mobile

// bottom section - controls, dark colors

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
        <MainHeader>
          <h1>Conway's Game of Life</h1>
        </MainHeader>
        <GridSection
          currentNodeHolder={this.state.currentNodeHolder}
          canClick={this.state.canClick}
          />
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
      </Main>
    );
  }
}

export default App;
