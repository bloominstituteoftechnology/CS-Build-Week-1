import React, { Component } from "react";
import "./App.css";
import Grid from "./components/grid";

class App extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
      <div className="App">
        <Grid/>        
      </div>
    );
  }
}

export default App;
