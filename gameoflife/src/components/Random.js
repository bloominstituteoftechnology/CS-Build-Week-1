import React from "react";


export default function Random(props) {
  return (
    <div>
        <div className="buttons">
            <button onClick={props.onClickRandom}>
                Random
            </button>
        </div>
    </div>
  );
}