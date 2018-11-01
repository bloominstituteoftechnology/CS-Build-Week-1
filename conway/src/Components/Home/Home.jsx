import React, { Component } from 'react';
import Game from '../Game/Game';
import Rules from '../Rules/Rules';
import About from '../About/About';
import { withStyles } from '@material-ui/core/styles';
import {Grid,Card, Paper, CardContent, CardHeader, Typography} from '@material-ui/core'


const styles = {
   homeContainer: {
      margin: '10px',
      display: 'flex',
      justifyContent: 'center',
   },

   topCard:{
      padding: '20px',
      paddingTop: '25px'
   },
   bottomCard: {
      marginTop: '5px'
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
        <Typography variant='h4'> Conway's Game of Life </Typography>
        <Grid item xs={12} id="toprow">
          <Grid container spacing={8} justify="center">
              <Grid item xs={7} className={classes.gameGridItem} >
                <Paper className={classes.topCard} >
                    <Game componentWidth={500}  componentHeight={500}  gridHeight={classes.topCard.height} gridWidth={classes.topCard.width}/>
                </Paper>
              </Grid>
              
              <Grid item xs={10} sm={9} md={4}>
                <Paper className={classes.bottomCard} >
                    <Rules/>
                </Paper>
                <Paper className={classes.bottomCard} >
                  <About/>
                </Paper>
              </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} id="bottomrow">
        <Grid container spacing={8} justify="center">
              <Grid item xs={9} className={classes.gameGridItem} >
                <Paper className={classes.bottomCard} >
                    <About/>
                </Paper>
              </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
