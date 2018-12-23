import React from "react";


export default function Random(props) {
  return (
    <div>
        <div>
            <button 
                onClick={props.onClickRandom}>
                Random
            </button>
        </div>
    </div>
  );
}