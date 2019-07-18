import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import GridSizeSlider from './GridSizeSlider';
import DelaySlider from './DelaySlider';
import gosper from '../presets/gosper';
import oscillators from '../presets/oscillators';
import gliders from '../presets/gliders';
import LWSSs from '../presets/LWSSs';
import MWSSs from '../presets/MWSSs';
import HWSSs from '../presets/HWSSs';

const useStyles = makeStyles(theme => ({
  topRow: {
    display: 'grid',
    gridTemplateColumns: '20% 35% 35%',
    justifyContent: 'space-between'
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
  return (
    <div>
      <div className={classes.topRow}>
        <Typography>Generation: {generation}</Typography>
        <GridSizeSlider gridSize={gridSize} updateGridSize={updateGridSize} />
        <DelaySlider delay={delay} updateDelay={updateDelay} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} direction='column' alignItems='center'>
            <Grid item>
              <ButtonGroup
                variant='contained'
                color='secondary'
                size='large'
                aria-label='Large contained secondary button group'
              >
                <Button onClick={e => playPause(e)}>Play / Pause</Button>
                <Button onClick={e => step(e)}>Step</Button>
                <Button
                  onClick={e =>
                    preset(e, gosper.gridSize, gosper.delay, gosper.data)
                  }
                >
                  Gosper
                </Button>
                <Button
                  onClick={e =>
                    preset(
                      e,
                      oscillators.gridSize,
                      oscillators.delay,
                      oscillators.data
                    )
                  }
                >
                  Oscillators
                </Button>
                <Button
                  onClick={e =>
                    preset(e, gliders.gridSize, gliders.delay, gliders.data)
                  }
                >
                  School of Gliders
                </Button>
                <Button
                  onClick={e =>
                    preset(e, LWSSs.gridSize, LWSSs.delay, LWSSs.data)
                  }
                >
                  Lightweight Spaceships
                </Button>
                <Button
                  onClick={e =>
                    preset(e, MWSSs.gridSize, MWSSs.delay, MWSSs.data)
                  }
                >
                  Middleweight Spaceships
                </Button>
                <Button
                  onClick={e =>
                    preset(e, HWSSs.gridSize, HWSSs.delay, HWSSs.data)
                  }
                >
                  Heavyweight Spaceships
                </Button>
                <Button onClick={e => random(e)}>Random</Button>
                <Button onClick={e => clear(e)}>Clear</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
