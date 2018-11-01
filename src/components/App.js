import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStop,
  faRandom
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./Layout/Layout";

library.add(faPlay, faPause, faStop, faRandom);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
