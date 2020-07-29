import React, {useState} from 'react';
import './App.scss';
import useInterval from './hooks/useInterval'
import Slider from './components/Slider'
import BoardGrid from './components/Board'
import newBoardStatus from './builds/newBoardStatus'
import runGame from './builds/runGame'


const size = 16

function App() {
  const [gameStatus, setGameStatus] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 150
  })
  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(()=>{
      const cell = {
        status : false,
        aliveCount: 0
      }
      return cell
    }), isGameRunning: false, generation: 0})
  }
  function newGame(e){
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(), isGameRunning: false, generation: 0})
  }
  function toggleRun(e){
    e.preventDefault()
    setGameStatus({...gameStatus, isGameRunning: !gameStatus.isGameRunning})
  }
  function changeSpeed(newSpeed) {
    setGameStatus({...gameStatus, speed: newSpeed})
  }
  useInterval(()=>{
    runGame(gameStatus, setGameStatus, size)
  }, gameStatus.isGameRunning?gameStatus.speed:null)
  
  return (
    <div className="App">
      <section className='matrix'>
        <div className='controls'>
          <div>
            <button onClick={toggleRun}>{gameStatus.isGameRunning?'Pause':'Start'}</button>
            <button onClick={clearBoard}>Clear</button>
            <button onClick={newGame}>Start New</button>
          </div>
          
          <label>Interval Steps<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms</label>
          <div className="gen">Generation: {gameStatus.generation}</div>
        </div>
        
        <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
      </section>
      <section className='rules'>
        <h1>Rules of the Game</h1>
        <ul>
          <li>Any live cell with fewer than two live neighbors dies (as if by isolation), or with four or more neighbors dies (as if by over population)</li>
          <li className='second'>Any cell with two or three living neighbors survives to the next generation</li>
          <li className='third'>Any dead cell with exactly three living neighbors will be resurrected</li>
        </ul>
      </section>
      <footer>          
        <ul>
          <li><a href='https://github.com/KrishnaDahal' target='_blank' rel="noopener noreferrer">Github</a></li>        
        </ul>
        
      </footer>
      
      
      
    </div>
  )
}

export default App;