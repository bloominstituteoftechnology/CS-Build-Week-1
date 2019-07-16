import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Grid from './Grid';
import Buttons from './Buttons';

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
  const [cellDataNext, setCellDataNext] = useState([]);
  const [gridSize, setGridSize] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [generation, setGeneration] = useState(0);

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
  };

  const toggleCell = index => {
    const tempCellData = Array.from(cellData);
    if (cellData[index] % 10 === 0) {
      tempCellData[index] = 1;
      setCellData(tempCellData);
    } else {
      tempCellData[index] = 0;
      setCellData(tempCellData);
    }
  };

  const life = () => {
    const tempCellData = Array.from(cellData).map((cell, index) => {
      let neighbors = [];
      // handle corners first
      if (index === 0) {
        // upper left corner
        console.log('upper left corner');
        neighbors = [
          cellData[cellData.length - 1],
          cellData[cellData.length - gridSize],
          cellData[cellData.length - gridSize + 1],
          cellData[gridSize - 1],
          cellData[1],
          cellData[gridSize - 1],
          cellData[2 * gridSize - 1],
          cellData[gridSize + 1]
        ];
      } else if (index === gridSize - 1) {
        // upper right corner
        console.log('upper right corner');
        neighbors = [
          cellData[cellData.length - 2],
          cellData[cellData.length - 1],
          cellData[cellData.length - gridSize],
          cellData[index - 1],
          cellData[0],
          cellData[index + (gridSize - 1)],
          cellData[index + gridSize],
          cellData[index + 1]
        ];
      } else if (index === cellData.length - gridSize) {
        // lower left corner
        console.log('lower left corner');
        neighbors = [
          cellData[index - 1],
          cellData[index - gridSize],
          cellData[index - (gridSize - 1)],
          cellData[cellData.length - 1],
          cellData[index + 1],
          cellData[gridSize - 1],
          cellData[0],
          cellData[1]
        ];
      } else if (index === cellData.length - 1) {
        // lower right corner
        console.log('lower right corner');
        neighbors = [
          cellData[index - (gridSize + 1)],
          cellData[index - gridSize],
          cellData[index - (2 * gridSize - 1)],
          cellData[index - 1],
          cellData[index - (gridSize - 1)],
          cellData[gridSize - 2],
          cellData[gridSize - 1],
          cellData[0]
        ];
        // now handle non-corner edges
      } else if (index < gridSize - 1) {
        // non-corner upper edges
        console.log('non-corner upper edge');
        neighbors = [
          cellData[index + gridSize * (gridSize - 1) - 1],
          cellData[index + gridSize * (gridSize - 1)],
          cellData[index + gridSize * (gridSize - 1) + 1],
          cellData[index - 1],
          cellData[index + 1],
          cellData[index + (gridSize - 1)],
          cellData[index + gridSize],
          cellData[index + (gridSize + 1)]
        ];
      } else if (index % gridSize === 0) {
        // non-corner left edges
        console.log('non-corner left edge');
        neighbors = [
          cellData[index - 1],
          cellData[index - gridSize],
          cellData[index - (gridSize - 1)],
          cellData[index + (gridSize - 1)],
          cellData[index + 1],
          cellData[index + (2 * gridSize - 1)],
          cellData[index + gridSize],
          cellData[index + (gridSize + 1)]
        ];
      } else if ((index + 1) % gridSize === 0) {
        // non-corner right edges
        console.log('non-corner right edge');
        neighbors = [
          cellData[index - (gridSize + 1)],
          cellData[index - gridSize],
          cellData[index - (2 * gridSize - 1)],
          cellData[index - 1],
          cellData[index - (gridSize - 1)],
          cellData[index + (gridSize - 1)],
          cellData[index + gridSize],
          cellData[index + 1]
        ];
      } else if (
        index > cellData.length - gridSize &&
        index < cellData.length
      ) {
        // non-corner lower edges
        console.log('non-corner lower edge');
        neighbors = [
          cellData[index - (gridSize + 1)],
          cellData[index - gridSize],
          cellData[index - (gridSize - 1)],
          cellData[index - 1],
          cellData[index + 1],
          cellData[index - (gridSize * (gridSize - 1) - 1)],
          cellData[index - gridSize * (gridSize - 1)],
          cellData[index - (gridSize * (gridSize - 1) + 1)]
        ];
        // now handle non-corner, non-edges
      } else {
        console.log('non-corner, non-edge');
        neighbors = [
          cellData[index - (gridSize + 1)],
          cellData[index - gridSize],
          cellData[index - (gridSize - 1)],
          cellData[index - 1],
          cellData[index + 1],
          cellData[index + (gridSize - 1)],
          cellData[index + gridSize],
          cellData[index + (gridSize + 1)]
        ];
      }
    });

    setGeneration(generation + 1);
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Game of Life</Typography>
      <Grid
        cellData={cellData}
        gridSize={gridSize}
        toggleCellManual={toggleCellManual}
      />
      <Buttons life={life} />
    </Box>
  );
}
