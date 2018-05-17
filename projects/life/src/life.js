/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.cells = {
      foreground: Array2D(width, height),
      background: Array2D(width, height),
    };

    this.Buffer = this.cells.foreground;

    this.army1size = 0;
    this.army2size = 0;

    this.done = false;
    this.count = 0;

    this.randomize();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.Buffer;
  }

  getArmySizes() {
    return [this.army1size, this.army2size];
  }

  getDone() {
    return this.done;
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.cells.foreground[row][column] = 0;
        this.cells.background[row][column] = 0;
      }
    }
  }

  /**
   * Randomize the life grid
   */
  randomize = () => {
    // !!!! IMPLEMENT ME !!!!
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        let rando = Math.round(Math.random() * 5);
        // Conway
        // if (row % 2 === 1) {
        //   this.cells.background[row][column] = Math.round(Math.random());
        // }
        // else {
        //   this.cells.background[row][column] = 1;
        // }

        // War
        // army 1 East >, army 2 West <
        if (rando === 0 || rando === 2 || rando === 4) {
          if (column > 3 / 5 * this.width && this.army1size % 2 === 1) {
            this.cells.foreground[row][column] = 1;
            this.army1size++;
          } else if (column > 3 / 5 * this.width && this.army1size % 2 === 0) {
            this.cells.foreground[row][column] = 0;
            this.army1size++;
          } else {
            this.cells.foreground[row][column] = 0;
          }
        } else {
          if (column < 2 / 5 * this.width && this.army2size % 2 === 1) {
            this.cells.foreground[row][column] = 2;
            this.army2size++;
          } else if (column < 2 / 5 * this.width && this.army2size % 2 === 0) {
            this.cells.foreground[row][column] = 0;
            this.army2size++;
          } else {
            this.cells.foreground[row][column] = 0;
          }
        }
      }
    }
  };

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let kill = (row, column) => {
      // Conway
      // //if 200,200
      // //West
      // //row = y, column = x
      // let count = 0;
      // if (column > 0) {
      //   //199,200
      //   if (this.Buffer[row][column - 1] === 1) {
      //     count++;
      //   }
      // }
      // //North-West
      // if (column > 0 && row > 0) {
      //   //199,199
      //   if (this.Buffer[row - 1][column - 1] === 1) {
      //     count++;
      //   }
      // }
      // //North
      // if (row > 0) {
      //   //200,199
      //   if (this.Buffer[row - 1][column] === 1) {
      //     count++;
      //   }
      // }
      // //North-East
      // if (row > 0 && column < this.width - 1) {
      //   //201,199
      //   if (this.Buffer[row - 1][column + 1] === 1) {
      //     count++;
      //   }
      // }
      // //East
      // if (column < this.width - 1) {
      //   //201,200
      //   if (this.Buffer[row][column + 1] === 1) {
      //     count++;
      //   }
      // }
      // //South-East
      // if (column < this.width - 1 && row < this.height - 1) {
      //   //201,201
      //   if (this.Buffer[row + 1][column + 1] === 1) {
      //     count++;
      //   }
      // }
      // //South
      // if (row < this.height - 1) {
      //   //200,201
      //   if (this.Buffer[row + 1][column] === 1) {
      //     count++;
      //   }
      // }
      // //South-West
      // if (row < this.height - 1 && column > 0) {
      //   //199,201
      //   if (this.Buffer[row + 1][column - 1] === 1) {
      //     count++;
      //   }
      // }
      // return count;

      let count = 0;
      // War
      // Army 1
      if (this.Buffer[row][column] === 1) {
        // //West
        //row = y, column = x
        if (column > 0) {
          //199,200
          if (this.Buffer[row][column - 1] === 2) {
            count++;
          }
        }
        //North-West
        if (column > 0 && row > 0) {
          //199,199
          if (this.Buffer[row - 1][column - 1] === 2) {
            count++;
          }
        }
        //North
        if (row > 0) {
          //200,199
          if (this.Buffer[row - 1][column] === 2) {
            count++;
          }
        }
        //North-East
        if (row > 0 && column < this.width - 1) {
          //201,199
          if (this.Buffer[row - 1][column + 1] === 2) {
            count++;
          }
        }
        //South-East
        if (column < this.width - 1 && row < this.height - 1) {
          //201,201
          if (this.Buffer[row + 1][column + 1] === 2) {
            count++;
          }
        }
        //South
        if (row < this.height - 1) {
          //200,201
          if (this.Buffer[row + 1][column] === 2) {
            count++;
          }
        }
        //South-West
        if (row < this.height - 1 && column > 0) {
          //199,201
          if (this.Buffer[row + 1][column - 1] === 2) {
            count++;
          }
        }
      }

      // Army 2
      if (this.Buffer[row][column] === 2) {
        //North-West
        if (column > 0 && row > 0) {
          //199,199
          if (this.Buffer[row - 1][column - 1] === 1) {
            count++;
          }
        }
        //North
        if (row > 0) {
          //200,199
          if (this.Buffer[row - 1][column] === 1) {
            count++;
          }
        }
        //North-East
        if (row > 0 && column < this.width - 1) {
          //201,199
          if (this.Buffer[row - 1][column + 1] === 1) {
            count++;
          }
        }
        //East
        if (column < this.width - 1) {
          //201,200
          if (this.Buffer[row][column + 1] === 1) {
            count++;
          }
        }
        //South-East
        if (column < this.width - 1 && row < this.height - 1) {
          //201,201
          if (this.Buffer[row + 1][column + 1] === 1) {
            count++;
          }
        }
        //South
        if (row < this.height - 1) {
          //200,201
          if (this.Buffer[row + 1][column] === 1) {
            count++;
          }
        }
        //South-West
        if (row < this.height - 1 && column > 0) {
          //199,201
          if (this.Buffer[row + 1][column - 1] === 1) {
            count++;
          }
        }
      }
      return count;
    };

    // for (let row = 0; row < this.height; row++) {
    //   for (let column = 0; column < this.width; column++) {
    //     Conway;
    //     let death = kill(row, column);
    //     //alive
    //     if (this.Buffer[row][column] === 1) {
    //       // Any live cell with fewer than two live neighbors dies, as if caused by under population.
    //       // Any live cell with two or three live neighbors lives on to the next generation.
    //       // Any live cell with more than three live neighbors dies, as if by overpopulation.
    //       if (death < 2 || death > 3) {
    //         this.cells.background[row][column] = 0;
    //       } else {
    //         this.cells.background[row][column] = this.Buffer[row][column];
    //       }
    //     }
    //     //dead
    //     else {
    //       // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    //       if (death === 3) {
    //         this.cells.background[row][column] = 1;
    //       } else {
    //         this.cells.background[row][column] = this.Buffer[row][column];
    //       }
    //     }
    //   }
    // }

    //War
    let bool = false;
    for (let row1 = 0, row2 = this.height - 1; row1 < this.height, row2 >= 0; row1++, row2--) {
      for (let column1 = 0, column2 = this.width - 1; column1 < this.width, column2 >= 0; column1++, column2--) {
        //army 1
        let death = kill(row1, column1);
        if (this.Buffer[row1][column1] === 1) {
          // console.log(death);
          //march forward
          if (death === 0) {
            // console.log("march 1")
            this.cells.background[row1][column1 - 1] = 1;
            this.cells.background[row1][column1] = 0;
          }
          //die
          else if (death >= 2) {
            // console.log('die 1')
            this.cells.background[row1][column1] = 3;
            this.army1size--;
          }
          //battle
          else if (death === 1) {
            let battle = Math.round(Math.random());
            // console.log('battle 1', battle);
            //won battle, march forward
            if (battle === 1) {
              this.cells.background[row1][column1 - 1] = 1;
              this.cells.background[row1][column1] = 0;
            }
            //lost battle, die
            else {
              this.cells.background[row1][column1] = 3;
              this.army1size--;
            }
          }
        }
        //army 2
        else if (this.Buffer[row2][column2] === 2) {
          let death = kill(row2, column2);
          //march forward
          if (death === 0) {
            // console.log("march 2")
            this.cells.background[row2][column2 + 1] = 2;
            this.cells.background[row2][column2] = 0;
          }
          //die
          else if (death >= 2) {
            // console.log('die 2')
            this.cells.background[row2][column2] = 3;
            this.army2size--;
          }
          //battle
          else if (death === 1) {
            let battle = Math.round(Math.random());
            // console.log('battle 2', battle);
            //won battle, march forward
            if (battle === 1) {
              this.cells.background[row2][column2 + 1] = 2;
              this.cells.background[row2][column2] = 0;
            }
            //lost battle, die
            else {
              this.cells.background[row2][column2] = 3;
              this.army2size--;
            }
          }
        }
        //empty
        else if (this.Buffer[row2][column2] === 0) {
          // console.log("empty")
          this.cells.background[row2][column2] = 0;
        }
        //dead
        else if (this.Buffer[row2][column2] === 3) {
          // console.log("dead")
          this.cells.background[row2][column2] = 3;
        }
      }
    }
    this.count++;
    if(this.count === this.width) {
      this.done = true;
    }
    let temp = this.cells.foreground;
    this.cells.foreground = this.cells.background;
    this.cells.background = temp;
    this.Buffer = temp;
  }
}

export default Life;
