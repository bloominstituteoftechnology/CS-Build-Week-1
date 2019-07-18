import React, { useRef } from 'react';
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

export default function Canvas({ cellData, gridSize, toggleCellCanvas }) {
  const classes = useStyles();
  // const theme = useTheme();
  const gridCanvas = useRef();
  const canvas = gridCanvas.current;

  let ctx;
  let imageData;
  let screenBuffer;

  if (canvas !== undefined) {
    ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    screenBuffer = imageData.data;
    console.log(screenBuffer);
  }

  return (
    <canvas
      className={classes.canvas}
      id='gridCanvas'
      ref={gridCanvas}
      width={gridSize}
      height={gridSize}
    />
  );
}
