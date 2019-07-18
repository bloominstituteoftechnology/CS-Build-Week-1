import React, { useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  canvas: {
    border: '3px dashed orange',
    width: 'auto',
    height: 'auto',
    background: 'white'
  }
}));

export default function Canvas({ cellData, gridSize, toggleCellCanvas }) {
  const classes = useStyles();
  // const theme = useTheme();

  const [pixel, setPixel] = useState(0);
  const gridCanvas = useRef();
  const canvas = gridCanvas.current;

  let ctx;
  let imageData;
  let screenBuffer;

  const getPixel = e => {
    var x = e.layerX;
    var y = e.layerY;
    console.log(imageData);
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    console.log('pixel.data:', pixel.data);
    var rgba =
      'rgba(' +
      data[0] +
      ', ' +
      data[1] +
      ', ' +
      data[2] +
      ', ' +
      data[3] / 255 +
      ')';
    setPixel(rgba);
  };

  let counter = 0;

  if (canvas !== undefined && counter === 0) {
    counter += 1;
    ctx = canvas.getContext('2d');
    // ctx.scale(8, 8);
    imageData = ctx.getImageData(0, 0, gridSize, gridSize);
    screenBuffer = imageData.data;
    // console.log('screenBuffer: ', screenBuffer);
    const allDead = ctx.createImageData(imageData);

    for (let i = 0; i < allDead.data.length; i += 4) {
      allDead.data[i + 0] = 0; // R value
      allDead.data[i + 1] = 179; // G value
      allDead.data[i + 2] = 179; // B value
      allDead.data[i + 3] = 255; // A value
    }
    ctx.putImageData(allDead, 0, 0);
    // console.log(
    //   'after dead',
    //   ctx.getImageData(0, 0, canvas.width, canvas.height)
    // );

    canvas.addEventListener('mousedown', getPixel);
  }

  return (
    <>
      <p>{pixel}</p>
      <canvas
        className={classes.canvas}
        id='gridCanvas'
        ref={gridCanvas}
        width='800px'
        height='800px'
      />
    </>
  );
}
