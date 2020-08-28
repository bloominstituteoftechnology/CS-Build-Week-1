import React from "react";
import logo from "./CONWAYFACE.png";
import "./App.css";
import AnimationTest from "./components/AnimationTest";
import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  // const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <div>
        <AnimationTest
          width="650"
          height="650"
          cellSizePx={30}
          generations={300}
        />
      </div>
      <div className="presets"> z z z z</div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
