import React from "react";


export default function Presets(props) {
  return (
      <div>
    <div className="buttons">
          <button onClick={props.onClickPreset1}>
            Preset 1
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickClearPreset1}>
            Clear Preset 1
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickPreset2}>
            Preset 2
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickClearPreset2}>
            Clear Preset 2
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickPreset3}>
            Preset 3
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickClearPreset3}>
            Clear Preset 3
          </button>
    </div>
    <div className="buttons">
          <button onClick={props.onClickPresetSave}>
            Save Preset
          </button>
    </div>
    </div>
  );
}