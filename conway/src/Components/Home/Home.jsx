import React, { Component } from 'react';
import Game from '../Game/Game';
import { withStyles } from '@material-ui/core/styles';
import {Grid,Card, Paper, CardContent, CardHeader, Typography} from '@material-ui/core'


const styles = {
   homeContainer: {
     
   },
   gridCard:{
      height: '500px',
      width: '500px'
   }
 };

class Home extends Component {
  render() {
   const {classes} = this.props
    return (
      <Grid className={classes.homeContainer} container>
         <Grid item xs={12} id="toprow">
            <Grid container spacing={16} justify="center">
               <Grid item xs={8} sm={5}>
                  {/* <Card className={classes.gridCard} > */}
                     <Game gridHeight={classes.gridCard.height} gridWidth={classes.gridCard.width}/>
                  {/* </Card> */}
               </Grid>
            </Grid>
         </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
