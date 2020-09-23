import React from 'react';
import '../scss/Controls.scss';

const Controls = props => {
    const makeGridSmall = () => {
        props.gridSize("small")
    }

    const makeGridRegular = () => {
        props.gridSize("regular")
    }

    const makeGridLarge = () => {
        props.gridSize("large")
    }
    
    return (
        <div className="controls">
            <div 
                className="button play"
                onClick={props.play}
            >Play</div>
            <div 
                className="button pause"
                onClick={props.pause}
            >Pause</div>
            <div 
                className="button stop"
                onClick={props.stop}
            >Clear</div>
            <div 
                className="button popout"
            > Size
                <div className="menu">
                    <p onClick={makeGridSmall}>Small</p>
                    <p onClick={makeGridRegular}>Regular</p>
                    <p onClick={makeGridLarge}>Large</p>
                </div>
            </div>
        </div>
    )
}

export default Controls;
