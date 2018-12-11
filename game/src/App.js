import React, { Component } from 'react';
import './App.css';
import Grid from "./components/grid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      game_running: false
    };
  }

  start_game() {
    if(!this.state.game_running) {
      this.setState({
        game_running: true,
      });
    }
  }

  stop_game() {
    this.setState({
      game_running: false,
    })
  }

  render() {
    return (
      <div className="App">
        <Grid/>
        <div className="headerButtons">
            <button className="submit" onClick={this.startGame}>Start</button>
            <button className="submit" onClick={this.stopGame}>Stop</button>
          </div>
      </div>
    );
  }
}

export default App;
