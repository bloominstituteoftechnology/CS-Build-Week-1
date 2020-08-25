import React, { useState } from "react";
import "./App.css";

const numRows = 100;
const numCols = 100;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array(numCols).fill(0));
    }
    return rows;
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols},20px)`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? "black" : "white",
              border: "solid 1px black",
            }}
          ></div>
        ))
      )}
    </div>
  );
}

export default App;
