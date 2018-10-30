import React from 'react';
import './canvas.css';

const LifeCanvasOptions = props => {
    return (
        <div className='canvas-options'>
            <button onClick={props.clear}>Clear</button>
            <button onClick={props.start}>{props.continue ? 'Stop' : 'Start'}</button>
        </div>
    );
}

export default LifeCanvasOptions;