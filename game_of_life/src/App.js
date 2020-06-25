import React, { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'

function App() {
  const rowNum = 35
  const colNum = 35
  const [board, setBoard] = useState(()=> {
    const rows = []
    // initialize the board by adding an array of all zeros of length equal to the number of columns for each row.
    for (let i = 0; i < rowNum; i++){
      rows.push(Array.from(Array(colNum), () => 0))
    }
    return rows
  })

  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="App">
      <GameBoard board={board} setBoard={setBoard} rowNum={rowNum} colNum={colNum}/>
      <Controls isRunning={isRunning} setIsRunning={setIsRunning}/>
    </div>
  )
}

export default App
