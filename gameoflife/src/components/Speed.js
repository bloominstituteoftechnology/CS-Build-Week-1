import React from "react";


export default function Speed(props) {
  return (
      <div>
    <div className="speed-body">
        <form onSubmit={props.onUpdateHandler}>
            <input 
                type="number"
                className="speed-input"
                name="tempSpeed"
                onChange={props.inputHandler}
                placeholder="Speed in Milleseconds"
                autocomplete="off"
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