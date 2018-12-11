import React, { Component } from 'react';

//Rules:

// A live cell with less than two live neighbours dies.
// A live cell with two or three neighbours lives on to the next generation.
// A live cell with more than tree neighbours dies.
// A dead cell with exactly three neighbours is reborn and becomes a live cell.

//to start you will need to initiate the states of several things.
//stage = how many stages of change the cell goes through
//living = will give us a map of the living cells
//dead =  will give a map of the dead cells
//nextStage = will give a map of the new stage in the process.

class Stages extends Component{
    constructor(){
        super();
        this.state ={
            stage = 0,
            living = new Map(),
            nextStage = new Map(),
            dead = new Map(),
        }
    }
    //what we want for the functions:

    //get the current stage that the process is in
    //get all the living cells
    //tell whether a cell is alive or dead
    //remove a cell from the map
    //in each stage tell the new living and dead cells
    //count the living neighbors
    //count the dead neighbors
    
}
export default Stages