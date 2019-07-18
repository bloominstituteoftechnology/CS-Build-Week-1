import React, { useState, useEffect, useRef } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useInterval from '../utilities/useInterval';
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
  const cellDataRef = useRef();
  const [gridSize, setGridSize] = useState(20);
  const [generation, setGeneration] = useState(0);
  const [delay, setDelay] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const tempCellData = Array(gridSize * gridSize).fill(90);
    setCellData(tempCellData);
    cellDataRef.current = tempCellData;
  }, [gridSize]);

  const toggleCellManual = (e, index) => {
    e.preventDefault();
    const tempCellData = Array.from(cellData);
    if (cellData[index] % 10 === 0) {
      tempCellData[index] = 91;
      setCellData(tempCellData);
    } else {
      tempCellData[index] = 90;
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

  const preset = (e, gridSize, delay, data) => {
    e.preventDefault();
    setIsRunning(false);
    setGeneration(0);
    setGridSize(gridSize);
    setDelay(delay);
    setTimeout(() => {
      const tempCellData = cellDataRef.current.map((cell, index) => {
        if (data.includes(index)) {
          return 91;
        } else {
          return 90;
        }
      });
      setCellData(tempCellData);
    }, 500);
  };

  const random = e => {
    e.preventDefault();
    setGeneration(0);
    setCellData(
      cellData.map(cell => {
        return Math.round(Math.random()) === 1 ? 91 : 90;
      })
    );
  };

  const clear = e => {
    e.preventDefault();
    setGeneration(0);
    setCellData(
      Array.apply(null, Array(gridSize * gridSize)).map(
        Number.prototype.valueOf,
        90
      )
    );
  };

  const next = (gridSize, cellData) => {
    const tempCellData = generate(gridSize, cellData);
    if (!tempCellData) {
      setIsRunning(false);
    } else {
      setCellData(tempCellData);
      setGeneration(generation + 1);
    }
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
        preset={preset}
        random={random}
        clear={clear}
      />
    </Box>
  );
}
