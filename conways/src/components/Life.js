import React from 'react';


class Life{
    constructor(rows, cols){
        
        this.buffers = [[], []]
        this.state = {
            currentBuffer : 0,
            backBuffer: 1,
            numRows : rows,
            numCols : cols,
        }

        this.getCells = this.getCells.bind(this)

    }

    getCells = () => {
        let buffer = this.buffers[this.state.currentBuffer];

        return buffer;
    }

    calculateAliveNeighbors = (index, buffer) => {

        let rows = this.state.numRows;
        let cols = this.state.numCols;
        let neighbors = 0;
    
        let x = index % cols;
        let y = Math.floor(index / cols);
    
        // North
        if(y - 1 >= 0){
            let n = (x + (cols * (y - 1)));
            if(buffer.includes(n)){
                neighbors++;
            }
        }
    
        // NorthEast
        if(y - 1 >= 0 && x + 1 < cols){
            let ne = ((x + 1) + (cols * (y - 1)));
            if(buffer.includes(ne)){
                neighbors++;
            }
        }
    
        // East
        if(x + 1 < cols){
            let e = ((x + 1) + (cols * y));
            if(buffer.includes(e)){
                neighbors++;
            }
        }
    
        // SouthEast
        if(x + 1 < cols && y + 1 < rows){
            let se = ((x + 1) + (cols * (y + 1)));
            if(buffer.includes(se)){
                neighbors++;
            }
        }
    
        // South
        if(y + 1 < rows){
            let s = (x + (cols * (y + 1)));
            if(buffer.includes(s)){
                neighbors++;
            }
        }
        
        // SouthWest
        if(x - 1 >= 0 && y + 1 < rows){
            let sw = ((x - 1) + (cols * (y + 1)));
            if(buffer.includes(sw)){
                neighbors++;
            }
        }
    
        // West
        if(x - 1 >= 0){
            let w = ((x - 1) + (cols * y));
            if(buffer.includes(w)){
                neighbors++;
            }
        }
    
        // NorthWest
        if(x - 1 >= 0 && y - 1 >= 0){
            let nw = ((x - 1) + (cols * (y - 1)));
            if(buffer.includes(nw)){
                neighbors++;
    
            }
        }
    
        return neighbors;
    }

    deadOrAlive = (index, neighbors, buffer) => {

        if(buffer.includes(index)){                                 // We have a live cell index
            if(neighbors === 2 || neighbors === 3){                // Any live cell with 2 or 3 neighbors lives on
                this.buffers[this.state.backBuffer].append(index);
            }
        }else{                                                      // We have a dead cell index
            if(neighbors === 3){                                    // Any dead cell with exactly 3 neighbors lives on
                this.buffers[this.state.backBuffer].append(index);
            }
        }
    }

    update = () => {

        this.buffers[this.state.backBuffer] = []; // Empty our back buffer

        let buffer = this.buffers[this.state.currentBuffer];
        
        for (let i = 0; i < this.state.numRows * this.state.numCols; i++) {
            let neighbors = this.calculateAliveNeighbors(i, buffer)
            this.deadOrAlive(i, neighbors, buffer);
        }

        this.reverseBuffers();
    }

    reverseBuffers = () => {
        // reverse current and backbuffer
        this.setState({ currentBuffer : this.state.currentBuffer === 1 ? 0 : 1, backBuffer : this.state.backBuffer === 1 ? 0 : 1 })

    }

    setCells = (bufferIn) => {
        this.buffers[this.state.currentBuffer] = bufferIn;
    }

}


export default Life;