import React, { Component } from 'react';
import './App.css';
import Grid from "./components/grid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      game_running: false,
      gen_count: 0
    };
  }

  start_game = () => {
    if(!this.state.game_running) {
      this.setState({
        game_running: true,
      });
    }    
  }

  stop_game = () => {
    this.setState({
      game_running: false,
    });    
  }

  render() {
    console.log(this.state.game_running);
    return (
      <div className="App">
        <Grid game_running={this.state.game_running}/>
        <div className="headerButtons">
        <button className="submit" onClick={this.start_game}>Next</button>
            <button className="submit" onClick={this.start_game}>Start</button>
            <button className="submit" onClick={this.stop_game}>Stop</button>
          </div>
      </div>
    );
  }
}

export default App;
