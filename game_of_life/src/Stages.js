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
            stage: 0,
            living: new Map(),
            nextStage: new Map(),
            dead: new Map(),
        }
    }
    //what we want for the functions:

    //get the current stage that the process is in
    getStage(){
        return this.state.stage; 
    }
    //get all the living cells
    getLiving(){
        return this.state.living;
    }
    //tell whether a cell is alive or dead
    getLifeUpdate(status){
        return this.state.living.has(status); 
    }
    //remove a cell from the map
    removeCell(status){
        return this.state.living.delete(status); 
    }
    //in each stage tell the new living and dead cells
    //finding all of the living and dead cells so that the 
    //info from the previous stage can move to the next stage. 
    addStage(){
        this.state.living.forEach((cell) => {
            this.livingNeighbor(cell);
        })
        this.state.dead.forEach((cell) => {
            this.deadNeighbor(cell);
        })
        this.state.stage++;

        return new Stages(this.stage, this.nextStage); 
    }
    //count the living neighbors
    livingNeighbor(status){
        //start the count of the neighbors alive at 0
        //since the program doesn't know how many living neighbors
        //there are around.
        let thoseAlive = 0; 
        //loop through the the cell neighbors. this is where the 
        //rules come into play. 
        // - 1 and + 1 are necessary so that you do not get the 
        //initial cell of the program. 
        //this loops through all of those surrounding cells, 
        //there are eight cells that surround a single cell. 
        for(let i = status.x - 1; i <= status.x + 1; i++){
            for(let j = status.y -1; j <= status.y + 1; j++){
                if(i === status.x && j === status.y)
                    continue; 
                //getLifeUpdate will find those cells that are alive 
                //and those dead that surround the cell.
                //if they are alive then the counter for living cells
                // increments this is for the rules where a cell must 
                //only have two or three to remain alive. 
                if(this.getLifeUpdate(i + " , " + j)){
                    thoseAlive++;
                }else{
                    this.state.dead.set(i + " , " + j, {x: i, y: j});
                }
            }
        }
        //finding out if there are 2 or 3 living cells around the initial cell.
        if((thoseAlive === 2 || thoseAlive === 3))
        this.nextStage.set(status.x + " , " + status.y, {x: this.status.x, y: status.y});
    }
    //count the dead neighbors
    //very similar structure to the livingNeighbor
    //this one is figuring out how to bring a dead neighbor back to life.
    deadNeighbor(status){
        let thoseAlive = 0; 

        for(let i = status.x - 1; i <= status.x + 1; i++){
            for(let j = status.y - 1; j <= status.y; j++){
                if(i === status.x && j === status.y)
                continue; 

                if(this.getLifeUpdate(i + " , " + j)){
                    thoseAlive++; 
                }
            }
        }
        if(thoseAlive === 3)
        this.nextStage.set(status.x + " , " + status.y, {x: status.x, y: status.y}); 
    }
    //get the status of a cell and add it to map of living cells
    addCell(status){
        this.state.living.set(status.x + " , " + status.y, {x : status.x, y: status.y})
    }
    //set the initial state of the cell
    initialCell(status){
        console.log("initialCell status:", status); 
        if(this.getLifeUpdate(status.x + " , " + status.y)){
            this.removeCell(status.x + " , " + status.y);
        }else{
            this.addCell(status); 
        }
        return new Stages(this.state.stage, this.state.living); 
    }
}
export default Stages