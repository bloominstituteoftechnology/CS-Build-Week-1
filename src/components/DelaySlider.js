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

export default function DelaySlider({ delay, updateDelay }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.display} id='discrete-slider' gutterBottom>
        Delay (lower is faster)
      </Typography>
      <Slider
        onChange={(e, value) => updateDelay(e, value)}
        value={delay}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={25}
        marks
        min={25}
        max={2000}
      />
    </div>
  );
}
