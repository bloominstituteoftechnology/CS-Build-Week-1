import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const marks = [
  {
    value: 10,
    label: '10x10'
  },
  {
    value: 20,
    label: '20x20'
  },
  {
    value: 30,
    label: '30x30'
  },
  {
    value: 40,
    label: '40x40'
  },
  {
    value: 50,
    label: '50x50'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function valuetext(value) {
  return `${value}`;
}

export default function GridSizeSlider({ gridSize, updateGridSize }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id='discrete-slider' gutterBottom>
        Grid Size
      </Typography>
      <Slider
        onChange={(e, value) => updateGridSize(e, value)}
        value={gridSize}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='off'
        step={10}
        marks={marks}
        min={10}
        max={50}
      />
    </div>
  );
}
