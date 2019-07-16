import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Grid from './Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  container: {
    background: [theme.palette.a.main]
  },
  title: {
    fontSize: '4em'
  }
}));

export default function GameOfLife() {
  const classes = useStyles();
  // const theme = useTheme();

  const [cellData, setCellData] = useState([]);
  const [gridX, setGridX] = useState(15);
  const [gridY, setGridY] = useState(15);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    setCellData(
      Array.apply(null, Array(gridX * gridY)).map(Number.prototype.valueOf, 0)
    );
  }, [gridX, gridY]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Game of Life</Typography>
      <Grid cellData={cellData} gridX={gridX} gridY={gridY} />
    </Box>
  );
}
