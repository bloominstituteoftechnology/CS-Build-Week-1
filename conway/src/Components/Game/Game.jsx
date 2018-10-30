import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import  TextField  from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import  IconButton  from '@material-ui/core/IconButton';

//start drawing a grid with squareSizepx squares (starting at 0,0)

// grid nodes are {x: 0, y:0, xz:squareSize, yz:squareSize}

// const gridOdd = [TotalNodesX][TotalNodesY];

const styles = {
   gameContainer: {
     display: 'flex',
     justifyContent: 'center',
     flexDirection: 'column',
     alignItems: 'center',
     width: '100%',
     generation: 0,
   },
   gameControls: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center'
   }
 };

class Game extends Component {

   constructor(){
      super()
      this.state = {
         TotalNodesX: 0,
         TotalNodesY: 0,
         curGrid: 'odd',
         nextGrid: 'even',
         Grids: {
            odd: [],
            even : [],
         },
         isRunning: false,
         squareSize : 20,
         
      }
      this.container = React.createRef();
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

      const gameGrid = [];

      let curX = 0;
      let curY = 0;
      for (let i = 0; i < TotalNodesX; i++){
         if(i !== 0) curX += this.state.squareSize;
         const newArr = [];
      
         for(let j = 0; j < TotalNodesY; j++){
            if(j === 0) curY = 0;
            else curY += this.state.squareSize;
            newArr.push({x: curX, y: curY, isAlive: false})
         }
      
         gameGrid.push(newArr)
      }
      const newGrids = this.state.Grids;
      newGrids[this.state.curGrid] = gameGrid
      newGrids[this.state.nextGrid] = Object.assign({}, gameGrid)
      this.setState({Grids: newGrids, TotalNodesX, TotalNodesY})
      this.canvasApp()
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
    
        ctx.stroke();
        // draw horizontal lines
        while (y < h) {
          y = y + this.state.squareSize;
          ctx.moveTo(x, y);
          ctx.lineTo(w, y);
    
          ctx.stroke();
    
          // unsure what this is
          // ctx.font = "1px Calibri";
          // ctx.fillText(xy, x, y);
          // xy += 10;
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
    
    
          // ctx.font = "1px Calibri";
          // ctx.fillText(xy,x,10);
          // xy+=10;
        }

        if(this.state.isRunning) this.incrementGameLoop();

         // draw a box (each square is this.state.squareSizepx wide and )
         this.state.Grids[this.state.curGrid].forEach((verticalArr, i) => {
            verticalArr.forEach((node, j) => {
               if(node.isAlive){
                  ctx.rect(node.x, node.y, this.state.squareSize,this.state.squareSize)
               }
            })
         })
         
            ctx.fillStyle = "black";
            ctx.fill();
      }
    
      drawScreen();
    }

    incrementGameLoop = () => {
      const nextGrid = this.state.Grids[this.state.curGrid];
      this.state.Grids[this.state.curGrid].forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            if(node.isAlive){
               this.lifeAlgorithm(nextGrid, i, j)
            }

         })
      })
    }

   lifeAlgorithm = (grid, i , j) => {
     //get for neighbors and run 4 rules of life
      const getNeighbors = () => {
        console.log(grid)
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

            neighborsObj[curNeighbor] = grid[newI][newJ]

           curNeighbor++;
         }//end while

         console.log(neighborsObj)
         return neighborsObj;
      }

      const neighbors = getNeighbors();



   }

    handleGridClick = event => {
      if(!this.state.isRunning){

         const rect = document.getElementById('myCanvas').getBoundingClientRect()

         let newX = event.clientX - rect.left;
         let newY = event.clientY - rect.top;

         const nodeNumberX = Math.floor(newX / this.state.squareSize)
         const nodeNumberY = Math.floor(newY / this.state.squareSize)

         const Grids = this.state.Grids;
         const curGrid = Grids[this.state.curGrid];
         
         if(curGrid[nodeNumberX] && curGrid[nodeNumberX][nodeNumberY]){
            curGrid[nodeNumberX][nodeNumberY].isAlive = !curGrid[nodeNumberX][nodeNumberY].isAlive
         }

         Grids[this.state.curGrid] = curGrid;
         this.setState({Grids})
         this.canvasApp()
       }
   }//end handleGridClick

   handleWheel = event => {
      if(event.deltaY > 0){
         console.log('wheelDown')
      }else console.log('wheelup')
   }

   startStopGame = () => {
      this.setState({ isRunning: !this.state.isRunning})
   }

  render() {
     const {classes} = this.props
      return (
         <div className={classes.gameContainer} ref={this.container}>
            <canvas id="myCanvas" width='0' height='0' onClick={this.handleGridClick} onWheel={this.handleWheel} />
            {this.canvasApp()}

            <div className={classes.gameControls}>

               <TextField
                  disabled
                  id="outlined-uncontrolled"
                  label="Generation"
                  defaultValue="0"
                  // className={classes.TextField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.generation}
               />
              
               <Button onClick={this.startStopGame}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  Start/Stop Game
               </Button>
                  
               
            </div>

         </div>
    );
  }
}

export default withStyles(styles)(Game);
