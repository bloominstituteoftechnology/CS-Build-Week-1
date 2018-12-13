import React, { Component } from "react";
import Buttons from "./Buttons";
import Presets from "./Presets";
import Random from "./Random";
import Speed from "./Speed";

export default class Canvas extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      start: 0,
      generationNumber: 0,
      presetBuild: null,
      preset1: null,
      preset2: null,
      preset3: null,
      random: null,
      tempSpeed: null,
      speed: 1000
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < 510; x += 10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 510);
      ctx.stroke();
    }

    for (let y = 0; y < 510; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(510, y);
      ctx.stroke();
    }
    ctx.closePath();
  }

  getPixel = (imageData, x, y) => {
    const w = imageData.width;
    const h = imageData.height;
    if (x < 0 || x >= w || y < 0 || y >= h) {
      return null;
    }
    const index = (w * y + x) * 4;
    return imageData.data.slice(index, index + 4);
  };

  mouseDown = e => {
    e.preventDefault();
    this.setState({ x: e.screenX, y: e.screenY });
    setTimeout(() => {
      this.cellChange();
    }, 50);
  };

  cellChange = () => {
    if (this.state.start === 1) {
      return null;
    }
    let x = this.state.x;
    let y = this.state.y - 100;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    function getSquare(canvas, x, y) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: 1 + (x - rect.left) - ((x - rect.left)%10),
        y: 1 + (y - rect.top) - ((y - rect.top)%10)
      };
    }

    var mousePos = getSquare(canvas, x, y);

    function fillSquare(ctx, x, y) {
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, 8, 8);
    }

    function emptySquare(ctx, x, y) {
      ctx.clearRect(x, y, 8, 8);
    }

    let mousePosX = mousePos.x;
    let mousePosY = mousePos.y;

    console.log("mouse x and y", mousePosX, mousePosY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelRGBA = this.getPixel(imageData, mousePosX, mousePosY);

    if (pixelRGBA !== null && pixelRGBA[2] === 255) {
      emptySquare(ctx, mousePosX, mousePosY);
    } else {
      fillSquare(ctx, mousePosX, mousePosY);
    }
  };

  onClickStart = () => {
    this.setState({ start: 1 });
    let speed;

    if (this.state.speed !== 0) {
      speed = this.state.speed;
    }

    setInterval(() => {
      this.startFunction();
    }, this.state.speed);
  };

  onClickStop = () => {
    this.setState({ start: 0 });
  };

  onClickClear = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function emptySquare(ctx, x, y) {
      ctx.clearRect(x, y, 8, 8);
    }

    for (let xCheck = 1; xCheck <= 492; xCheck += 10) {
      for (let yCheck = 1; yCheck <= 492; yCheck += 10) {
        let pixelCheck = this.getPixel(imageData, xCheck, yCheck);
        if (pixelCheck[2] === 255) {
          emptySquare(ctx, xCheck, yCheck);
        }
      }
    }

    this.setState({ start: 0, generationNumber: 0, speed: 0});
  };

  countGen = () => {
    this.setState({ generationNumber: this.state.generationNumber + 1 });
  };

  onClickPresetSave = () => {
    let presetBuild = [];

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let xCheck = 1; xCheck <= 492; xCheck += 10) {
      for (let yCheck = 1; yCheck <= 492; yCheck += 10) {
        let pixelCheck = this.getPixel(imageData, xCheck, yCheck);
        if (pixelCheck[2] === 255) {
          presetBuild.push({ x: xCheck, y: yCheck });
        }
      }
    }

    this.setState({ presetBuild: presetBuild });

    setTimeout(() => {
      if (this.state.preset1 === null) {
        this.setState({ preset1: this.state.presetBuild });
      } else if (this.state.preset2 === null) {
        this.setState({ preset2: this.state.presetBuild });
      } else if (this.state.preset3 === null) {
        this.setState({ preset3: this.state.presetBuild });
      }
    }, 500);
  };

  onClickPreset1 = () => {
    if (this.state.preset1 === null) {
      return null;
    }

    this.onClickStop();
    this.onClickClear();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    this.state.preset1.map(cell => {
      ctx.fillStyle = "blue";
      ctx.fillRect(cell.x, cell.y, 8, 8);
    });
  };

  onClickPreset2 = () => {
    if (this.state.preset2 === null) {
      return null;
    }

    this.onClickStop();
    this.onClickClear();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    this.state.preset2.map(cell => {
      ctx.fillStyle = "blue";
      ctx.fillRect(cell.x, cell.y, 8, 8);
    });
  };

  onClickPreset3 = () => {
    if (this.state.preset3 === null) {
      return null;
    }

    this.onClickStop();
    this.onClickClear();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    this.state.preset3.map(cell => {
      ctx.fillStyle = "blue";
      ctx.fillRect(cell.x, cell.y, 8, 8);
    });
  };

  onClickClearPreset1 = () => {
    this.setState({ preset1: null });
  };

  onClickClearPreset2 = () => {
    this.setState({ preset2: null });
  };

  onClickClearPreset3 = () => {
    this.setState({ preset3: null });
  };

  onClickRandom = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let random = [];

    for (let xCheck = 1; xCheck <= 492; xCheck += 10) {
      for (let yCheck = 1; yCheck <= 492; yCheck += 10) {
        let randomNumber = Math.random();
        if (randomNumber > 0.5) {
          random.push({ x: xCheck, y: yCheck });
        }
      }
    }

    this.setState({ random: random });

    setTimeout(() => {
      this.onClickStop();
      this.onClickClear();

      this.setState({speed: 1000});

      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");

      this.state.random.map(cell => {
        ctx.fillStyle = "blue";
        ctx.fillRect(cell.x, cell.y, 8, 8);
      });
    }, 500);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdateHandler = e => {
    e.preventDefault();

    this.setState({ speed: this.state.tempSpeed, tempSpeed: 0 });
  };

  startFunction = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


    if (this.state.start === 1) {
      setTimeout(() => {
        this.countGen();
      }, 50);

      let nextGenDies = [];
      let nextGenLives = [];

      for (let xCheck = 1; xCheck <= 492; xCheck += 10) {
        for (let yCheck = 1; yCheck <= 492; yCheck += 10) {
          let pixelCheck = this.getPixel(imageData, xCheck, yCheck);
          if (pixelCheck[2] === 255) {
            let neighbor1 = this.getPixel(imageData, xCheck - 10, yCheck - 10);
            let neighbor2 = this.getPixel(imageData, xCheck, yCheck - 10);
            let neighbor3 = this.getPixel(imageData, xCheck + 10, yCheck - 10);
            let neighbor4 = this.getPixel(imageData, xCheck + 10, yCheck);
            let neighbor5 = this.getPixel(imageData, xCheck + 10, yCheck + 10);
            let neighbor6 = this.getPixel(imageData, xCheck, yCheck + 10);
            let neighbor7 = this.getPixel(imageData, xCheck - 10, yCheck + 10);
            let neighbor8 = this.getPixel(imageData, xCheck - 10, yCheck);

            let count = 0;

            if (neighbor1 !== null) {
              if (neighbor1[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor2 !== null) {
              if (neighbor2[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor3 !== null) {
              if (neighbor3[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor4 !== null) {
              if (neighbor4[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor5 !== null) {
              if (neighbor5[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor6 !== null) {
              if (neighbor6[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor7 !== null) {
              if (neighbor7[2] === 255) {
                count = count + 1;
              }
            }
            if (neighbor8 !== null) {
              if (neighbor8[2] === 255) {
                count = count + 1;
              }
            }

            if (count < 2 || count > 3) {
              nextGenDies.push({ x: xCheck, y: yCheck });
            }
          } else {
            let neighbor11 = this.getPixel(imageData, xCheck - 10, yCheck - 10);
            let neighbor22 = this.getPixel(imageData, xCheck, yCheck - 10);
            let neighbor33 = this.getPixel(imageData, xCheck + 10, yCheck - 10);
            let neighbor44 = this.getPixel(imageData, xCheck + 10, yCheck);
            let neighbor55 = this.getPixel(imageData, xCheck + 10, yCheck + 10);
            let neighbor66 = this.getPixel(imageData, xCheck, yCheck + 10);
            let neighbor77 = this.getPixel(imageData, xCheck - 10, yCheck + 10);
            let neighbor88 = this.getPixel(imageData, xCheck - 10, yCheck);

            let count2 = 0;

            if (neighbor11 !== null) {
              if (neighbor11[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor22 !== null) {
              if (neighbor22[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor33 !== null) {
              if (neighbor33[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor44 !== null) {
              if (neighbor44[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor55 !== null) {
              if (neighbor55[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor66 !== null) {
              if (neighbor66[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor77 !== null) {
              if (neighbor77[2] === 255) {
                count2 = count2 + 1;
              }
            }
            if (neighbor88 !== null) {
              if (neighbor88[2] === 255) {
                count2 = count2 + 1;
              }
            }

            if (count2 === 3) {
              nextGenLives.push({ x: xCheck, y: yCheck });
            }
          }
        }
      }
      nextGeneration(nextGenDies, nextGenLives);
    }

    function nextGeneration(nextGenDies, nextGenLives) {
      nextGenDies.map(cell => {
        ctx.clearRect(cell.x, cell.y, 8, 8);
      });
      nextGenLives.map(cell => {
        ctx.fillRect(cell.x, cell.y, 8, 8);
      });
    }
  };

  render() {
    console.log("state", this.state);
    return (
      <div>
        <div className="title">
          <h1>Conway's Game of Life</h1>
        </div>
        <div className="canvas-presets">
          <div className="canvas">
            <canvas
              ref="canvas"
              width={500}
              height={500}
              onClick={this.mouseDown}
            />
          </div>
          <div>
            <Presets
              onClickPresetSave={this.onClickPresetSave}
              onClickPreset1={this.onClickPreset1}
              onClickPreset2={this.onClickPreset2}
              onClickPreset3={this.onClickPreset3}
              onClickClearPreset1={this.onClickClearPreset1}
              onClickClearPreset2={this.onClickClearPreset2}
              onClickClearPreset3={this.onClickClearPreset3}
              />
              <div className="random-body">
                <Random
                  onClickRandom={this.onClickRandom}>
                </Random>
              </div>
              <div>
                <Speed
                  tempSpeed={this.state.tempSpeed}
                  inputHandler={this.inputHandler}
                  onUpdateHandler={this.onUpdateHandler}
                />
              </div>
              <div className="generation-body">
                  Generation: {this.state.generationNumber}
              </div>
              <div className="speedtext-body">
                  Speed (ms): {this.state.speed}
              </div>

          </div>
        </div>
        <div>
            <Buttons
              onClickStart={this.onClickStart}
              onClickStop={this.onClickStop}
              onClickClear={this.onClickClear}
            />
        </div>
        <div className="about">
            <h2>About this Algorithm</h2>
            <p>A bunch of stuff about the game of life. A bunch of stuff about the game of life. A bunch of stuff about the game of life. A bunch of stuff about the game of life. A bunch of stuff about the game of life. </p>
        </div>
        <div>
            <h2>Rules:</h2>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </div>
      </div>
    );
  }
}
