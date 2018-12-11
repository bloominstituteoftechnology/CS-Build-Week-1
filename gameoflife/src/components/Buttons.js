import React from "react";
import "../App.css";

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
    </div>
  );
}