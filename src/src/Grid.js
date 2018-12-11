import React, { Component } from 'react';

class Grid extends Component {
    state = { 
        //state for toggling here(alive/dead), ternary operator?
        // alive:""
     }

     componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 200;
        ctx.canvas.height = 200;
        for (let x=0;x<=200;x+=20) {
            for (let y=0;y<=200;y+=20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 200);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(200, y);
                ctx.stroke();
            }
        }
     }

     componentDidMount(){
         const canvas = this.refs.canvas;
         const ctx = canvas.getContext('2d');
         const boxSize = 40;
         const boxes = Math.floor(200/boxSize);
         canvas.addEventListener('click', handleClick);
        //  canvas.addEventListener('mousemove', handleClick);

         function drawBox(){
             ctx.beginPath();
             ctx.fillStyle = "white";
             ctx.lineWidth = 3;
             ctx.strokeStyle = 'black';
             for (let row = 0; row < boxes; row++){
                for (let column = 0; column < boxes; column++){
                    let x = column * boxSize;
                    let y = row * boxSize;
                    ctx.rect(x, y, boxSize, boxSize);
                    ctx.fill();
                    ctx.stroke();
                }
             }
             ctx.closePath();
         }

         function handleClick(e){
            ctx.fillStyle = 'black';

            ctx.fillRect(Math.floor(e.offsetX / boxSize)* boxSize,
            Math.floor(e.offsetY / boxSize) * boxSize,
            boxSize, boxSize);
         }
         drawBox();
     }
    render() { 
        return ( 
            <div>
            <canvas class="canvas" ref="canvas" />
            Grid
            // div squares or canvas here
            </div>
         );
    }
}
 
export default Grid;