import React from "react";


export default function Presets(props) {
  return (
      <div className="presets-body">
    <div className="preset-group1">
        <div className="presets">
            <button onClick={props.onClickPreset1}>
                Preset 1
            </button>
        </div>
        <div className="presets">
            <button onClick={props.onClickClearPreset1}>
                Clear Preset 1
            </button>
        </div>
    </div>
    <div className="preset-group2">
        <div className="presets">
            <button onClick={props.onClickPreset2}>
                Preset 2
            </button>
        </div>
        <div className="presets">
            <button onClick={props.onClickClearPreset2}>
                Clear Preset 2
            </button>
        </div>
    </div>
    <div className="preset-group3">
        <div className="presets">
            <button onClick={props.onClickPreset3}>
                Preset 3
            </button>
        </div>
        <div className="presets">
            <button onClick={props.onClickClearPreset3}>
                Clear Preset 3
            </button>
        </div>
    </div>
    <div className="preset-group4">
        <div className="presets">
            <button onClick={props.onClickPresetSave}>
                Save Preset
            </button>
        </div>
    </div>
    </div>
  );
}