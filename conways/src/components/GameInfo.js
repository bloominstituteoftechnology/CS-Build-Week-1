import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    border: 2px solid black;
    background-image: linear-gradient(to right, rgba(52, 187, 229, 0.5), rgba(139, 189, 184, 0.8));
    width: 25%;
    position: absolute;
    right: 5%;
    top: 5%;
`

const Description = styled.p`
    font-size: 0.8rem;
`
const GameInfo = () => {
    return (
        <Info>
            <Description>
                <a href="httDescriptions://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conways Game of Life</a>
                In 1970 John Conway developed a computer program called The Game of Life. 
                The idea behind it was that the process of biological life is, despite its apparent complexity, 
                reduceable to a finite set of rules. The game is made up of a grid of squares, or “cells,” 
                in one of two states: “alive” or “dead.” A player sets the initial conditions, 
                choosing which squares should be alive. Each turn of the game is like a generation – some squares live, 
                some are born, and some die. Just a few simple rules determine cells’ behavior: 
                Cells with too few or too many neighbors die. Empty squares with the right number of neighbors come to life.
            </Description>
        </Info>
    )
}

export default GameInfo;