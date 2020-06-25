import React from 'react';

const Rules = props =>{

    return(
        <div id="top-container">
            <div>
            <h1>Conway's Game of Life</h1>
            <p>A  Turing Complete Cellular Automation devised by John Horton Conway</p>
            </div>
            <div id="rules">
                <h4>Rules</h4>
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    <li>Cells can only live inside the environment, once they try and escape (touch the edge); they die.</li>
                </ul>
            </div>
        </div>
    )
}

export default Rules;