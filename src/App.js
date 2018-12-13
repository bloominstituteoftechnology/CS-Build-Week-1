import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// pages
import Header from "./components/pages/Header";
import About from "./components/pages/About";
import Credits from "./components/pages/Credits";
import { PageNotFound } from "./components/pages/PageNotFound";
import Game from "./components/game/Game";

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Conway's Game of Life" />
        <Switch>
          <Route exact path="/" render={props => <Game {...props} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/credits" component={Credits} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
