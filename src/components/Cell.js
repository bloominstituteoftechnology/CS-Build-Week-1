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
  alive: {
    background: [theme.palette.alive]
  },
  dead: {
    background: [theme.palette.dead]
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
        status === 1 ? classes.alive : classes.dead
      )}
    />
  );
}
