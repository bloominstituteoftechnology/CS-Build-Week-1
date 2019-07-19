import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  rectangle: {
    width: '80%',
    margin: '20px auto',
    background: 'linear-gradient(90deg, rgba(0,0,255,1) 0%, rgba(0,0,0,1) 100%)'
  },
  title: {
    display: 'flex',
    padding: '10px 20px 0 20px',
    width: '100%',
    fontSize: '3em',
    color: [theme.palette.alive.a]
  },
  text: {
    display: 'flex',
    padding: '10px 20px',
    fontSize: '1.6em',
    color: [theme.palette.alive.e]
  },
  bullet: {
    padding: '0 20px',
    fontSize: '1.3em',
    color: [theme.palette.alive.e]
  }
}));

export default function About() {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div className={classes.rectangle}>
      <Typography className={classes.title}>Rules</Typography>
      <Typography className={classes.text}>
        Conway's Game of Life has just a few simple rules. For each 'turn' of
        the game (frame of animation), each cell will stay alive, die, stay
        dead, or be reborn. The fate of each cell is based on the current state
        of that cell and the state of its direct neighbors in both the cardinal
        and diagonal directions:
      </Typography>
      <Typography className={classes.bullet}>
        • A live cell will stay alive if it has 2 or 3 live neighbors.
      </Typography>
      <Typography className={classes.bullet}>
        • A live cell will die if it has any number of live neighbors other than
        2 or 3.
      </Typography>
      <Typography className={classes.bullet}>
        • A dead cell will be reborn if it has exactly 3 live neighbors.
      </Typography>
      <Typography className={classes.bullet}>
        • A dead cell will stay dead if it has any number of live neighbors
        other than 3.
      </Typography>
      <Typography className={classes.text}>
        From these simple rules, a surprising amount of complexity can emerge.
        Try 'School of Gliders', one of the other presets, or create your own
        starting board and see what happens.
      </Typography>
      <Typography className={classes.title}>
        Turing Completeness of Game of Life
      </Typography>
      <Typography className={classes.text}>
        Conway's Game of Life has just a few simple rules. For each 'turn' of
        the game (frame of animation), each cell will stay alive, die, stay
        dead, or be reborn. The fate of each cell is based on the current state
        of that cell and the state of its direct neighbors in both the cardinal
        and diagonal directions:
      </Typography>
    </div>
  );
}
