import React, { Component } from 'react';
import './App.css';

// components
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Conway's Game of Life" />
      </div>
    );
  }
}

export default App;
