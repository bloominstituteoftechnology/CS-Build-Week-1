import React, { useRef } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  canvas: {
    border: '3px dashed orange',
    width: '90%',
    height: 'auto',
    background: 'white'
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
    const allDead = ctx.createImageData(imageData);

    for (let i = 0; i < allDead.data.length; i += 4) {
      // Modify pixel data
      allDead.data[i + 0] = 0; // R value
      allDead.data[i + 1] = 179; // G value
      allDead.data[i + 2] = 179; // B value
      allDead.data[i + 3] = 255; // A value
    }

    ctx.putImageData(allDead, 0, 0);
    console.log('allDead: ', allDead);
  }

  // console.log(allDead);

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
