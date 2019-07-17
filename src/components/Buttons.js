import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupedButtons({ playPause, gosper, random }) {
  return (
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
              <Button onClick={() => playPause()}>Go</Button>
              <Button onClick={() => gosper()}>gosper</Button>
              <Button onClick={() => random()}>random</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup fullWidth aria-label='Full width outlined button group'>
          <Button>Full</Button>
          <Button>width</Button>
          <Button>ButtonGroup</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
