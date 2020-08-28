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

  getPattern(patName, context, retObj) {
    if (patName in patterns) {
      this.clearAll(context);

      if (
        patterns[patName].width < this.w &&
        patterns[patName].length < this.l
      ) {
        let centerCoords = {
          x: parseInt(this.w / 2 - 1),
          y: parseInt(this.l / 2 - 1),
        };
        console.log("center coords are", centerCoords);
        let width = patterns[patName].width;
        let length = patterns[patName].length;

        let patternStart = {
          x: centerCoords.x - parseInt(width / 2),
          y: centerCoords.y - parseInt(length / 2),
        };

        let maxY = patternStart.y + length;
        let maxX = patternStart.x + width;
        let pString = patterns[patName].pattern;
        let currentCoords = { ...patternStart };
        for (let i = 0; i <= pString.length; i++) {
          if (pString.charAt(i) === "*") {
            this.thing[currentCoords.x][currentCoords.y].resurrect(context);
          }
          if (currentCoords.x < maxX) {
            currentCoords.x += 1;
          } else {
            currentCoords.x = patternStart.x;

            if (currentCoords.y < maxY) {
              currentCoords.y += 1;
            }
          }
        }

        //do stuff
      } else {
        retObj = {
          minWidth: patterns[patName].width + 1,
          minHeight: patterns[patName].length + 1,
        };
      }
    } else {
      //pattern not found or you mistyped it somewhere
    }
    return retObj;
  }

  update() {}

  randomize(context) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.l; j++) {
        this.thing[i][j].alive = Math.random() > 0.5;
        this.thing[i][j].draw(context);
      }
    }
  }

  drawAll(context) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.l; j++) {
        this.thing[i][j].draw(context);
      }
    }
  }
  clearAll(context) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.l; j++) {
        this.thing[i][j].kill(context);
      }
    }
  }
  setUp() {
    for (let i = 0; i < this.w; i++) {
      this.thing.push([]);
      // console.log(this.thing);
      // console.log("we pushin ", this.thing.length);
      for (let j = 0; j < this.l; j++) {
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
