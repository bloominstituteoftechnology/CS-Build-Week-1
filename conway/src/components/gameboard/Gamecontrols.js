import React from "react";

import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Gamecontrols = ({ size, speed, changeSize, changeSpeed, playing, toggleGame }) => {
  return (
    <div style={{ width: '33%' }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={playing}
              onChange={toggleGame}
              color="primary"
            />
          }
          label="Play!"
        />
      </FormGroup>
      <Typography id="slider-speed">Speed</Typography>
      <Slider
        min={3000}
        max={1}
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
