import React from "react";

import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";

const Gamecontrols = ({ size, speed, changeSize, changeSpeed, playing }) => {
  return (
    <div style={{ width: '50%' }}>
      <Typography id="slider-speed">Speed</Typography>
      <Slider
        min={3000}
        max={10}
        value={speed}
        onChange={changeSpeed}
      />
      <Typography id="slider-size">Board Size</Typography>
      <Slider
        min={15}
        max={120}
        step={15}
        value={size}
        onChange={changeSize}
        disabled={playing}
      />
    </div>
  );
};

export default Gamecontrols;
