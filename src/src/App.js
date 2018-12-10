import React, { Component } from 'react';

import Grid from './Grid'
import ContentBar from "./ContentBar";

import './App.css';
import './ContentBar.css'

class App extends Component {
  render() {
    return (
      <div className="App">
       <ContentBar />
       <Grid />
      </div>
    );
  }
}

export default App;
