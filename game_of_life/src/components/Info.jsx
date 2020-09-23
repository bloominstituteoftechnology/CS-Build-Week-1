import React from 'react';
import "../scss/Info.scss";

const Info = () => {
    return (
        <div className="info">
            <div className="rules">
                <h2>Rules:</h2>
                <p>Any live cell with two or three live neighbours survives.</p>
                <p>Any dead cell with three live neighbours becomes a live cell.</p>
                <p>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
            </div>
            <div className="about">
                <h2>About:</h2>
                <p>The creator of this "playerless game" was named John Conway.</p>
                <p>Turing completeness is used as a way to express the power of such a data-manipulation rule set.</p>
                <p>Virtually all programming languages today are Turing-complete.</p>
                <p>The concept is named after English mathematician and computer scientist Alan Turing.</p>
            </div>
        </div>
    )
}

export default Info;