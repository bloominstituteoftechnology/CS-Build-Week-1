import React from 'react';

export default function Cell(props) {
    return (
        <div>
            <p>{props.cell.xVal}, {props.cell.yVal} </p>
        </div>
    )
}