import React from "react";
import logo from "./CONWAYFACE.png";
import "./App.css";
import AnimationTest from "./components/AnimationTest";
import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <header className="App-header">
        <AnimationTest width="900" height="900" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>cONWAYGAME zzzzz</p>
        fefef
      </header>
    </div>
  );
}

export default App;
