import React, { Component } from "react";
import "./App.css";
import Life from "./Life";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>~Conway's Game of Life~</h1>
        <Life />
      </div>
    );
  }
}

export default App;
