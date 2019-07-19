import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  },
  display: {
    color: [theme.palette.alive.c]
  }
}));

function valuetext(value) {
  return `${value}`;
}

export default function GridSizeSlider({ gridSize, updateGridSize }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.display} id='discrete-slider' gutterBottom>
        Grid Size
      </Typography>
      <Slider
        onChange={(e, value) => updateGridSize(e, value)}
        value={gridSize}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={10}
        marks
        min={10}
        max={50}
      />
    </div>
  );
}
