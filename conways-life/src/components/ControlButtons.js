import React from "react";

const Buttons = props => {
    return (
        <div className="controlButtons">
        <button onClick={() => props.toggleAnimation()}>Play/Pause</button>
        <button onClick={() => props.clearGrid()}>Clear</button>
        <button onClick={() => props.randomGrid()}>Randomize</button>
    </div>
    );
  };


export default Buttons;

