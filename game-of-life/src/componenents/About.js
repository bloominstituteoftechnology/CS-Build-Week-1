import React from 'react';

const About = props =>{
    

    return(
        <div>
            <h3>About The Algorithm</h3>
            <p>John Conway sought to simulate a cellular automata. He began experimenting with automaton rules to create simulation games.
                He wanted to simulate an interesting and unpredictable cell automaton, some configurations should last a while before dying and 
                other configurations should last forever. Conway chose the following rules carefully.
            </p>
            <ul>
                <li>There should be no explosive growth.</li>
                <li>There should exist small initial patterns with chaotic, unpredictable outcomes.</li>
                <li>There should be potential for von Neumann universal constructors, a self-replicating machine in a cellular automata environment.</li>
                <li>The rules should be as simple as possible, whilst adhering to the above constraints.</li>
            </ul>
            <p>While the rules are very simple, the game is actually Turing Complete. It can simulate a Turing Machine, anything that can be 
                computed algorithmically can be computed in the game of life (you could build a calculator or even build Conway's Game of Life in Conway's 
                Game of Life).
            </p>
        </div>
    )
}

export default About;