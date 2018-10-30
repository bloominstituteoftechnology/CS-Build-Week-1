import React, { Component } from 'react';
// import './Game.css';

//start drawing a grid with squareSizepx squares (starting at 0,0)

const squareSize = 20

// grid nodes are {x: 0, y:0, xz:squareSize, yz:squareSize}

// const gridOdd = [TotalNodesX][TotalNodesY];

class Game extends Component {

   constructor(){
      super()
      this.state = {
         TotalNodesX: 0,
         TotalNodesY: 0,
         curGrid: [],
         gridEven: [],
         
      }
   }

   componentDidMount() {
      let TotalNodesX = window.innerWidth;
      let TotalNodesY = window.innerHeight;

      TotalNodesX = Math.round(Math.floor(TotalNodesX / squareSize))
      TotalNodesY = Math.round(Math.floor(TotalNodesY / squareSize))

      const curGrid = [];

      let curX = 0;
      let curY = 0;
      for (let i = 0; i < TotalNodesX; i++){
         if(i !== 0) curX += squareSize;
         const newArr = [];
      
         for(let j = 0; j < TotalNodesY; j++){
            if(j == 0) curY = 0;
            else curY += squareSize;
            newArr.push({x: curX, y: curY, isAlive: false})
         }
      
         curGrid.push(newArr)
      }
      this.setState({curGrid: curGrid, TotalNodesX: TotalNodesX, TotalNodesY: TotalNodesY})
      this.canvasApp()
   }


   canvasApp = () => {
      console.log(this)
      var myCanvas = document.getElementById('myCanvas');
      if(!myCanvas) return
      var ctx = myCanvas.getContext('2d');
    
    
      const Width = squareSize * this.state.TotalNodesX;
      const Height = squareSize * this.state.TotalNodesY;
    
      myCanvas.width = Width;
      myCanvas.height = Height;
    
    
      const drawScreen = () => {
    
       //init grid square size
        const dx = squareSize;
        const dy = squareSize;
    
       
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
          y = y + squareSize;
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
          x = x + squareSize;
          ctx.moveTo(x, y);
          ctx.lineTo(x, h);
          ctx.stroke();
    
    
          // ctx.font = "1px Calibri";
          // ctx.fillText(xy,x,10);
          // xy+=10;
        }

         // draw a box (each square is squareSizepx wide and )
         this.state.curGrid.forEach((verticalArr, i) => {
            verticalArr.forEach((node, j) => {
               if(node.isAlive){
                  ctx.rect(node.x, node.y, squareSize,squareSize)
               }
            })
         })
         
            ctx.fillStyle = "black";
            ctx.fill();
      }
    
      drawScreen();
    }

    handleGridClick = event => {
      // const nodeNumberX = Math.floor((event.pageX - 10)/ squareSize)
      const nodeNumberX = Math.floor((event.pageX )/ squareSize)
      const nodeNumberY = Math.floor(event.pageY / squareSize)
      // console.log(nodeNumberX)
      // console.log(nodeNumberY)
      const curGrid = this.state.curGrid;
      
      if(curGrid[nodeNumberX] && curGrid[nodeNumberX][nodeNumberY]){
         curGrid[nodeNumberX][nodeNumberY].isAlive = !curGrid[nodeNumberX][nodeNumberY].isAlive
      } 
      this.canvasApp()
   }
  render() {
    return (<div>
        <canvas id="myCanvas" width="400" height="400" onClick={this.handleGridClick} />
        {this.canvasApp()}
        </div>
    );
  }
}

export default Game;
