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
          <Typography variant="h5"> About  </Typography>
          <Typography variant="body"> 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation. </Typography>

        </CardContent>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
