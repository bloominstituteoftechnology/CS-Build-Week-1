import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useInterval from '../utilities/useInterval';

import Grid from './Grid';
// import Canvas from './Canvas';
import Controls from './Controls';

const useStyles = makeStyles(theme => ({
  container: {
    border: '3px dashed teal',
    width: '85vmin',
    height: '85vmin',
    background: [theme.palette.main]
  },
  title: {
    fontSize: '2em'
  }
}));

export default function GameOfLife() {
  const classes = useStyles();
  // const theme = useTheme();

  const [cellData, setCellData] = useState([]);
  const [gridSize, setGridSize] = useState(40);
  const [generation, setGeneration] = useState(0);
  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCellData(
      Array.apply(null, Array(gridSize * gridSize)).map(
        Number.prototype.valueOf,
        40
      )
    );
  }, [gridSize]);

  const toggleCellManual = (e, index) => {
    e.preventDefault();
    const tempCellData = Array.from(cellData);
    if (cellData[index] % 10 === 0) {
      tempCellData[index] = 41;
      setCellData(tempCellData);
    } else {
      tempCellData[index] = 40;
      setCellData(tempCellData);
    }
    // const alive = [];
    // tempCellData.forEach((cell, index) => {
    //   if (cell % 10 === 1) {
    //     alive.push(index);
    //   }
    // });
  };

  const random = e => {
    e.preventDefault();
    setCellData(
      cellData.map(cell => {
        return Math.round(Math.random()) === 1 ? 41 : 40;
      })
    );
  };

  const updateGridSize = (e, value) => {
    e.preventDefault();
    setGridSize(value);
  };

  const clear = e => {
    e.preventDefault();
    setCellData(
      Array.apply(null, Array(gridSize * gridSize)).map(
        Number.prototype.valueOf,
        40
      )
    );
  };

  const gosper = e => {
    e.preventDefault();
    updateGridSize(e, 40);
    const gosper = [
      652,
      692,
      693,
      694,
      695,
      733,
      734,
      735,
      736,
      747,
      748,
      762,
      763,
      773,
      776,
      786,
      788,
      802,
      803,
      813,
      814,
      815,
      816,
      825,
      826,
      827,
      836,
      837,
      852,
      853,
      854,
      855,
      864,
      865,
      866,
      876,
      877,
      892,
      905,
      906,
      907,
      946,
      948,
      987,
      988
    ];
    const tempCellData = cellData.map((cell, index) => {
      if (gosper.includes(index)) {
        return 41;
      } else {
        return cell;
      }
    });
    setCellData(tempCellData);
  };

  const generate = () => {
    const tempCellData = cellData.map((cell, index) => {
      let neighbors = 0;
      // handle corners first
      if (index === 0) {
        // upper left corner
        cellData[cellData.length - 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[cellData.length - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[cellData.length - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[2 * gridSize - 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[gridSize] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[gridSize + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      } else if (index === gridSize - 1) {
        // upper right corner
        cellData[cellData.length - 2] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[cellData.length - 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[cellData.length - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      } else if (index === cellData.length - gridSize) {
        // lower left corner
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[cellData.length - 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      } else if (index === cellData.length - 1) {
        // lower right corner
        cellData[index - (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (2 * gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[gridSize - 2] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        // now handle non-corner edges
      } else if (index < gridSize - 1) {
        // non-corner upper edges
        cellData[index + gridSize * (gridSize - 1) - 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize * (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize * (gridSize - 1) + 1] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
      } else if (index % gridSize === 0) {
        // non-corner left edges
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + (2 * gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
      } else if ((index + 1) % gridSize === 0) {
        // non-corner right edges
        cellData[index - (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (2 * gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      } else if (
        index > cellData.length - gridSize &&
        index < cellData.length
      ) {
        // non-corner lower edges
        cellData[index - (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index - (gridSize * (gridSize - 1) - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - gridSize * (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (gridSize * (gridSize - 1) + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        // now handle non-corner, non-edges
      } else {
        cellData[index - (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
        cellData[index + (gridSize - 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + gridSize] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
        cellData[index + (gridSize + 1)] % 10 === 1
          ? (neighbors += 1)
          : (neighbors += 0);
      }

      if (cell % 10 === 1) {
        if (neighbors < 2 || neighbors > 3) {
          return 10;
        } else if (cell < 32) {
          return cell + 10;
        } else {
          return cell;
        }
      } else if (neighbors === 3) {
        return 11;
      } else if (cell < 32) {
        return cell + 10;
      } else {
        return cell;
      }
    });
    setCellData(tempCellData);
    setGeneration(generation + 1);
  };

  useInterval(() => generate(), isRunning ? delay : null);

  const playPause = e => {
    e.preventDefault();
    setIsRunning(!isRunning);
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Game of Life</Typography>
      <Grid
        cellData={cellData}
        gridSize={gridSize}
        toggleCellManual={toggleCellManual}
        isRunning={isRunning}
      />
      <Controls
        gridSize={gridSize}
        updateGridSize={updateGridSize}
        generation={generation}
        playPause={playPause}
        generate={generate}
        gosper={gosper}
        random={random}
        clear={clear}
      />
    </Box>
  );
}
