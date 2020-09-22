import React from 'react';
import Cell from './Cell';
import '../scss/Grid.scss';

const Grid = props => {
    let rowsArray = [];

    const handleGrid = () => {
        for (let i = 0; i < props.rows; i++) {
            for(let j = 0; j < props.columns; j++) {
                let cellId = i + "-" + j;
                let status = props.grid[i][j] ? "cell live" : "cell dead"

                rowsArray.push (
                    <Cell key={cellId}
                        cellId={cellId}
                        status={status}
                        row={i}
                        column={j}
                        selectCell={props.selectCell}
                    />
                )
            }
        }
        return rowsArray;
    }
    
    return (
        <div className="grid">
            {handleGrid()}
        </div>
    )
}

export default Grid;