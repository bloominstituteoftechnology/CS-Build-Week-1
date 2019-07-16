import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  cell: {
    width: '100%',
    height: '100%',
    border: '1px grey solid'
  },
  alive1: {
    background: [theme.palette.alive.a]
  },
  alive2: {
    background: [theme.palette.alive.b]
  },
  alive3: {
    background: [theme.palette.alive.c]
  },
  alive4: {
    background: [theme.palette.alive.d]
  },
  dead1: {
    background: [theme.palette.dead.a]
  },
  dead2: {
    background: [theme.palette.dead.b]
  },
  dead3: {
    background: [theme.palette.dead.c]
  },
  dead4: {
    background: [theme.palette.dead.d]
  },
  title: {
    fontSize: '4em'
  }
}));

export default function Cell({ index, status, toggleCellManual }) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div
      onClick={e => toggleCellManual(e, index)}
      className={classNames(
        classes.cell,
        status === 11
          ? classes.alive1
          : status === 21
          ? classes.alive2
          : status === 31
          ? classes.alive3
          : status === 41
          ? classes.alive4
          : status === 10
          ? classes.dead1
          : status === 20
          ? classes.dead2
          : status === 30
          ? classes.dead3
          : status === 40
          ? classes.dead4
          : null
      )}
    />
  );
}
