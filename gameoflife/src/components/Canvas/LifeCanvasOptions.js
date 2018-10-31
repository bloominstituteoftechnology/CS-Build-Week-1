import React from 'react';
import './canvas.css';

const LifeCanvasOptions = props => {
    return (
        <div className='canvas-options'>
            <button onClick={props.clear}>Clear</button>
            <button onClick={props.randomize}>Randomize</button>
            <button onClick={props.start}>{props.continue ? 'Stop' : 'Start'}</button>
            <button onClick={props.next}>Next</button>
        </div>
    );
}

export default LifeCanvasOptions;