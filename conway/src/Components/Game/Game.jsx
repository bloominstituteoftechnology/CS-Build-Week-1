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
         squareSize : 15,
         generation : 0,
      }
      this.container = React.createRef();
      this.timer = null;
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
            newArr.push({x: curX, y: curY, isAlive: false, coordX: i, coordY: j})
         }
      
         gameGrid.push(newArr)
      }
      const newGrids = this.state.Grids;
      newGrids[this.state.curGrid] = gameGrid
      newGrids[this.state.nextGrid] = Object.assign([], gameGrid)
      console.log(newGrids[this.state.curGrid] == newGrids[this.state.nextGrid])
      this.setState({Grids: newGrids, TotalNodesX, TotalNodesY, })
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

        if(this.state.isRunning) this.incrementGameLoop()

         // draw a box (each square is this.state.squareSizepx wide and )
         this.state.Grids[this.state.curGrid].forEach((verticalArr, i) => {
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
      
    }

    incrementGameLoop = () => {
      let  newGrid = this.state.Grids[this.state.nextGrid]
      const Grids = this.state.Grids;
      Grids[this.state.curGrid].forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {

             newGrid = this.lifeAlgorithm(i, j)

         })
      })

      
      let curGrid = this.state.curGrid;
      let nextGrid = this.state.nextGrid;
      Grids[curGrid] = newGrid;
      Grids[nextGrid] = Object.assign([],newGrid);

      if(curGrid === 'even'){
        curGrid = 'odd';
        nextGrid = 'even'
      }else{
        curGrid = 'even';
        nextGrid = 'odd'
      }
      this.setState({Grids, curGrid, nextGrid, generation: this.state.generation + 1})
    }

   lifeAlgorithm = (i , j) => {
     //get neighbors and run 4 rules of life

     const screenGrid = this.state.Grids[this.state.curGrid]
     const newGrid = this.state.Grids[this.state.nextGrid]
     console.log(screenGrid == newGrid)
     // screenGrid is where all nodes are checked (and what is currently displayed on screen)
     //nextGrid is where all changes are made

      const getNeighbors = (i, j) => {
         const neighborsObj = {};
         const curNode = screenGrid[i][j];
         
         let curNeighbor = 1;
         while(curNeighbor < 9){
           let newI = i;
           let newJ = j;
            switch(curNeighbor){
              case 1: newJ--;
                      if(!screenGrid[newI][newJ]) newJ = screenGrid[newI].length - 1
                      break;
              case 2: newI++;
                      if(!screenGrid[newI]) newI = 0;
                      newJ--;
                      if(!screenGrid[newI][newJ]) newJ = screenGrid[newI].length - 1
                      break;
              case 3: newI++;
                      if(!screenGrid[newI]) newI = 0;
                      break;
              case 4: newI++;
                      if(!screenGrid[newI]) newI = 0;
                      newJ++;
                      if(!screenGrid[newI][newJ]) newJ = 0;
                      break;
              case 5: newJ++;
                      if(!screenGrid[newI][newJ]) newJ = 0;
                      break;
              case 6: newI--;
                      if(!screenGrid[newI]) newI = screenGrid.length - 1
                      newJ++;
                      if(!screenGrid[newI][newJ]) newJ = 0;
                      break;
              case 7: newI--;
                      if(!screenGrid[newI]) newI = screenGrid.length - 1
                      break;
              case 8: newI--;
                      if(!screenGrid[newI]) newI = screenGrid.length - 1
                      newJ--;
                      if(!screenGrid[newI][newJ]) newJ = screenGrid[newI].length - 1
            }

            neighborsObj[curNeighbor] = Object.assign({},screenGrid[newI][newJ])

           curNeighbor++;
         }//end while

         if(this.state.x && this.state.y && this.state.x ==i && this.state.y == j){
            const newGetNeighbors = (i,j) => {
               const gridToCheck = this.state.Grids[this.state.nextGrid]
               const newNeighborsObj = {};
               const curNode = gridToCheck[i][j];
               
               let curNeighbor = 1;
               while(curNeighbor < 9){
                 let newI = i;
                 let newJ = j;
                  switch(curNeighbor){
                    case 1: newJ--;
                            if(!gridToCheck[newI][newJ]) newJ = gridToCheck[newI].length - 1
                            break;
                    case 2: newI++;
                            if(!gridToCheck[newI]) newI = 0;
                            newJ--;
                            if(!gridToCheck[newI][newJ]) newJ = gridToCheck[newI].length - 1
                            break;
                    case 3: newI++;
                            if(!gridToCheck[newI]) newI = 0;
                            break;
                    case 4: newI++;
                            if(!gridToCheck[newI]) newI = 0;
                            newJ++;
                            if(!gridToCheck[newI][newJ]) newJ = 0;
                            break;
                    case 5: newJ++;
                            if(!gridToCheck[newI][newJ]) newJ = 0;
                            break;
                    case 6: newI--;
                            if(!gridToCheck[newI]) newI = gridToCheck.length - 1
                            newJ++;
                            if(!gridToCheck[newI][newJ]) newJ = 0;
                            break;
                    case 7: newI--;
                            if(!gridToCheck[newI]) newI = gridToCheck.length - 1
                            break;
                    case 8: newI--;
                            if(!gridToCheck[newI]) newI = gridToCheck.length - 1
                            newJ--;
                            if(!gridToCheck[newI][newJ]) newJ = gridToCheck[newI].length - 1
                  }
      
                  newNeighborsObj[curNeighbor] = Object.assign({},gridToCheck[newI][newJ])
      
                 curNeighbor++;
               }//end while

               return newNeighborsObj
            }
            console.log(screenGrid == newGrid)
            console.log(neighborsObj)
            console.log(newGetNeighbors(i,j))
            console.log(screenGrid[this.state.x][this.state.y])
            console.log(newGrid[this.state.x][this.state.y])
            debugger
         } 

         return neighborsObj;
      }

      const neighbors = getNeighbors(i,j);

      //count the living neighbors
      let numAlive = 0;
      Object.keys(neighbors).forEach(key => {
        const node = neighbors[key]
        if(node.isAlive) numAlive += 1;
      })

      if( newGrid[i][j].isAlive && numAlive < 2 ) newGrid[i][j].isAlive = false; //Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
      else if( !newGrid[i][j].isAlive && numAlive === 3 ) newGrid[i][j].isAlive = true; //Any dead cell with exactly three live neighbours will come to life.
      else if( numAlive > 3 && newGrid[i][j].isAlive ) newGrid[i][j].isAlive = false; //Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
      else if( newGrid[i][j].isAlive && (numAlive >= 2 && numAlive <= 3)  ) newGrid[i][j].isAlive = true; //Any live cell with two or three live neighbours lives, unchanged, to the next generation.
      
      return newGrid;
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
      const startNow = !this.state.isRunning

      this.setState({ isRunning: !this.state.isRunning, generation: 0})

      if(startNow) this.timer = setTimeout(() => {requestAnimationFrame(() => this.canvasApp())}, 10)
      else clearTimeout(this.timer)
   }

   resetGame = () => {
      this.setState({isRunning: false, generation: 0})

      const gridToReset = this.state.Grids[this.state.curGrid]

      gridToReset.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            node.isAlive = false;
         })
      })
      const Grids = this.state.Grids;
      Grids[this.state.curGrid] = gridToReset;
      this.setState({Grids, })
      this.canvasApp();
   }

   randomizeGame = () => {
      this.setState({isRunning: false, generation: 0})

      const gridToReset = this.state.Grids[this.state.curGrid]

      gridToReset.forEach((verticalArr, i) => {
         verticalArr.forEach((node, j) => {
            node.isAlive = false;
            const roll = Math.round(Math.random()*10);
            if (roll > 8) node.isAlive = true;
         })
      })
      const Grids = this.state.Grids;
      Grids[this.state.curGrid] = gridToReset;
      this.setState({Grids})
      this.canvasApp();
   }

   makeAcorn = () => {
      this.resetGame();

      //get start node
      const firstX = Math.round(this.state.TotalNodesX / 2)
      const firstY = Math.round(this.state.TotalNodesY / 2)
      let x = firstX
      let y = firstY

      this.setState({x, y})//use to debug conway rule error with neighbors (maybe double buffer grid error)

      const Grids = this.state.Grids;
      const newGrid = Grids[this.state.curGrid]

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

      //FIX: this is testing conway rules error
      const getNeighbors = () => {
         const neighborsObj = {};
         const curNode = newGrid[firstX][firstY];
         
         let curNeighbor = 1;
         while(curNeighbor < 9){
           let newI = firstX;
           let newJ = firstY;
            switch(curNeighbor){
              case 1: newJ--;
                      if(!newGrid[newI][newJ]) newJ = newGrid[newI].length - 1
                      break;
              case 2: newI++;
                      if(!newGrid[newI]) newI = 0;
                      newJ--;
                      if(!newGrid[newI][newJ]) newJ = newGrid[newI].length - 1
                      break;
              case 3: newI++;
                      if(!newGrid[newI]) newI = 0;
                      break;
              case 4: newI++;
                      if(!newGrid[newI]) newI = 0;
                      newJ++;
                      if(!newGrid[newI][newJ]) newJ = 0;
                      break;
              case 5: newJ++;
                      if(!newGrid[newI][newJ]) newJ = 0;
                      break;
              case 6: newI--;
                      if(!newGrid[newI]) newI = newGrid.length - 1
                      newJ++;
                      if(!newGrid[newI][newJ]) newJ = 0;
                      break;
              case 7: newI--;
                      if(!newGrid[newI]) newI = newGrid.length - 1
                      break;
              case 8: newI--;
                      if(!newGrid[newI]) newI = newGrid.length - 1
                      newJ--;
                      if(!newGrid[newI][newJ]) newJ = newGrid[newI].length - 1
            }

            neighborsObj[curNeighbor] = Object.assign({},newGrid[newI][newJ])

           curNeighbor++;
         }//end while

            console.log(neighborsObj)

         return neighborsObj;
      }
      getNeighbors();
   }

   stepThroughGame = () => {
      this.incrementGameLoop()
      this.canvasApp();
   }

   render() {
      const {classes} = this.props
      if(!this.state.isRunning) this.timer = null;
      return (
         <div className={classes.gameContainer} ref={this.container}>
            <canvas id="myCanvas" width='0' height='0' onClick={this.handleGridClick} onWheel={this.handleWheel} />

            <div className={classes.gameControls}>

               <TextField
                  disabled
                  id="outlined-uncontrolled"
                  label="Generation"
                  // className={classes.TextField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.generation}
               />
              
               <Button onClick={this.startStopGame}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  Start/Stop
               </Button>
                  
               <Button onClick={this.stepThroughGame}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  Step
               </Button>

               <Button onClick={this.resetGame}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  Reset
               </Button>

               <Button onClick={this.randomizeGame}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  Randomize
               </Button>

               <Button onClick={this.makeAcorn}
               //FIX THIS: convert this to an IconButton with the MUI play/pause icon
               >
                  ACORN
               </Button>

            </div>

         </div>
    );
  }
}

export default withStyles(styles)(Game);
