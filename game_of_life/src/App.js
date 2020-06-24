import React, { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {
  const rowNum = 50
  const colNum = 50
  const [board, setBoard] = useState(()=> {
    const rows = []
    // initialize the board by adding an array of all zeros of length equal to the number of columns for each row.
    for (let i = 0; i < rowNum; i++){
      rows.push(Array.from(Array(colNum), () => 0))
    }
    return rows
  })
  return (
    <div className="App">
      <GameBoard board={board} setBoard={setBoard} rowNum={rowNum} colNum={colNum}/>
    </div>
  )
}

export default App
