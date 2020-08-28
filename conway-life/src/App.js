import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AnimationTest from "./components/AnimationTest";
import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  const { height, width } = useWindowDimensions();
  console.log(height, width);
  const [alert, setAlert] = useState("");
  const [cellSizePx, setCellSizePx] = useState(8);
  const [gameComponent, setGameComponent] = useState(
    <AnimationTest
      width={(width - 100) % 2 === 0 ? width - 100 : width - 99}
      height={
        Math.floor(height * 0.75) % 2 === 0
          ? Math.floor(height * 0.75)
          : Math.floor(height * 0.75) - 1
      }
      cellSizePx={cellSizePx}
      setCellSizePx={setCellSizePx}
      generations={300}
      setAlert={setAlert}
    />
  );
  let first = useRef(null);
  useEffect(() => {
    if (first.current !== null) {
      setGameComponent(
        <AnimationTest
          width={(width - 100) % 2 === 0 ? width - 100 : width - 99}
          height={
            Math.floor(height * 0.75) % 2 === 0
              ? Math.floor(height * 0.75)
              : Math.floor(height * 0.75) - 1
          }
          cellSizePx={cellSizePx}
          setCellSizePx={setCellSizePx}
          generations={300}
          setAlert={setAlert}
        />
      );
      console.log(cellSizePx);
    } else {
      console.log("first");
    }
  }, [cellSizePx, height, width]);

  return (
    <div className="App">
      <div className="gameContainer">
        <div className="alert">{alert}</div>
        {gameComponent}
      </div>
    </div>
  );
}

export default App;
