import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import  TextField  from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import {Typography, IconButton, InputLabel, List, MenuItem, FormControl, Select, Input, FormHelperText, } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import RepeatOne from '@material-ui/icons/RepeatOne'
import Slider from '@material-ui/lab/Slider';
import Restore from '@material-ui/icons/Restore'

// grid nodes are {x: 0, y:0, xz:gridSize, yz:gridSize}

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
      width:'100%',
      justifyContent: 'space-between',
   },
   generationField: {
      width: '175px'
   },
   formControl: {
       width: '120px',
   },
   buttonContainer: {
      marginTop: '5px'
   },
   iconButton: {
      marginBottom: '0px',
      paddingBotton: '0px'
   },
   sliderGridSizeContainer: {
     display: 'flex',
     justifyContent: 'center',
    width: '100%',
  },
   slider: {
      padding: '22px 0px',
      width:'100%'
    },
    gameSpeedContainer: {
      width: '45%'
    },
   gridSizeContainer: {
      width: '45%'
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
         gridSize : 12,
         generation : 0,
         preset: "",
         gameSpeed: 500,
         gridSizeString: '',
         fps: 0,
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
     this.createGrid()
   }

   createGrid = () => {
    const width = this.props.componentWidth;
    const height = this.props.componentHeight;

    let TotalNodesX = width
    let TotalNodesY = height

    TotalNodesX = Math.round(Math.floor(TotalNodesX / this.state.gridSize));
    TotalNodesY = Math.round(Math.floor(TotalNodesY / this.state.gridSize));

    const firstGrid = [];

    let curX = 0;
    let curY = 0;
    for (let i = 0; i < TotalNodesX; i++){
       if(i !== 0) curX += this.state.gridSize;
       const newArr = [];
    
       for(let j = 0; j < TotalNodesY; j++){
          if(j === 0) curY = 0;
          else curY += this.state.gridSize;
          newArr.push({x: curX, y: curY, isAlive: false, coordX: i, coordY: j})
       }
    
       firstGrid.push(newArr)
    }

    const secondGrid = [];

     curX = 0;
     curY = 0;
    for (let i = 0; i < TotalNodesX; i++){
       if(i !== 0) curX += this.state.gridSize;
       const newArr = [];
    
       for(let j = 0; j < TotalNodesY; j++){
          if(j === 0) curY = 0;
          else curY += this.state.gridSize;
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
    
      const Width = this.state.gridSize * this.state.TotalNodesX;
      const Height = this.state.gridSize * this.state.TotalNodesY;
    
      myCanvas.width = Width;
      myCanvas.height = Height;
    
    
      const drawScreen = () => {
    
       //init grid square size
        const dx = this.state.gridSize;
        const dy = this.state.gridSize;
    
       
        var x = 0;
        var y = 0;
        var w = myCanvas.width;
        var h = myCanvas.height;
    
        var xy = 10;
    
        ctx.lineWidth = 1;
    
        ctx.moveTo(x, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle="grey";
        ctx.stroke();
        // draw horizontal lines
        while (y < h) {
           y = y + this.state.gridSize;
           ctx.moveTo(x, y);
           ctx.lineTo(w, y);
           ctx.strokeStyle="grey";
           ctx.stroke();
        }
    
        //draw vertical lines
        y = 0;
        xy = 10;
        ctx.moveTo(x, y);
        ctx.lineTo(x, h);
        ctx.stroke();
        while (x < w) {
           x = x + this.state.gridSize;
           ctx.moveTo(x, y);
           ctx.lineTo(x, h);
           ctx.stroke();
        }

         if(this.state.isRunning){
            this.incrementGameLoop()
         }

         // draw a box (each square is this.state.gridSizepx wide and )
         this.state[this.state.curGrid].forEach((verticalArr, i) => {
            verticalArr.forEach((node, j) => {
               if(node.isAlive){
                  ctx.beginPath()
                  ctx.rect(node.x, node.y, this.state.gridSize,this.state.gridSize)
                  ctx.fillStyle = "black"
                  ctx.fill();
               }else{
                  ctx.beginPath()
                  ctx.rect(node.x+1, node.y+1, this.state.gridSize-2,this.state.gridSize-2)
                  ctx.fillStyle = "white"
                  ctx.fill();
               }
            })
         })
         
      }
      drawScreen();
      if(this.state.isRunning){
         this.timer = setTimeout(() => {requestAnimationFrame(() => this.canvasApp())}, 100 - this.state.gameSpeed)
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

         const nodeNumberX = Math.floor(newX / this.state.gridSize)
         const nodeNumberY = Math.floor(newY / this.state.gridSize)

         const curGrid = this.state.Grid
         
         if(curGrid[nodeNumberX] && curGrid[nodeNumberX][nodeNumberY]){
            curGrid[nodeNumberX][nodeNumberY].isAlive = !curGrid[nodeNumberX][nodeNumberY].isAlive
            console.log(`clicked: x:${curGrid[nodeNumberX][nodeNumberY].coordX}, y: ${curGrid[nodeNumberX][nodeNumberY].coordY}`)
         }

         this.setState({Grid: curGrid})
         this.canvasApp()
       }
   }

   handleWheel = event => {
      if(event.deltaY > 0){
         console.log('wheelDown')
      }else console.log('wheelup')
   }

   startStopGame = () => {
      const startNow = !this.state.isRunning

      this.setState({ isRunning: !this.state.isRunning, })

      if(startNow) this.timer = setTimeout(() => {requestAnimationFrame(() => this.canvasApp())}, 100 - this.state.gameSpeed)
      else clearTimeout(this.timer)
   }

   resetGame = () => {
      this.setState({isRunning: false})

      const gridToReset = this.state.Grid

      gridToReset.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            node.isAlive = false;
         })
      })

      this.setState({Grids: gridToReset })
      this.canvasApp();
      this.setState({ generation: 0, preset: ''})
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

   handlePresetChange = event => {
      if(event.target.value === 'Acorn') this.makeAcorn();
      else if (event.target.value === 'Random') this.randomizeGame()
      else if (event.target.value === 'Glider') this.makeGlider()
      else if (event.target.value === 'Gosper') this.makeGosper();

      this.setState({ preset: event.target.value });
   };

   handleGridSizeChange = event => {
     this.resetGame()
      console.log(event.target.value)
      let size;
      if(event.target.value === 'Largest') size = 25;
      else if(event.target.value === 'Large') size = 20;
      else if(event.target.value === 'Medium') size = 15;
      else if(event.target.value === 'Small') size = 10;
      else if(event.target.value === 'Smallest') size = 5;
      console.log(size)
      this.setState({ gridSize: size, gridSizeString: event.target.value });
      this.createGrid();
   };

   handleSlider = (event, value) => {
      this.setState({gameSpeed: value})
   }

   makeGlider = () => {
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
    x++;
    y++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;

    this.canvasApp()
   }

   makeGosper = () => {
    this.resetGame();

    //get start node
    const firstX = 1
    const firstY = 8
    let x = firstX
    let y = firstY

    this.setState({x, y})//use to debug conway rule error with neighbors (maybe double buffer grid error)

    const newGrid = this.state.Grid
    //first 4square
    newGrid[x][y].isAlive = true;
    y++
    newGrid[x][y].isAlive = true;
    x++
    newGrid[x][y].isAlive = true;
    y--;
    newGrid[x][y].isAlive = true;

    //donut
    x+=7;
    y++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;
    y-=2;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;

    //glider
    x+=6;
    y++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;
    x++;
    y-=2;
    newGrid[x][y].isAlive = true;
    x++;
    y++;
    newGrid[x][y].isAlive = true;


    //donut
    y-=4;
    x+=4
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;
    y-=2;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;

    //glider
    y+=11;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;
    y++;
    x++;
    newGrid[x][y].isAlive = true;
    y-=2;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;

    //glider
    x+=9;
    y-=3;
    newGrid[x][y].isAlive = true;
    y--;
    newGrid[x][y].isAlive = true;
    y--;
    newGrid[x][y].isAlive = true;
    x++;
    newGrid[x][y].isAlive = true;
    x++;
    y++;
    newGrid[x][y].isAlive = true;

    //square



    y-=7
    x-=2
    newGrid[x][y].isAlive = true;
    y--;
    newGrid[x][y].isAlive = true;
    x--;
    newGrid[x][y].isAlive = true;
    y++;
    newGrid[x][y].isAlive = true;


    this.canvasApp()
   }
   

   render() {
      const {classes} = this.props
      if(!this.state.isRunning) this.timer = null;

      return (
         <div className={classes.gameContainer} ref={this.container}>
            <canvas id="myCanvas" width='0' height='0' onClick={this.handleGridClick} onWheel={this.handleWheel} />

            <hr style={{width: '100%', marginTop: '20px'}}></hr>
            <div className={classes.sliderGridSizeContainer}>

              <div className={classes.gameSpeedContainer} >
                <Typography id="label">Game Speed</Typography>
                <Slider
                    classes={{ container: classes.slider }}
                    value={this.state.gameSpeed}
                    aria-labelledby="label"
                    onChange={this.handleSlider}
                />
              </div>

              {/* <div className={classes.gridSizeContainer}>
                <FormControl id='GridPicker' className={this.props.classes.formControl} color={'inherit'}>
                  <InputLabel htmlFor="gridSize-helper">Grid Size</InputLabel>
                     <Select
                        value={this.state.gridSizeString}
                        onChange={this.handleGridSizeChange}
                        input={<Input name="gridSize" id="gridSize-helper" />}
                        className={this.props.classes.select}
                     >

                        <MenuItem value={'Largest'}>
                           Largest
                        </MenuItem>

                        <MenuItem value={'Large'}>
                           Large
                        </MenuItem>

                        <MenuItem value={'Medium'}>
                           Medium
                        </MenuItem>

                        <MenuItem value={'Small'}>
                           Small
                        </MenuItem>

                        <MenuItem value={'Smallest'}>
                           Smallest
                        </MenuItem>

                     </Select>
                     <FormHelperText className={this.props.classes.select}>Select a layout</FormHelperText>
                </FormControl>
              </div> */}
            </div>

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
                     <IconButton onClick={this.startStopGame} color='primary' className={classes.iconButton}>
                        <Pause/>
                     </IconButton>

                     <Typography variant="caption" gutterBottom align="center">
                        Pause
                     </Typography>
                  </div>
                  :
                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.startStopGame} color='primary' className={classes.iconButton}>
                        <PlayArrow/>
                     </IconButton>

                     <Typography variant="caption" gutterBottom align="center">
                        Play
                     </Typography>
                  </div>
               }

                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.stepThroughGame} color='secondary'>
                        <RepeatOne/>
                     </IconButton>
                     <Typography variant="caption" gutterBottom align="center">
                        Step
                     </Typography>
                  </div>
                  
                  <div className={classes.buttonContainer}>
                     <IconButton onClick={this.resetGame}>
                        <Restore/>
                     </IconButton>
                     <Typography variant="caption" gutterBottom align="center">
                        Reset
                     </Typography>
                  </div>

               <FormControl id='presets' className={this.props.classes.formControl} color={'inherit'}>
                  <InputLabel htmlFor="preset-helper">Presets</InputLabel>
                     <Select
                        value={this.state.preset}
                        onChange={this.handlePresetChange}
                        input={<Input name="preset" id="preset-helper" />}
                        className={this.props.classes.select}
                     >

                        <MenuItem value='Random'>
                           Random
                        </MenuItem>

                        <MenuItem value='Acorn'>
                           Acorn
                        </MenuItem>

                        <MenuItem value='Glider'>
                           Glider
                        </MenuItem>

                        <MenuItem value='Gosper'>
                           Gosper Glider Gun
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
