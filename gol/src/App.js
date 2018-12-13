import React, { Component } from 'react';
import './App.css';
import Grid from './Components/Grid';
import RulesModal from './Components/RulesModal';
import HistoryModal from './Components/HistoryModal';

class App extends Component {
  render() {
    return (
      <div className="App">
      <RulesModal />
      <HistoryModal />
        <Grid />
      </div>
    );
  }
}

export default App;
