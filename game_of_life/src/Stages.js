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
    getStage(){
        return this.stage; 
    }
    //get all the living cells
    getLiving(){
        return this.living;
    }
    //tell whether a cell is alive or dead
    getLifeUpdate(status){
        console.log("getLifeUpdate status:", status); 
        return this.living.has(status); 
    }
    //remove a cell from the map
    removeCell(status){
        console.log("removeCell status:", status); 
        return this.living.delete(status); 
    }
    //in each stage tell the new living and dead cells
    addStage(){
      
    }
    //count the living neighbors
    livingNeighbor(status){

    }
    //count the dead neighbors
    deadNeighbor(status){

    }
    //get the status of a cell and add it to map of living cells
    addCell(status){
        console.log("addCell status:", status); 
        this.living.set(status.x + " , " + status.y, {x : status.x, y: status.y})
    }
    //set the initial state of the cell
    initialCell(status){
      
}
export default Stages