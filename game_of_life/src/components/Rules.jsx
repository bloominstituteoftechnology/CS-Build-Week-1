import React from 'react';

const Rules = () => {
    return (
        <div className="rules">
            <h1>Rules:</h1>
            <p>Any live cell with two or three live neighbours survives.</p>
            <p>Any dead cell with three live neighbours becomes a live cell.</p>
            <p>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
        </div>
    )
}

export default Rules;