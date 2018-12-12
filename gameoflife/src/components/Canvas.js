import React, { Component } from 'react';
import Buttons from './Buttons';



export default class Canvas extends Component {
  constructor(){
    super();
    this.state={
        x: 0, 
        y: 0,
        start: 0,
        generationNumber: 0,
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
    e.preventDefault();
    this.setState({x: e.screenX, y: e.screenY});
    setTimeout(() => {this.cellChange();}, 50);
  }

  cellChange = () => {
    if(this.state.start === 1) {
      return null; 
    }
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

    console.log("mouse x and y", mousePosX, mousePosY);

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
  }

  onClickStart = () => {
    this.setState({start: 1});
    setInterval(() => {
      this.startFunction();
    }, 1000);
  }

  onClickStop = () => {
    this.setState({start: 0});
  }

  countGen = () => {
    this.setState({generationNumber: this.state.generationNumber + 1});
  }

  startFunction = () => {

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
     

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
       



    if(this.state.start === 1) {
      setTimeout(()=> {
        this.countGen();
      }, 50);

      let nextGenDies = [];
      let nextGenLives = [];

      for(let xCheck = 1; xCheck <= 492; xCheck += 10) {
        for(let yCheck = 1; yCheck <= 492; yCheck += 10) {
          let pixelCheck = getPixel(imageData, xCheck , yCheck);
          if(pixelCheck[2] === 255) {
            let neighbor1 = getPixel(imageData, xCheck-10 , yCheck-10);
            let neighbor2 = getPixel(imageData, xCheck , yCheck-10);
            let neighbor3 = getPixel(imageData, xCheck+10 , yCheck-10);
            let neighbor4 = getPixel(imageData, xCheck+10 , yCheck);
            let neighbor5 = getPixel(imageData, xCheck+10 , yCheck+10);
            let neighbor6 = getPixel(imageData, xCheck , yCheck+10);
            let neighbor7 = getPixel(imageData, xCheck-10 , yCheck+10);
            let neighbor8 = getPixel(imageData, xCheck-10 , yCheck);

            let count = 0;
            
            if(neighbor1 !== null) {
              if(neighbor1[2] === 255) {
                count = count +1; 
              }
            } if(neighbor2 !== null) {
              if(neighbor2[2] === 255) {
                count = count +1; 
              } 
            } if(neighbor3 !== null) {
              if(neighbor3[2] === 255) {
                count = count +1; 
              }
            } if(neighbor4 !== null) {
              if(neighbor4[2] === 255) {
                count = count +1; 
              } 
            } if(neighbor5 !== null) {
              if(neighbor5[2] === 255) {
                count = count +1; 
              } 
            } if(neighbor6 !== null) {
              if(neighbor6[2] === 255) {
                count = count +1; 
              } 
            } if(neighbor7 !== null) {
              if(neighbor7[2] === 255) {
                count = count +1; 
              } 
            } if(neighbor8 !== null) {
              if(neighbor8[2] === 255) {
                count = count +1; 
              } 
            }

            console.log("x, y, count", xCheck, yCheck, count);

            if(count < 2 || count > 3) {
              nextGenDies.push({'x': xCheck, 'y': yCheck});
            }

            } else {
              let neighbor11 = getPixel(imageData, xCheck-10 , yCheck-10);
              let neighbor22 = getPixel(imageData, xCheck , yCheck-10);
              let neighbor33 = getPixel(imageData, xCheck+10 , yCheck-10);
              let neighbor44 = getPixel(imageData, xCheck+10 , yCheck);
              let neighbor55 = getPixel(imageData, xCheck+10 , yCheck+10);
              let neighbor66 = getPixel(imageData, xCheck , yCheck+10);
              let neighbor77 = getPixel(imageData, xCheck-10 , yCheck+10);
              let neighbor88 = getPixel(imageData, xCheck-10 , yCheck);

              let count2 = 0;

              if(neighbor11 !== null) {
                if(neighbor11[2] === 255) {
                  count2 = count2 +1; 
                }
              } if(neighbor22 !== null) {
                if(neighbor22[2] === 255) {
                  count2 = count2 +1; 
                } 
              } if(neighbor33 !== null) {
                if(neighbor33[2] === 255) {
                  count2 = count2 +1; 
                }
              } if(neighbor44 !== null) {
                if(neighbor44[2] === 255) {
                  count2 = count2 +1; 
                } 
              } if(neighbor55 !== null) {
                if(neighbor55[2] === 255) {
                  count2 = count2 +1; 
                } 
              } if(neighbor66 !== null) {
                if(neighbor66[2] === 255) {
                  count2 = count2 +1; 
                } 
              } if(neighbor77 !== null) {
                if(neighbor77[2] === 255) {
                  count2 = count2 +1; 
                } 
              } if(neighbor88 !== null) {
                if(neighbor88[2] === 255) {
                  count2 = count2 +1; 
                } 
              }

              if(count2 === 3) {
                nextGenLives.push({'x': xCheck, 'y': yCheck});
              }
            }
          } 
        }
        nextGeneration(nextGenDies, nextGenLives);
      }

      function nextGeneration(nextGenDies, nextGenLives) {
          nextGenDies.map(cell => {
            console.log("nextgen function x and y", cell.x, cell.y);       
              ctx.clearRect(cell.x, cell.y, 8, 8);
          })  
          nextGenLives.map(cell => {
            ctx.fillRect(cell.x, cell.y, 8, 8);
          })
        
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
              onClick={this.mouseDown}
          />
      </div>
      <div>
        <Buttons 
          onClickStart={this.onClickStart}
          onClickStop={this.onClickStop}>
        </Buttons>
      </div>
      <div>Generation number: {this.state.generationNumber}</div>
      </div>
    )
  }
}