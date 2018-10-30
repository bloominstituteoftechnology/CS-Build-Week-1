import React, { Component } from 'react';
import Game from '../Game/Game';
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
      <Grid className={classes.homeContainer} container>
         <Grid item xs={12} id="toprow">
            <Grid container spacing={8} justify="center">
               <Grid item xs={9} className={classes.gameGridItem} >
                  <Paper className={classes.gridCard} >
                     <Game gridHeight={classes.gridCard.height} gridWidth={classes.gridCard.width}/>
                  </Paper>
               </Grid>
            </Grid>
         </Grid>
         <Grid item xs={12} id="bottomrow">
         
         </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
