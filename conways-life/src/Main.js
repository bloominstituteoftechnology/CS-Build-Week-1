import React from 'react'
import './index.css'

const Main = () => {
    return (
        <div>
        <h1 className="welcome-info">Welcome to Conway's Game of Life</h1>
        <h2 className="welcome-info">This is an interactive implementation of the classic Cellular Automata</h2>
        <h2 className="welcome-info">These are the rules</h2>
        <ol style={{width: '50%', margin: 'auto'}}>
            <li className="rules">
            Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            </li>
            <li className="rules">
            Any live cell with two or three live neighbors lives on to the next generation.
            </li>
            <li className="rules">
            Any live cell with more than three live neighbors dies, as if by overpopulation.
            </li>
            <li className="rules">
            Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            </li>
        </ol>
        </div>
    )
}


export default Main