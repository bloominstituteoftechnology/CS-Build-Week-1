import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useInterval from '../utilities/useInterval';
import gosperCoords from '../utilities/gosperCoords';
import oscillatorCoords from '../utilities/oscillatorCoords';
import generate from '../utilities/generate';

import Grid from './Grid';
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
    const tempCellData = Array(gridSize * gridSize).fill(40);
    setCellData(tempCellData);
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
    const alive = [];
    tempCellData.forEach((cell, index) => {
      if (cell % 10 === 1) {
        alive.push(index);
      }
    });
    console.log(alive);
  };

  const updateGridSize = (e, value) => {
    e.preventDefault();
    setGeneration(0);
    setGridSize(value);
    return gridSize;
  };

  const updateDelay = (e, value) => {
    e.preventDefault();
    setDelay(value);
  };

  const gosper = e => {
    e.preventDefault();
    setGeneration(0);
    setGridSize(40);
    const tempCellData = cellData.map((cell, index) => {
      if (gosperCoords.includes(index)) {
        return 41;
      } else {
        return 40;
      }
    });
    setCellData(tempCellData);
  };

  const oscillator = e => {
    e.preventDefault();
    setGeneration(0);
    setGridSize(30);
    const tempCellData = cellData.map((cell, index) => {
      if (oscillatorCoords.includes(index)) {
        return 41;
      } else {
        return 40;
      }
    });
    setCellData(tempCellData);
  };

  const random = e => {
    e.preventDefault();
    setGeneration(0);
    setCellData(
      cellData.map(cell => {
        return Math.round(Math.random()) === 1 ? 41 : 40;
      })
    );
  };

  const clear = e => {
    e.preventDefault();
    setGeneration(0);
    setCellData(
      Array.apply(null, Array(gridSize * gridSize)).map(
        Number.prototype.valueOf,
        40
      )
    );
  };

  const next = (gridSize, cellData) => {
    const tempCellData = generate(gridSize, cellData);
    setCellData(tempCellData);
    setGeneration(generation + 1);
  };

  useInterval(() => next(gridSize, cellData), isRunning ? delay : null);

  const playPause = e => {
    e.preventDefault();
    setIsRunning(!isRunning);
  };

  const step = e => {
    e.preventDefault();
    setIsRunning(false);
    next(gridSize, cellData);
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
        delay={delay}
        updateDelay={updateDelay}
        gridSize={gridSize}
        updateGridSize={updateGridSize}
        setDelay={setDelay}
        generation={generation}
        cellData={cellData}
        playPause={playPause}
        step={step}
        gosper={gosper}
        oscillator={oscillator}
        random={random}
        clear={clear}
      />
    </Box>
  );
}
