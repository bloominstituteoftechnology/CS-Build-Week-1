import React from 'react'
import { Square } from './styled-components'

const GameBoard = props => {
    return (
        <div className="gameBoard">
            {props.board.map((row, i) => 
                row.map((col, j) => {
                    return <Square key={`Row: ${i}, Col: ${j}`}value={ props.board[i][j] }/>
                })
            )}
        </div>
    )
}

export default GameBoard