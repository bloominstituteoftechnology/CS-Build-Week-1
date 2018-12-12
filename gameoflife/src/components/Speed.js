import React from "react";


export default function Speed(props) {
  return (
      <div>
    <div className="speed">
        <form onSubmit={props.onUpdateHandler}>
            <input 
                type="text"
                className="speed-input"
                name="tempSpeed"
                onChange={props.inputHandler}
                placeholder="Speed in Milleseconds"
                value={props.tempSpeed}
                />
            <button>
                Enter
            </button>
        </form>
    </div>
    </div>
  );
}