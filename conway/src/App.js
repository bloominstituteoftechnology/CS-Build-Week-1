import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Gameboard from './components/gameboard/Gameboard';

const styles = theme => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

class App extends Component {
  render() {
    const { classes: { root } } = this.props;
    return (
      <div className={root}>
        <Typography component="h2" variant="h1" gutterBottom>
          Conway's Game of Life
        </Typography>
        <Gameboard />
      </div>
    );
  }
}

export default withStyles(styles)(App);
