import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

import Cell from './Cell';

const useStyles = makeStyles(theme => ({
  grid: {
    border: '3px dashed red',
    width: '100%',
    height: '100%',
    display: 'grid'
  }
}));

export default function Grid({ cellData, gridSize, toggleCellManual }) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div
      className={classes.grid}
      style={{
        gridTemplate: `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`
      }}
    >
      {cellData.map((cell, index) => {
        return (
          <Cell
            key={index}
            index={index}
            status={cell}
            toggleCellManual={toggleCellManual}
          />
        );
      })}
    </div>
  );
}
