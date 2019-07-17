import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import GridSizeSlider from './GridSizeSlider';

export default function Controls({
  generation,
  playPause,
  step,
  gosper,
  random,
  gridSize,
  cellData,
  updateGridSize,
  clear
}) {
  return (
    <div>
      <Typography>Generation: {generation}</Typography>
      <GridSizeSlider gridSize={gridSize} updateGridSize={updateGridSize} />
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
                <Button onClick={e => gosper(e)}>Gosper</Button>
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
