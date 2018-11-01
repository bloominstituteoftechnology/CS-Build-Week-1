import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import Intro from "./components/Intro";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Intro} />
        <Route exact path="/board" component={Board} />
      </div>
    );
  }
}

export default App;
