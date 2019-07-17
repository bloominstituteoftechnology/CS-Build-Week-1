import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  canvas: {
    border: '3px dashed orange',
    width: '90%',
    height: 'auto',
    background: 'teal'
  }
}));

export default function Grid({ cellData, gridSize, toggleCellManual }) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <canvas
      className={classes.canvas}
      id='canvas'
      width={gridSize}
      height={gridSize}
    />
  );
}
