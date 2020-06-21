import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import Footer from './components/Footer'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'


function App() {
  const [currentBoard, setCurrentBoard] = useState([])
  const [boardSize, setBoardSize] = useState(25)


  function createBoard(newBoardSize) {
    let newBoard = []

    for (let i = 0; i < newBoardSize; i++) {
      let rows = []
      for (let j = 0; j < newBoardSize; j++) {
        rows.push({
          axisX: j,
          axisY: i,
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

  function toggleAliveState(cell) {
    let currentBo = currentBoard.slice()
    currentBo[cell.axisY][cell.axisX].isAlive = !cell.isAlive
    setCurrentBoard(currentBo)
  }

  return (
    <div className="App">
      <Header />
      <TopBar />
      <AppWrapper>
        <GameWrapper>
          <Board currentBoard={currentBoard} size={boardSize} toggleAliveState={toggleAliveState} />
        </GameWrapper>
      </AppWrapper>
      <BottomBar />
      <Footer />
    </div>
  );
}

export default App;

const AppWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`

const GameWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`