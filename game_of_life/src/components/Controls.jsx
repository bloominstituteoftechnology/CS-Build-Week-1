import React from 'react';
import '../scss/Controls.scss';

const Controls = props => {
    return (
        <div className="controls">
            <div 
                className="button play"
                onClick={props.play}
            >
                Play
            </div>
            <div 
                className="button pause"
                onClick={props.pause}
            >
                Pause
            </div>
            <div 
                className="button stop"
                onClick={props.stop}
            >
                Clear
            </div>
        </div>
    )
}

export default Controls;
