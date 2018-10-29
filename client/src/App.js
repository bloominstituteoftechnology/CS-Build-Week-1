import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CellGrid from './components/cellgrid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CellGrid></CellGrid>
      </div>
    );
  }
}

export default App;
