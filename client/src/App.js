import React from 'react';
import './App.css';
import Board from './Board';
import Panel from './Panel';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Main App
        <Board />
        <Panel />
      </div>
    );
  }
}

export default App;
