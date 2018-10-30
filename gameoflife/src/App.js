import React, { Component } from 'react';
import './App.css';
import ButtonContainer from './components/ButtonContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="display-4">
            Conway's Game of Life
          </p>
        </header>
        <ButtonContainer />
      </div>
    );
  }
}

export default App;
