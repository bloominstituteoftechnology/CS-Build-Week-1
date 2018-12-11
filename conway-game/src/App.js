import React, { Component } from 'react';

import './App.css';
import GridLayout from './components/GridLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className = "heading">The Game of Life</h1>
        <GridLayout />
        {/* Component that holds all the buttons */}
      </div>
    );
  }
}

export default App;
