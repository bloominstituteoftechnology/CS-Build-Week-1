import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

import MemoCell from './MemoCell';

const useStyles = makeStyles(theme => ({
  grid: {
    border: `2px solid ${theme.palette.dead.b}`,
    borderRadius: '8px',
    width: '75%',
    height: '75%',
    display: 'grid'
  }
}));

export default function Grid({
  cellData,
  gridSize,
  toggleCellManual,
  isRunning
}) {
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
          <MemoCell
            key={index}
            index={index}
            status={cell}
            toggleCellManual={toggleCellManual}
            isRunning={isRunning}
          />
        );
      })}
    </div>
  );
}
