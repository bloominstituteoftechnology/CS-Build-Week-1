import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Grid from './Grid';

const useStyles = makeStyles(theme => ({
  container: {
    width: '85vmin',
    height: '85vmin',
    background: [theme.palette.main]
  },
  title: {
    fontSize: '4em'
  }
}));

export default function GameOfLife() {
  const classes = useStyles();
  // const theme = useTheme();

  const [cellData, setCellData] = useState([]);
  const [cellDataNext, setCellDataNext] = useState([]);
  const [gridSize, setGridSize] = useState(15);
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

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Game of Life</Typography>
      <Grid
        cellData={cellData}
        gridSize={gridSize}
        toggleCellManual={toggleCellManual}
      />
    </Box>
  );
}
