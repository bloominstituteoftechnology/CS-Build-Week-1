import React, { Component } from 'react';
import Board from './components/board';
import Control from './components/control';
import Counter from './components/counter';
import Learn from './components/learn';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: '',
    }
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
        <h1>Game of Life</h1>
        <div>
          <Learn/>
        </div>
        <Control 
          running={this.state.running}
          checkRunning={this.checkRunning}
        />
        <Board 
          running={this.state.running}
          checkRunning={this.checkRunning}
        />
        <Counter />
      </div>
    );
  }

  checkRunning = (e) => {
    e = this.state;
  }
}

export default App;