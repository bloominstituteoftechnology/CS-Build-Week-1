import React from 'react';



const GameInfo = () => {
    return (
        <div>
            <p>
                <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conways Game of Life</a>
                In 01970 John Conway developed a computer program called The Game of Life. 
                The idea behind it was that the process of biological life is, despite its apparent complexity, 
                reduceable to a finite set of rules. The game is made up of a grid of squares, or “cells,” 
                in one of two states: “alive” or “dead.” A player sets the initial conditions, 
                choosing which squares should be alive. Each turn of the game is like a generation – some squares live, 
                some are born, and some die. Just a few simple rules determine cells’ behavior: 
                Cells with too few or too many neighbors die. Empty squares with the right number of neighbors come to life.
            </p>
        </div>
    )
}

export default GameInfo;