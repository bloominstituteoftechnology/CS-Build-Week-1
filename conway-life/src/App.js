import React from "react";
import "./App.css";
import AnimationTest from "./components/AnimationTest";
// import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  // const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <div className="gameContainer">
        <AnimationTest
          width="900"
          height="900"
          cellSizePx={10}
          generations={300}
        />
      </div>
      <div className="presets"> z z z z</div>
    </div>
  );
}

export default App;
