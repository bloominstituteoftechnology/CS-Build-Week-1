import React, { Component } from 'react';
import Buttons from './Buttons';



export default class Canvas extends Component {
  constructor(){
    super();
    this.state={
        x: 0, 
        y: 0,
        start: 0,
        test: "",
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(let x = 0; x < 500; x += 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.stroke();
    }
    
    for(let y = 0; y < 500; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(500, y)
      ctx.stroke();
    }
    
    ctx.closePath();
  }

  
  mouseDown = (e) => {
    this.setState({x: e.screenX, y: e.screenY});
  }

  onClickStart = (e) => {
    console.log("click start");

    this.setState({start: 1});
    this.setState({test: "tested"});
    console.log("this.state.start", this.state.start)
    console.log("this.state.test", this.state.test)
    
  }

  onClickStop = (e) => {

    this.setState({start: 0});
    console.log("stopped", this.state.start)
  }


  componentDidUpdate() {
    console.log("component did update")
    let x = this.state.x; 
    let y = this.state.y-100; 
    
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    function getSquare(canvas, x, y) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: 1 + (x - rect.left) - (x - rect.left)%10,
          y: 1 + (y - rect.top) - (y - rect.top)%10
      };
    }

    var mousePos = getSquare(canvas, x, y);

    function fillSquare(ctx, x, y){
      ctx.fillStyle = "blue";
      ctx.fillRect(x,y,8,8);
    }

    function emptySquare(ctx, x, y) {
      ctx.clearRect(x,y,8,8);
    }

    let mousePosX = mousePos.x;
    let mousePosY = mousePos.y; 

    function getPixel(imageData, x, y) {
      const w = imageData.width; 
      const h = imageData.height;
      if (x < 0 || x >= w || y < 0 || y >= h) {
          return null;
      }
      const index = (w * y + x) * 4;
      return imageData.data.slice(index, index + 4);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelRGBA = getPixel(imageData, mousePosX, mousePosY);
    
    if(pixelRGBA !== null && pixelRGBA[2] === 255) {
      emptySquare(ctx, mousePosX, mousePosY);
    } else {
      fillSquare(ctx, mousePosX, mousePosY);
    }
    console.log("mouse x, y", mousePosX, mousePosY);
    
    if(this.state.start === 1) {
      for(let xCheck = 1; xCheck <= 492; xCheck += 10) {
        for(let yCheck = 1; yCheck <= 492; yCheck += 10) {
          let pixelCheck = getPixel(imageData, xCheck ,yCheck);
          if(pixelCheck[2] === 255) {
            let neighbor1 = getPixel(imageData, xCheck-10 ,yCheck-10);
            let neighbor2 = getPixel(imageData, xCheck ,yCheck-10);
            let neighbor3 = getPixel(imageData, xCheck+10 ,yCheck-10);
            let neighbor4 = getPixel(imageData, xCheck+10 ,yCheck);
            let neighbor5 = getPixel(imageData, xCheck+10 ,yCheck+10);
            let neighbor6 = getPixel(imageData, xCheck ,yCheck+10);
            let neighbor7 = getPixel(imageData, xCheck-10 ,yCheck+10);
            let neighbor8 = getPixel(imageData, xCheck-10 ,yCheck);
            
            let count = 0;
            
            if(neighbor1 !== null) {
              if(neighbor1[2] === 255) {
                count = count +1; 
              }
            } else if(neighbor2 !== null) {
              if(neighbor2[2] === 255) {
                count = count +1; 
              } 
            } else if(neighbor3 !== null) {
              if(neighbor3[2] === 255) {
                count = count +1; 
              }
            } else if(neighbor4 !== null) {
              if(neighbor4[2] === 255) {
                count = count +1; 
              } 
            } else if(neighbor5 !== null) {
              if(neighbor5[2] === 255) {
                count = count +1; 
              } 
            } else if(neighbor6 !== null) {
              if(neighbor6[2] === 255) {
                count = count +1; 
              } 
            } else if(neighbor7 !== null) {
              if(neighbor7[2] === 255) {
                count = count +1; 
              } 
            } else if(neighbor8 !== null) {
              if(neighbor8[2] === 255) {
                count = count +1; 
              } 
            }

            if(count < 2 || count > 3) {
              emptySquare(ctx, xCheck, yCheck); 
            } 

            } else {
              let neighbor11 = getPixel(imageData, xCheck-10 ,yCheck-10);
              let neighbor22 = getPixel(imageData, xCheck ,yCheck-10);
              let neighbor33 = getPixel(imageData, xCheck+10 ,yCheck-10);
              let neighbor44 = getPixel(imageData, xCheck+10 ,yCheck);
              let neighbor55 = getPixel(imageData, xCheck+10 ,yCheck+10);
              let neighbor66 = getPixel(imageData, xCheck ,yCheck+10);
              let neighbor77 = getPixel(imageData, xCheck-10 ,yCheck+10);
              let neighbor88 = getPixel(imageData, xCheck-10 ,yCheck);

              let count2 = 0;

              if(neighbor11 !== null) {
                if(neighbor11[2] === 255) {
                  count2 = count2 +1; 
                }
              } else if(neighbor22 !== null) {
                if(neighbor22[2] === 255) {
                  count2 = count2 +1; 
                } 
              } else if(neighbor33 !== null) {
                if(neighbor33[2] === 255) {
                  count2 = count2 +1; 
                }
              } else if(neighbor44 !== null) {
                if(neighbor44[2] === 255) {
                  count2 = count2 +1; 
                } 
              } else if(neighbor55 !== null) {
                if(neighbor55[2] === 255) {
                  count2 = count2 +1; 
                } 
              } else if(neighbor66 !== null) {
                if(neighbor66[2] === 255) {
                  count2 = count2 +1; 
                } 
              } else if(neighbor77 !== null) {
                if(neighbor77[2] === 255) {
                  count2 = count2 +1; 
                } 
              } else if(neighbor88 !== null) {
                if(neighbor88[2] === 255) {
                  count2 = count2 +1; 
                } 
              }

              if(count2 === 3) {
                fillSquare(ctx, xCheck, yCheck);
              }
              
            }
          } 
        }
      }
    }
  




  render() {
    return(
      <div>
      <div className="canvas">
        <canvas 
              ref="canvas" 
              width={500}
              height={500}
              onMouseDown={this.mouseDown}
          />
      </div>
      <div>
        <Buttons 
          onClickStart={this.onClickStart}
          onClickStop={this.onClickStop}>
        </Buttons>
      </div>
      </div>
    )
  }
}