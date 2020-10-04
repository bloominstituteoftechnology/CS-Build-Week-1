import React, { useState } from "react";
import "./App.css";
import ConwayGame from "./components/ConwayGame";
import useWindowDimensions from "./hooks/getWindowDimensions";

function App() {
  const { height, width } = useWindowDimensions();
  const [alert, setAlert] = useState("");
  let pixelSize;
  if (width > 1000) {
    pixelSize = 8;
  } else {
    pixelSize = 4;
  }
  console.log(pixelSize);
  const [cellSizePx, setCellSizePx] = useState(pixelSize);
  const [gameComponent] = useState(
    <ConwayGame
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

  return (
    <div className="App">
      <div className="gameContainer">
        <div className="alerts">{alert}</div>
        {gameComponent}
      </div>
    </div>
  );
}

export default App;
