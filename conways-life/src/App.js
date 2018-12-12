import React, { Component } from 'react';
import GridDisplay from './components/GridDisplay';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GridDisplay />
        <About />
      </div>
    );
  }
}

export default App;
