import React from "react";
import logo from "./CONWAYFACE.png";
import "./App.css";
import AnimationTest from "./components/AnimationTest";
import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <div>
        <h1>Generation: X</h1>
        <AnimationTest width="700" height="700" />
      </div>
      <div className="presets"> z z z z</div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
