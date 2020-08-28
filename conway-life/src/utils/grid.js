import { Cell } from "./cell";
import { patterns } from "./patterns";

export class Grid {
  // Set the size for each Grid

  constructor({ l, w, cellSize, context, pL, pT }) {
    this.l = l;
    this.w = w;
    this.thing = [];
    this.context = context;
    this.cellSize = cellSize;
    this.pL = pL;
    this.pT = pT;
  }

  getPattern(patName, context) {
    if (patName in patterns) {
      this.clearAll(context);
      let centerCoords = { x: this.w / 2 - 1, y: this.l / 2 - 1 };
      console.log(centerCoords);
      let width = patterns[patName].width;
      let length = patterns[patName].length;
      let patternStart = {
        x: centerCoords.x - width / 2,
        y: centerCoords.y - length / 2,
      };
      console.log(patternStart);
      let pString = patterns[patName].pattern;
      let currentCoords = patternStart;
      for (let i = 0; i < pString.length; i++) {
        console.log(pString.charAt(i));
        if (i % width === 0) {
          currentCoords.y += 1;
        }
        if (pString.charAt(i) === "*") {
          console.log(currentCoords.x);
          this.thing[currentCoords.x][currentCoords.y].resurrect(context);
        }
        if (currentCoords.x < patternStart.x + width) {
          console.log(currentCoords.x);
          currentCoords.x += 1;
        } else {
          currentCoords.x = patternStart.x;
        }
      }

      //do stuff
    } else {
      //pattern not found or you mistyped it somewhere
    }
  }

  update() {
    // cell.livingNeighbors = livingNeighbors;
    // livingNeighbors = 0;
    // console.log("new ", cell);
    // console.log("old ", this.thing[i][j]);
    // if (cell.alive === true) {
    //   if (cell.livingNeighbors < 2 || cell.livingNeighbors > 3) {
    //     console.log(cell);
    //     console.log("he gotta die sorry");
    //     cell.die();
    //   }
    // } else {
    //   if (cell.livingNeighbors === 3) {
    //     // cell.resurrect();
    //   }
    // }
    // newThing[i][j] = cell;
  }

  randomize(context) {
    for (let i = 0; i < this.l; i++) {
      for (let j = 0; j < this.w; j++) {
        this.thing[i][j].alive = Math.random() > 0.5;
        this.thing[i][j].draw(context);
      }
    }
  }

  drawAll(context) {
    for (let i = 0; i < this.l; i++) {
      for (let j = 0; j < this.w; j++) {
        this.thing[i][j].draw(context);
      }
    }
  }
  clearAll(context) {
    for (let i = 0; i < this.l; i++) {
      for (let j = 0; j < this.w; j++) {
        this.thing[i][j].kill(context);
      }
    }
  }
  setUp() {
    for (let i = 0; i < this.l; i++) {
      this.thing.push([]);
      // console.log(this.thing);
      // console.log("we pushin ", this.thing.length);
      for (let j = 0; j < this.w; j++) {
        this.thing[i][j] = new Cell({
          context: this.context,
          x: i,
          y: j,
          size: this.cellSize,
          gridX: i * this.cellSize + this.pL + 1,
          gridY: j * this.cellSize + this.pT + 1,
          squareNum: i + 1 + this.w * j,
        });
        this.thing[i][j].findNeighbors(this.l, this.w);
        // console.log("created cell: ", this.thing[i][j]);
      }
    }
    console.log(this.thing);

    // console.log(
    //   "------------------------------------------------------------------------------------------------------------"
    // );
  }
}
