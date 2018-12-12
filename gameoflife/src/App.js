import React, { Component } from "react";
import "./App.css";
import GridContainer from "./components/gridContainer";
import Details from "./components/details";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="banner">
          <div className="game-title">Game of Life by Vance Leon</div>
          <Details />
        </div>
        <div className="game-container">
          <GridContainer />
          <div className="buttons-container">
            <div className="button">RUN</div>
            <div className="button">STOP</div>
            <div className="button">CLEAR</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
