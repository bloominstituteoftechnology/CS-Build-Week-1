import React from "react";

const Options = props => {
    return (
        <div className="gridOptions">
            <span>Speed in ms: </span>
            <input
                type="number"
                step="100"
                value={props.speedValue}
                onChange={props.speedInputHandler}
                />
        </div>
    );
  };


export default Options;
