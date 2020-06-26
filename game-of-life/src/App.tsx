import React, { useState } from "react";

import "./App.css";

const numRows = 50;
const numColumns = 70;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    // creating the grid
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
  });

  console.log(grid);
  return <div>hey</div>;
}

export default App;
