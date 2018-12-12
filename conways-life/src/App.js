import React, { Component } from 'react';
import GridDisplay from './components/GridDisplay';
import Rules from './components/Rules';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Conway's Game of Life</h2>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">Read more about the Game of Life</a>
        <GridDisplay />
        <Rules />
      </div>
    );
  }
}

export default App;
