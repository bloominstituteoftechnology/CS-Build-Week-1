import React from 'react';

export default function Grid(props) {
    return (
        <>
            <button onClick={() => props.gridReset(15)}>15x15</button>
            <button onClick={() => props.gridReset(30)}>30x30</button>
            <button onClick={() => props.gridReset(45)}>45x45</button>
            <button onClick={() => props.gridReset(60)}>60x60</button>
            <button onClick={() => props.randomizeGrid()}>Randomize!</button>
        </>
    )
}