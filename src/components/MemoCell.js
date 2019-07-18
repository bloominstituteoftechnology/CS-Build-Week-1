import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(theme => ({
  cell: {
    width: '100%',
    height: '100%'
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
  alive5: {
    background: [theme.palette.alive.e]
  },
  alive6: {
    background: [theme.palette.alive.f]
  },
  alive7: {
    background: [theme.palette.alive.g]
  },
  alive8: {
    background: [theme.palette.alive.h]
  },
  alive9: {
    background: [theme.palette.alive.i]
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
  dead5: {
    background: [theme.palette.dead.e]
  },
  dead6: {
    background: [theme.palette.dead.f]
  },
  dead7: {
    background: [theme.palette.dead.g]
  },
  dead8: {
    background: [theme.palette.dead.h]
  },
  dead9: {
    background: [theme.palette.dead.i]
  },
  title: {
    fontSize: '4em'
  }
}));

const MemoCell = React.memo(function Cell({
  index,
  status,
  toggleCellManual,
  isRunning
}) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div
      onClick={isRunning ? null : e => toggleCellManual(e, index)}
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
          : status === 51
          ? classes.alive5
          : status === 61
          ? classes.alive6
          : status === 71
          ? classes.alive7
          : status === 81
          ? classes.alive8
          : status === 91
          ? classes.alive9
          : status === 10
          ? classes.dead1
          : status === 20
          ? classes.dead2
          : status === 30
          ? classes.dead3
          : status === 40
          ? classes.dead4
          : status === 50
          ? classes.dead5
          : status === 60
          ? classes.dead6
          : status === 70
          ? classes.dead7
          : status === 80
          ? classes.dead8
          : status === 90
          ? classes.dead9
          : null
      )}
    />
  );
});

export default MemoCell;
