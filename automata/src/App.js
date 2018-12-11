import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/lifeCanvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Canvas />
        </header>
      </div>
    );
  }
}

export default App;
