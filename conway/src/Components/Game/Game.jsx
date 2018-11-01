import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import  TextField  from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import {AppBar, Toolbar, Typography, IconButton, InputLabel, List, MenuItem, Drawer, Divider, FormControl, Select, Input, FormHelperText } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import RepeatOne from '@material-ui/icons/RepeatOne'
//start drawing a grid with squareSizepx squares (starting at 0,0)

// grid nodes are {x: 0, y:0, xz:squareSize, yz:squareSize}

// const gridOdd = [TotalNodesX][TotalNodesY];

const styles = theme => ({
   gameContainer: {
     display: 'flex',
     justifyContent: 'center',
     flexDirection: 'column',
     alignItems: 'center',
     width: '100%',
     generation: 0,
   },
   gameControls: {
      display: 'flex',
      justifyContent: 'center'
   },
   generationField: {
      width: '175px'
   },
   select: {
      // color: 'white',
      // '&:before': {
      //     borderColor: 'white',
      // },
      // '&:after': {
      //     borderColor: 'white',
      // }
  },
   formControl: {
      // margin: theme.spacing.unit,
      // minWidth: 120,
      color: 'white',
      marginRight: '20px',
   },
   buttonContainer: {
      marginTop: '5px'
   },
   iconButton: {
      marginBottom: '0px',
      paddingBotton: '0px'
   }
})

class Game extends Component {

   constructor(){
      super()
      this.state = {
         TotalNodesX: 0,
         TotalNodesY: 0,
         curGrid: 'Grid',
         nextGrid: 'NextGrid',
         Grid: [],
         NextGrid: [],
         isRunning: false,
         squareSize : 13,
         generation : 0,
         presets: '',
      }
      this.container = React.createRef();
      this.timer = null;
   }

   toggleGrid = () => {
      let curGrid = this.state.curGrid;
      let nextGrid = this.state.nextGrid;

      if(curGrid === 'Grid'){
         curGrid = 'NextGrid'
         nextGrid = 'Grid'
      }else{
         curGrid = 'Grid'
         nextGrid = 'NextGrid'
      }

      this.setState({curGrid})
   }

   componentDidMount() {
      console.log(this.container.current)
      // const width = this.container.current.width;
      // const height = this.container.current.height;

      const width = 500;
      const height = 500;

      let TotalNodesX = width
      let TotalNodesY = height

      TotalNodesX = Math.round(Math.floor(TotalNodesX / this.state.squareSize));
      TotalNodesY = Math.round(Math.floor(TotalNodesY / this.state.squareSize));

      const firstGrid = [];

      let curX = 0;
      let curY = 0;
      for (let i = 0; i < TotalNodesX; i++){
         if(i !== 0) curX += this.state.squareSize;
         const newArr = [];
      
         for(let j = 0; j < TotalNodesY; j++){
            if(j === 0) curY = 0;
            else curY += this.state.squareSize;
            newArr.push({x: curX, y: curY, isAlive: false, coordX: i, coordY: j})
         }
      
         firstGrid.push(newArr)
      }

      const secondGrid = [];

       curX = 0;
       curY = 0;
      for (let i = 0; i < TotalNodesX; i++){
         if(i !== 0) curX += this.state.squareSize;
         const newArr = [];
      
         for(let j = 0; j < TotalNodesY; j++){
            if(j === 0) curY = 0;
            else curY += this.state.squareSize;
            newArr.push({x: curX, y: curY, isAlive: false, coordX: i, coordY: j})
         }
      
         secondGrid.push(newArr)
      }

      this.setState({Grid: firstGrid, NextGrid: secondGrid, TotalNodesX, TotalNodesY, })
      requestAnimationFrame(() => this.canvasApp())
   }


   canvasApp = () => {
      var myCanvas = document.getElementById('myCanvas');
      if(!myCanvas) return
      var ctx = myCanvas.getContext('2d');
    
      const Width = this.state.squareSize * this.state.TotalNodesX;
      const Height = this.state.squareSize * this.state.TotalNodesY;
    
      myCanvas.width = Width;
      myCanvas.height = Height;
    
    
      const drawScreen = () => {
    
       //init grid square size
        const dx = this.state.squareSize;
        const dy = this.state.squareSize;
    
       
        var x = 0;
        var y = 0;
        var w = myCanvas.width;
        var h = myCanvas.height;
    
        var xy = 10;
    
        ctx.lineWidth = 1;
    
        ctx.moveTo(x, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle="black";
        ctx.stroke();
        // draw horizontal lines
        while (y < h) {
           y = y + this.state.squareSize;
           ctx.moveTo(x, y);
           ctx.lineTo(w, y);
           ctx.strokeStyle="black";
           ctx.stroke();
        }
    
        //draw vertical lines
        y = 0;
        xy = 10;
        ctx.moveTo(x, y);
        ctx.lineTo(x, h);
        ctx.stroke();
        while (x < w) {
           x = x + this.state.squareSize;
           ctx.moveTo(x, y);
           ctx.lineTo(x, h);
           ctx.stroke();
        }

         if(this.state.isRunning){
            this.incrementGameLoop()
         }

         // draw a box (each square is this.state.squareSizepx wide and )
         this.state[this.state.curGrid].forEach((verticalArr, i) => {
            verticalArr.forEach((node, j) => {
               if(node.isAlive){
                  ctx.beginPath()
                  ctx.rect(node.x, node.y, this.state.squareSize,this.state.squareSize)
                  ctx.fillStyle = "black"
                  ctx.fill();
               }else{
                  ctx.beginPath()
                  ctx.rect(node.x+1, node.y+1, this.state.squareSize-2,this.state.squareSize-2)
                  ctx.fillStyle = "white"
                  ctx.fill();
               }
            })
         })
         
      }
      drawScreen();
      if(this.state.isRunning){
         this.timer = setTimeout(() => {requestAnimationFrame(() => this.canvasApp())}, .01)
      }
      

    }//end canvasApp

   incrementGameLoop = () => {
      let newGrid = []
      this.state[this.state.curGrid].forEach((verticalArr, i) => {
         const yAxisArr = [];
         verticalArr.forEach((node, j) => {
            yAxisArr.push(Object.assign({}, node))
         })
         newGrid.push(yAxisArr)
      })

      newGrid = this.lifeAlgorithm(newGrid)

      const lastGrid = this.state[this.state.curGrid]

      //swap before state swap so this looks backwards right now
      // this.toggleGrid()


      this.setState({Grid: newGrid, NextGrid: lastGrid, generation: this.state.generation + 1})
   }

   lifeAlgorithm = (newGrid) => {
     //get neighbors and run 4 rules of life

     // screenGrid is where all nodes are checked (and what is currently displayed on screen)
     //nextGrid is where all changes are made
     const screenGrid = this.state.Grid

      this.state.Grid.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            const neighbors = this.getNeighbors(screenGrid, i,j);

            //count the living neighbors
            let numAlive = 0;
            const nearAlive = []
            Object.keys(neighbors).forEach(key => {
            const node = neighbors[key]
            if(node.isAlive) {
               numAlive += 1;
               // console.log({num: key, curNodeX: i, curNodeY: j, aliveX: node.coordX, aliveY: node.coordY})
            } else nearAlive.push({num:key, curNodeX: node.coordX, curNodeY: node.coordY })
            })

            const curNode = newGrid[i][j]
            // if(numAlive > 0 && curNode.isAlive) console.log({x: curNode.coordX, y: curNode.coordY})
            if( newGrid[i][j].isAlive && numAlive < 2 ) newGrid[i][j].isAlive = false; //Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
            else if( !newGrid[i][j].isAlive && numAlive === 3 ) newGrid[i][j].isAlive = true; //Any dead cell with exactly three live neighbours will come to life.
            else if( numAlive > 3 && newGrid[i][j].isAlive ) newGrid[i][j].isAlive = false; //Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
            else if( newGrid[i][j].isAlive && (numAlive >= 2 && numAlive <= 3)  ) newGrid[i][j].isAlive = true; //Any live cell with two or three live neighbours lives, unchanged, to the next generation.

         })
      })//finshed grid check
      
      
      return newGrid;
   }

   getNeighbors = (grid, i, j) => {
      const neighborsObj = {};
      const curNode = grid[i][j];
      
      let curNeighbor = 1;
      while(curNeighbor < 9){
        let newI = i;
        let newJ = j;
         switch(curNeighbor){
           case 1: newJ--;
                   if(!grid[newI][newJ]) newJ = grid[newI].length - 1
                   break;
           case 2: newI++;
                   if(!grid[newI]) newI = 0;
                   newJ--;
                   if(!grid[newI][newJ]) newJ = grid[newI].length - 1
                   break;
           case 3: newI++;
                   if(!grid[newI]) newI = 0;
                   break;
           case 4: newI++;
                   if(!grid[newI]) newI = 0;
                   newJ++;
                   if(!grid[newI][newJ]) newJ = 0;
                   break;
           case 5: newJ++;
                   if(!grid[newI][newJ]) newJ = 0;
                   break;
           case 6: newI--;
                   if(!grid[newI]) newI = grid.length - 1
                   newJ++;
                   if(!grid[newI][newJ]) newJ = 0;
                   break;
           case 7: newI--;
                   if(!grid[newI]) newI = grid.length - 1
                   break;
           case 8: newI--;
                   if(!grid[newI]) newI = grid.length - 1
                   newJ--;
                   if(!grid[newI][newJ]) newJ = grid[newI].length - 1
         }

         // if(i === 0 && j === 0)console.log(`num:${Object.keys(neighborsObj).length + 1} i:${newI} j:${newJ} liveNodeX:${i} j:${j}`)

         neighborsObj[curNeighbor] = Object.assign({}, grid[newI][newJ])

        curNeighbor++;
      }//end while

      // if(this.state.x && this.state.y && this.state.x ==i && this.state.y == j){
      //    console.log(neighborsObj)
      // } 

      return neighborsObj;
   }

    handleGridClick = event => {
      if(!this.state.isRunning){

         const rect = document.getElementById('myCanvas').getBoundingClientRect()

         let newX = event.clientX - rect.left;
         let newY = event.clientY - rect.top;

         const nodeNumberX = Math.floor(newX / this.state.squareSize)
         const nodeNumberY = Math.floor(newY / this.state.squareSize)

         const curGrid = this.state.Grid
         
         if(curGrid[nodeNumberX] && curGrid[nodeNumberX][nodeNumberY]){
            curGrid[nodeNumberX][nodeNumberY].isAlive = !curGrid[nodeNumberX][nodeNumberY].isAlive
            console.log(`clicked: x:${curGrid[nodeNumberX][nodeNumberY].coordX}, y: ${curGrid[nodeNumberX][nodeNumberY].coordY}`)
         }

         this.setState({Grid: curGrid})
         this.canvasApp()
       }
   }//end handleGridClick

   handleWheel = event => {
      if(event.deltaY > 0){
         console.log('wheelDown')
      }else console.log('wheelup')
   }

   startStopGame = () => {
      const startNow = !this.state.isRunning

      this.setState({ isRunning: !this.state.isRunning, })

      if(startNow) this.timer = setTimeout(() => {requestAnimationFrame(() => this.canvasApp())}, 10)
      else clearTimeout(this.timer)
   }

   resetGame = () => {
      this.setState({isRunning: false, generation: 0, presets: ''})

      const gridToReset = this.state.Grid

      gridToReset.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            node.isAlive = false;
         })
      })

      this.setState({Grids: gridToReset })
      this.canvasApp();
   }

   randomizeGame = () => {
      this.setState({isRunning: false, generation: 0})

      const gridToReset = this.state.Grid

      gridToReset.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            node.isAlive = false;
            const roll = Math.round(Math.random()*10);
            if (roll > 8) node.isAlive = true;
         })
      })

      this.setState({Grid: gridToReset})
      this.canvasApp();
   }

   makeAcorn = () => {
      this.resetGame();

      //get start node
      const firstX = Math.round((this.state.TotalNodesX / 2) - this.state.TotalNodesX / 4)
      const firstY = Math.round(this.state.TotalNodesY / 2)
      let x = firstX
      let y = firstY

      this.setState({x, y})//use to debug conway rule error with neighbors (maybe double buffer grid error)

      const newGrid = this.state.Grid

      newGrid[x][y].isAlive = true;
      x++
      newGrid[x][y].isAlive = true;
      y -= 2;
      newGrid[x][y].isAlive = true;
      x+=2;
      y++;
      newGrid[x][y].isAlive = true;
      y++;
      x++;
      newGrid[x][y].isAlive = true;
      x++
      newGrid[x][y].isAlive = true;
      x++
      newGrid[x][y].isAlive = true;

      this.canvasApp()
   }

   stepThroughGame = () => {
      this.incrementGameLoop()
      this.canvasApp();
   }


   handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      if(event.target.value === 'Acorn') this.makeAcorn();
      else if (event.target.value === 'Random') this.randomizeGame()
    };

   render() {
      const {classes} = this.props
      if(!this.state.isRunning) this.timer = null;
      return (
         <div className={classes.gameContainer} ref={this.container}>
            <canvas id="myCanvas" width='0' height='0' onClick={this.handleGridClick} onWheel={this.handleWheel} />

            <hr style={{width: '100%', marginTop: '20px'}}></hr>

            <div className={classes.gameControls}>

               <TextField
                  readOnly
                  id="outlined-uncontrolled"
                  label="Generation"
                  className={classes.generationField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.generation}
               />
               {this.state.isRunning ? 
                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.startStopGame} color='primary' className={classes.iconButton}
                     //FIX THIS: convert this to an IconIconButton with the MUI play/pause icon
                     >
                        <Pause/>
                     </IconButton>

                     <Typography variant="caption" gutterBottom align="center">
                        Pause
                     </Typography>
                  </div>
                  :
                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.startStopGame} color='primary' className={classes.iconButton}
                     //FIX THIS: convert this to an IconIconButton with the MUI play/pause icon
                     >
                        <PlayArrow/>
                     </IconButton>

                     <Typography variant="caption" gutterBottom align="center">
                        Play
                     </Typography>
                  </div>
               }
                  
                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.stepThroughGame} color='secondary'
                     //FIX THIS: convert this to an IconIconButton with the MUI play/pause icon
                     >
                        <RepeatOne/>
                     </IconButton>
                     <Typography variant="caption" gutterBottom align="center">
                        Step
                     </Typography>
                  </div>
                  
                     <Button onClick={this.resetGame} 
                     //FIX THIS: convert this to an IconButton with the MUI play/pause icon
                     >
                        Reset
                     </Button>
                  
               <FormControl id='console' className={this.props.classes.formControl} color={'inherit'}>
               <InputLabel htmlFor="presets-helper">Presets</InputLabel>
                  <Select
                     value={this.state.presets}
                     onChange={this.handleChange}
                     input={<Input name="presets" id="presets-helper" />}
                     className={this.props.classes.select}
                  >
                     <MenuItem  value={'Acorn'}>
                        <em>Acorn</em>
                     </MenuItem>
                     <MenuItem   value={'Random'}>
                        <em>Random</em>
                     </MenuItem>
                     

                  </Select>
                  <FormHelperText className={this.props.classes.select}>Select a layout</FormHelperText>
               </FormControl>
            </div>

         </div>
    );
  }
}

export default withStyles(styles)(Game);
