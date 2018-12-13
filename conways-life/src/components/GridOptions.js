import React from "react";

const Options = props => {
    return (
        <div className="gridOptions">
            <div>
            <span>Speed in ms: </span>
                <input
                    name="speed"
                    type="number"
                    step="100"
                    value={props.speed}
                    onChange={props.handleInputChange}
                    />
            </div>
            <div>
                <span>Multicolor: </span>
                <input type="checkbox" name="multicolor" checked={props.multicolor} onChange={props.handleInputChange}/>
            </div>
        </div>
    );
  };


export default Options;
