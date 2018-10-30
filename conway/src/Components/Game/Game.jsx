import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

//start drawing a grid with squareSizepx squares (starting at 0,0)

// grid nodes are {x: 0, y:0, xz:squareSize, yz:squareSize}

// const gridOdd = [TotalNodesX][TotalNodesY];

const styles = {
   gridContainer: {
     
   },
 };

class Game extends Component {

   constructor(){
      super()
      this.state = {
         TotalNodesX: 0,
         TotalNodesY: 0,
         curGrid: [],
         gridEven: [],
         isRunning: false,
         squareSize : 20
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

      const curGrid = [];

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
      
         curGrid.push(newArr)
      }
      this.setState({curGrid: curGrid, TotalNodesX: TotalNodesX, TotalNodesY: TotalNodesY})
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

         // draw a box (each square is this.state.squareSizepx wide and )
         this.state.curGrid.forEach((verticalArr, i) => {
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

    handleGridClick = event => {
      if(!this.state.isRunning){

         const rect = document.getElementById('myCanvas').getBoundingClientRect()

         let newX = event.clientX - rect.left;
         let newY = event.clientY - rect.top;

         const nodeNumberX = Math.floor(newX / this.state.squareSize)
         const nodeNumberY = Math.floor(newY / this.state.squareSize)

         const curGrid = this.state.curGrid;
         
         if(curGrid[nodeNumberX] && curGrid[nodeNumberX][nodeNumberY]){
            curGrid[nodeNumberX][nodeNumberY].isAlive = !curGrid[nodeNumberX][nodeNumberY].isAlive
         }

         this.canvasApp()
       }
   }//end handleGridClick

   handleWheel = event => {
      if(event.deltaY > 0){
         console.log('wheelDown')
      }else console.log('wheelup')
   }

  render() {
     const {classes} = this.props
    return (<div className={classes.gridContainer} ref={this.container}>
         <canvas id="myCanvas" width={this.props.gridWidth} height={this.props.gridHeight} onClick={this.handleGridClick} onWheel={this.handleWheel} />
            {this.canvasApp()}
         </div>
    );
  }
}

export default withStyles(styles)(Game);
