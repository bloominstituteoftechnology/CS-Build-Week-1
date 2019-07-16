import React, { Component } from 'react';

class Grid extends Component {
    state = {
        grid = [[]],
        size = null,
        generation = 0
    }



    componentDidMount() {
        this.updateGrid()
    }

    updateGrid(){
        
        const deadOrAlive = {}
        if (go) {
            // map through grid once - add to hash table (forEach?) O(n)
            // newGrid = this.state.grid.map through grid again - check neighbors in hash table O(n)*1 and set alive/dead to 
            //
        }
    }

    clickHandler(idx) {
        // pass this down to squares, and call it on the column and or row of the square that's clicked to start the game. Set that square's alive to true, and start the requestAnimationFrame using updateGrid
    }

    render() {
        return (
            <div>
                {/* Map through grid  */}
            </div>
        );
    }
}

export default Grid;