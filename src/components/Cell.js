import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  cell: {
    width: '40px',
    height: '40px',
    border: '1px grey solid'
  },
  alive1: {
    background: [theme.palette.alive.d]
  },
  alive2: {
    background: [theme.palette.alive.c]
  },
  alive3: {
    background: [theme.palette.alive.b]
  },
  alive4: {
    background: [theme.palette.alive.a]
  },
  dead1: {
    background: [theme.palette.dead.d]
  },
  dead2: {
    background: [theme.palette.dead.c]
  },
  dead3: {
    background: [theme.palette.dead.b]
  },
  dead4: {
    background: [theme.palette.dead.a]
  },
  title: {
    fontSize: '4em'
  }
}));

export default function Cell({ status }) {
  const classes = useStyles();
  // const theme = useTheme();
  console.log(status);
  return (
    <div
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
