import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Board from './components/Board'
import './App.css'


function App() {
  const [currentBoard, setCurrentBoard] = useState([])
  const [boardSize, setBoardSize] = useState(25)


  function createBoard(newBoardSize) {
    let newBoard = []

    for (let i = 0; i < newBoardSize; i++) {
      let rows = []
      for (let j = 0; j < newBoardSize; j++) {
        rows.push({
          valueX: j,
          valueY: i,
          isAlive: false
        })
      }
      newBoard.push(rows)
    }
    setCurrentBoard(newBoard)
  }

  useEffect(() => {
    function setSize(newSize) {
      setBoardSize(newSize)
      createBoard(newSize)
    }
    setSize(boardSize)
  }, [boardSize])

  return (
    <div className="App">
      <h1> Conway Game of Life</h1>
      <AppWrapper>
        <GameWrapper>
          <Board currentBoard={currentBoard} size={boardSize} />
        </GameWrapper>
      </AppWrapper>
    </div>
  );
}

export default App;

const AppWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const GameWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`