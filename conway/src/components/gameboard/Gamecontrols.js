import React from "react";

import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "33%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  btns: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "20px"
  },
  slider: {
    marginBottom: "20px"
  }
});

const Gamecontrols = ({
  size,
  speed,
  changeSize,
  changeSpeed,
  playing,
  toggleGame,
  skip,
  open,
  clear,
  random,
  classes
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.btns}>
        <Fab color={playing ? "secondary" : "primary"} onClick={toggleGame}>
          {playing ? "Pause" : "Play"}
        </Fab>
        <Fab color="primary" disabled={playing} onClick={skip}>
          {" "}
          >{" "}
        </Fab>
        <Fab color="primary" disabled={playing} onClick={() => open()}>
          Help
        </Fab>
        <Fab color="primary" disabled={playing} onClick={clear}>
          Clear
        </Fab>
        <Fab color="primary" disabled={playing} onClick={random}>
          Random
        </Fab>
      </div>
      <Typography className={classes.slider}>Speed</Typography>
      <Slider
        min={250}
        max={0.05}
        value={speed}
        onChange={changeSpeed}
        className={classes.slider}
      />
      <Typography className={classes.slider}>
        Board Size (Overwrites current pattern with random pattern on change!)
      </Typography>
      <Slider
        min={15}
        max={135}
        step={15}
        value={size}
        onChange={changeSize}
        disabled={playing}
        className={classes.slider}
      />
    </div>
  );
};

export default withStyles(styles)(Gamecontrols);
