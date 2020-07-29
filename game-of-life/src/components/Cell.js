import React from 'react'

const Cell = ({cell, click, i , j}) => {
  
  
    let stage = 'stageOne'
    if (cell.aliveCount >= 5 && cell.aliveCount < 10) {
      stage = 'stageTwo'
    } else if (cell.aliveCount >= 10 && cell.aliveCount < 25) {
      stage = 'stageThree'
    } else if (cell.aliveCount >= 25 && cell.aliveCount < 50) {
      stage = 'stageFour'
    } else if (cell.aliveCount >= 50) {
      stage = 'stageFive'
    }
    return (
      <div className={`cell ${cell.status?stage:'dead'}`} onClick={()=>click(i, j)}/>
    )
    
  
  }

  export default Cell
