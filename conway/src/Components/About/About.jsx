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
          <Typography variant="body2"> In 1968, mathematician John Conway began formulating theories of cellular automata implementations that would meet John Von Neumann’s two general requirements for life. Conway chose 4 rules to create these 2d automata: </Typography>
          <Typography variant='subtitle2'>1-	There should be no explosive growth.</Typography>
          <Typography variant='subtitle2'>2-	There should exist small initial patterns with chaotic, unpredictable outcomes.</Typography>
          <Typography variant='subtitle2'>3-	There should be potential for von Neumann universal constructors.</Typography>
          <Typography variant='subtitle2'>4-	The rules should be as simple as possible, whilst adhering to the above constraints.</Typography>

        </CardContent>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
