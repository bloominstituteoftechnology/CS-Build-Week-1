import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GridSizeSlider from './GridSizeSlider';
import DelaySlider from './DelaySlider';
import gosper from '../presets/gosper';
import oscillators from '../presets/oscillators';
import gliders from '../presets/gliders';
import LWSSs from '../presets/LWSSs';
import MWSSs from '../presets/MWSSs';
import HWSSs from '../presets/HWSSs';
import title from '../presets/title';

const useStyles = makeStyles(theme => ({
  container: {
    width: '80%'
  },
  display: {
    color: [theme.palette.alive.c]
  },
  generation: {
    color: [theme.palette.alive.c],
    fontSize: '1.5em'
  },
  topRow: {
    padding: '10px 0',
    display: 'grid',
    gridTemplateColumns: '30% 35% 35%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  middleRow: {
    padding: '10px 0',
    display: 'grid',
    gridTemplateColumns: '15% 10% 10% 10% 15% 10% ',
    justifyContent: 'space-between'
  },
  bottomRow: {
    padding: '10px 0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    justifyContent: 'space-between'
  },
  button: {
    background: [theme.palette.dead.e],
    color: [theme.palette.alive.a],
    border: `1px solid ${[theme.palette.alive.a]}`
  }
}));

export default function Controls({
  generation,
  playPause,
  step,
  random,
  gridSize,
  delay,
  updateDelay,
  preset,
  updateGridSize,
  clear
}) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <Typography className={classes.generation}>
          Generation: {generation}
        </Typography>
        <GridSizeSlider gridSize={gridSize} updateGridSize={updateGridSize} />
        <DelaySlider delay={delay} updateDelay={updateDelay} />
      </div>
      <div className={classes.middleRow}>
        <Button
          className={classes.button}
          size='small'
          onClick={e => playPause(e)}
        >
          Play / Pause
        </Button>
        <Button className={classes.button} size='small' onClick={e => step(e)}>
          Step
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e => random(e)}
        >
          Random
        </Button>
        <Button className={classes.button} size='small' onClick={e => clear(e)}>
          Clear
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e => preset(e, title.gridSize, title.delay, title.data)}
        >
          Title
        </Button>
      </div>
      <div className={classes.bottomRow}>
        <Button
          className={classes.button}
          size='small'
          onClick={e => preset(e, gosper.gridSize, gosper.delay, gosper.data)}
        >
          Gosper Gun
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e =>
            preset(e, oscillators.gridSize, oscillators.delay, oscillators.data)
          }
        >
          Oscillators
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e =>
            preset(e, gliders.gridSize, gliders.delay, gliders.data)
          }
        >
          School of Gliders
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e => preset(e, LWSSs.gridSize, LWSSs.delay, LWSSs.data)}
        >
          Lightweight Spaceships
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e => preset(e, MWSSs.gridSize, MWSSs.delay, MWSSs.data)}
        >
          Middleweight Spaceships
        </Button>
        <Button
          className={classes.button}
          size='small'
          onClick={e => preset(e, HWSSs.gridSize, HWSSs.delay, HWSSs.data)}
        >
          Heavyweight Spaceships
        </Button>
      </div>
    </div>
  );
}
