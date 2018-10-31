import React, { Component } from 'react';
import Game from './components/Game';
import Controls from './components/Controls';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faStepForward, faEraser, faQuestion } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add([faPlay, faStop, faStepForward, faEraser, faQuestion])

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      generationNumber: 0
    };
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div className="app">
        <Game />
        <Controls generationNumber={this.state.generationNumber} />
      </div>
    );
  }
}

export default App;
