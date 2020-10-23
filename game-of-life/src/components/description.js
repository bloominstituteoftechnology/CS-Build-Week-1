import React from 'react'

function Description () {
    return (
        <div>
            <h3>
                About Conway's Game of Life
            </h3>
            <p>
            In late 1940, John von Neumann defined life as a creation (as a being or organism) which can reproduce itself and simulate a Turing machine. 
            Von Neumann was thinking about an engineering solution which would use electromagnetic components floating randomly in liquid or gas.</p>

            <p>Motivated by questions in mathematical logic and in part by work on simulation games by Ulam,
               among others, John Conway began doing experiments in 1968 with a variety of different two-dimensional cellular automaton rules.
               Conway's initial goal was to define an interesting and unpredictable cell automaton. 
               For example, he wanted some configurations to last for a long time before dying and other configurations to go on forever without allowing cycles. 
               It was a significant challenge and an open problem for years before experts on cellular automata managed to prove that,
               indeed, the Game of Life admitted of a configuration which was alive in the sense of satisfying Von Neumann's two general requirements.
               While the definitions before the Game of Life were proof-oriented, Conway's construction aimed at simplicity without a priori providing proof the automaton was alive.</p>
            <a href = "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Read More...</a>

            <h2>Rules:</h2>
            <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
            <ol>
                <li>Any <strong>live cell</strong> with <strong>fewer than two</strong> live neighbours dies, as if by underpopulation.</li>
                <li>Any <strong>live cell</strong> with <strong>two or three</strong> live neighbours lives on to the next generation.</li>
                <li>Any <strong>live cell</strong> with <strong>more than three</strong> live neighbours dies, as if by overpopulation.</li>
                <li>Any <strong>dead cell</strong> with <strong>exactly three</strong> live neighbours becomes a live cell, as if by reproduction.</li>
            </ol>
            <p>These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</p>
            <ol>
                <li>Any <strong>live cell</strong> with <strong>two or three</strong> live neighbours survives.</li>
                <li>Any <strong>dead cell</strong> with <strong>three</strong> live neighbours becomes a live cell.</li>
                <li>All other live cells die in the next generation, and all dead cells stay dead.</li>
            </ol>
        </div>
    )
}

export default Description