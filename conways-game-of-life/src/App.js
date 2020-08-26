import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";

const numRows = 100;
const numCols = 100;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [-1, 0],
];

const setDefaultGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols).fill(0));
  }
  return rows;
};
function App() {
  const [grid, setGrid] = useState(() => {
    return setDefaultGrid();
  });
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;

  const generator = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setCount((count) => (count += 1));
    setGrid((g) => {
      return produce(g, (producedgrid) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            }); //end of for each
            if (neighbors < 2 || neighbors > 3) {
              producedgrid[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              producedgrid[i][j] = 1;
            }
          } //end of second for loop
        } //end of first for loop
      }); //end of produce
    }); //end of the setgrid;

    setTimeout(generator, 100);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            generator();
          }
        }}
      >
        {running ? "Pause" : "Generate"}
      </button>
      <button
        onClick={() => {
          setCount(0);
          setGrid(setDefaultGrid());
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
            );
          }

          setGrid(rows);
          setCount(1);
        }}
      >
        Random
      </button>
      <p>Generation:{count}</p>
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
              onClick={() => {
                const newGrid = produce(grid, (producedgrid) => {
                  producedgrid[rowIndex][colIndex] = grid[rowIndex][colIndex]
                    ? 0
                    : 1;
                });
                setGrid(newGrid);
              }}
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
    </div>
  );
}

export default App;
