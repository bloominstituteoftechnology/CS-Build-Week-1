import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Grid,Card, Paper, CardContent, CardHeader, Typography} from '@material-ui/core'


const styles = {
   homeContainer: {
      margin: '10px',
      display: 'flex',
      justifyContent: 'center',
   },

   gridCard:{
      padding: '20px',
      paddingTop: '25px'
   },

   gameGridItem: {
      minWidth: '540px',
      maxWidth: '630px'
   }
 };

class Home extends Component {
  render() {
   const {classes} = this.props

    return (
       <div>
        <CardContent>
          <Typography variant="h5"> Rules  </Typography>
          <Typography variant="body"> 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation. </Typography>
          <Typography variant="body"> 2. Any live cell with two or three live neighbors lives on to the next generation. </Typography>
          <Typography variant="body"> 3. Any live cell with more than three live neighbors dies, as if by overpopulation. </Typography>
          <Typography variant="body"> 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. </Typography>
        </CardContent>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
