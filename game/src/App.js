import React, { Component } from "react";
import "./App.css";
import LifeCanvas from "./components/LifeCanvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conways's Game of Life</h1>
        <LifeCanvas />
      </div>
    );
  }
}

export default App;
