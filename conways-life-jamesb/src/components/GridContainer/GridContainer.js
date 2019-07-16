import React from 'react'


class GridContainer extends React.Component {
    // on load, state should be a 15x15 grid with all cells set to
    state = {
        currentGrid: [],
        gridDimensions: 15
    };

    createGrid = (newGridSize) => {
    let cellRows = []
    // create a (x-value) by (y-value) square grid using a nested loop and the new grid size,
        // store x-val, y-val, and isAlive(boolean) for each cell
    for (let x = 0; x < newGridSize; x++) {
        let rowOfCells = []
        // once a row of cells is created at the desired length, push it into the currentGrid array to be stored in state
        for (let y = 0; y < newGridSize; y++) {
            rowOfCells.push({
                xVal: x,
                yVal: y,
                isAlive: false,
            });
        }
        // push the full row of cells into the allCells array
        cellRows.push(rowOfCells);
    }
    // set the currentGrid state equal to the cell rows array, containing all rows, x/y vals, and isAlive
    this.setState({
        currentGrid: cellRows
    })
    }
//createGrid^^^^^^^^------------------------------------------------------------------------------------------------

    setNewDimensions = (newGridDim) => {
        this.setState({
            gridDimensions: newGridDim
        });
        this.createGrid(newGridDim)
    }
//setNewDimensions^^^^^^-------------------------------------------------------------------------------------------

// on load, create a new grid with default 15x15
    componentDidMount() {
        this.setNewDimensions(15);
    };
// pass the
    render() {
        return (
            <div className="grid-container">
                <p>GRID CONTAINER COMPONENT</p>
            </div>
        )
    }
}




export default GridContainer;