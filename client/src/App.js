import React from 'react';
import './App.css';
import Board from './Board';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Main App
        <Board />
      </div>
    );
  }
}

export default App;
