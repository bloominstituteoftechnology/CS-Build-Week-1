const MODULO = 2;

function Array2D(width, height) {
	let a = new Array(height);
  
	for (let i = 0; i < height; i++) {
	  a[i] = new Array(width);
	}
  
	return a;
}
  
class Life {

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ]

    this.randomize();

    this.clear();
  }

  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  clear() {
  }

  randomize() {
    let buffer = this.cells[this.currentBufferIndex];
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        buffer[row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  step() {
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];

    function countNeighbors(row, col){
      
      let colorCount = {
        red: 0,
        green: 0,
        blue: 0,
        };


      // West
      if(col > 0){
        switch (currentBuffer[row][col - 1]){
          case 0: 
            break;
          case 1: 
            colorCount.red++;
            break;
          case 2: 
            colorCount.green++;
            break;
          case 3:
            colorCount.blue++;
            break;
          default:
            console.log("error, invalid number");
            break;
        }
      }

      // Northwest
      if(col > 0 && row > 0){
        switch (currentBuffer[row - 1][col - 1]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }
      
      // 0X0
      // 0A0
      // 000

      // North
      if(row > 0){
        switch (currentBuffer[row - 1][col]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }

      // Northeast
      if(col < this.width - 1 && row > 0){
        switch (currentBuffer[row - 1][col + 1]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }

      // East
      if(col < this.width - 1){
        switch (currentBuffer[row][col + 1]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }

      // Southeast
      if(col < this.width - 1 && row < this.height - 1){
        switch (currentBuffer[row + 1][col + 1]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }
      
      // South
      if(row < this.height - 1){
        switch (currentBuffer[row + 1][col]) {
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;
        }
      }

      // Southwest
      if(col > 0 && row < this.height - 1){
        switch (currentBuffer[row + 1][col - 1]){
          case 0: 
                  // nothing
                  break;
          case 1: 
                colorCount.red++;
                break;
          case 2: 
                colorCount.green++;
                break;
          case 3:
                colorCount.blue++;
                break;
                default:
                console.log("error, invalid number");
                break;              
        }
      }

      return colorCount;
    }

    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        const neighbors = countNeighbors.call(this, row, col);
        // console.log(neighbors);
        const totalNeighbors = neighbors.red + neighbors.green + neighbors.blue;

        let dominantColor = currentBuffer[row][col];
        if(neighbors.red > neighbors.blue && neighbors.red > neighbors.green){
          dominantColor = 1;
        }
        if(neighbors.green > neighbors.red && neighbors.green > neighbors.blue){
          dominantColor = 2;
        }
        if(neighbors.blue > neighbors.red && neighbors.blue > neighbors.green){
          dominantColor = 3;
        }

        if (currentBuffer[row][col]){
          if(totalNeighbors < 2 || totalNeighbors > 3){
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = dominantColor;
          }
        } else {
          if(totalNeighbors === 3){
            backBuffer[row][col] = dominantColor;
          } else {
            backBuffer[row][col] = currentBuffer[row][col];
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1: 0;
  }
}

export default Life;
