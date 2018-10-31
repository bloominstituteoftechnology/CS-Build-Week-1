import React, { Component } from 'react';
import Game from './components/Game';
import Controls from './components/Controls';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faStepForward, faEraser, faQuestion } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add([faPlay, faStop, faStepForward, faEraser, faQuestion])

class App extends Component {
  render() {
    return (
      <div className="app">
        <Game />
        <Controls />
      </div>
    );
  }
}

export default App;
