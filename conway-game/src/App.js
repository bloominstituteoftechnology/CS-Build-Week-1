import React, { Component } from "react";

import "./App.css";
import GridLayout from "./components/GridLayout";
import ActionButtons from "./components/ActionButtons";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="heading">The Game of Life</h1>
        <GridLayout />
        <ActionButtons />
      </div>
    );
  }
}

export default App;
