import React, { Component } from "react";
import flower from "./flower.svg";
import "./App.css";
import Canvas from "./components/lifeCanvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={flower} className="App-logo" alt="logo" />
        </header>
        <Canvas />
      </div>
    );
  }
}

export default App;
