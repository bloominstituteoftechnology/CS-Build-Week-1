import React from "react";

const About = props => {
    return (
        <div className="aboutInfo">
            <div className="aboutSection">
                <h4>Rules</h4>
                <ul>
                    <li>If a cell is alive and it has exactly 2 or 3 neighbors, it stays alive.</li>
                    <li>If a cell is alive and it has less than 2 or more than 3 live neighbors, it dies.</li>
                    <li>If a cell is dead and it has exactly 3 live neighbors, it comes to life.</li>
                </ul>
            </div>
            <div className="aboutSection">
                <h4>Cellular Automaton</h4>
                <p>
                A cellular automaton is a collection of cells whose values change over time, as specified by a 
                pre-determined set of rules. In a 2-dimensional model, cells are often represented as squares on a grid.
                A cell's value changes based on the state of its neighboring cells, and the rules of change are applied
                iteratively until the simulation stops running. For this example, a cell's neighbors includes all 8
                surrounding cells, and cells on the edge of the grid "wrap around" to consider the cells on the other
                side of the grid. This program is modeled after John Conway's Game of Life, outlined in 1970.
                </p>
            </div> 
        </div>
    );
  };


export default About;