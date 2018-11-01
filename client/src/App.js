import React, { Component } from 'react';
import './App.css';
import CellGrid from './components/cellgrid';

class App extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <div className="App">
        <CellGrid/>
      </div>
    );
  }
}

export default App;
