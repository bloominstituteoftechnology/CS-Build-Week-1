import React from "react";


export default function Buttons(props) {
  return (
      <div>
    <div className="buttons">
          <button onClick={props.onClickStart}>
            Start
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickStop}>
            Stop
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickClear}>
            Clear
          </button>
    </div>
    </div>
  );
}