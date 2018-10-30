import React, { Component } from "react";
import "./App.css";
import LifeCanvas from "./components/LifeCanvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <h3>by Vu Cao</h3>
        <LifeCanvas />
      </div>
    );
  }
}

export default App;
