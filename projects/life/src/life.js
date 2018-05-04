/**
 * Implementation of Conway's game of Life
 */

const ALIVE = 1;
const DEAD = 0;
const ZOMBIE = 2;

// const HUMANvHUMAN = 0.0;
// const RUNvKILL = 0.9;

const HUMANvZOMBIE = 0.2; /* the chances a human will survive against a (horde of) zombie(s) */
const RUNAWAY = 0.59; /* chance a human will be able to run away from a zombie */
const FALLDOWN = 0.25; /* chance a human will fall down and succumb to zombie */
const ZOMBIEvHUMAN = 0.2; /* the chances a zombie will survive against a (group of) person(people) */

const PERSON_DEATH_CHANCE = 0.0002; /* this simulates a person dying from the zombie apocalypse and turning into a zombie */
const ZOMBIE_DEATH_CHANCE = 0.009; /* this simulates a zombie being rendered useless maybe from walking off a cliff or just decomposing */
const PERSON_BIRTH_CHANCE = 0.0009;

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
  constructor(width, height, steps, delay) {
    this.width = width;
    this.height = height;

    this.clock = 0 - delay;
    this.time = -0 - delay;
    this.steps = steps;

    this.i = 0;

    this.buffer = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height),
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.i];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let row = 0; row < this.height; row++) {
      this.buffer[this.i][row].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize(prob, zombie) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (row === zombie.y && col === zombie.x)
          this.buffer[this.i][row][col] = ZOMBIE;
        else
          this.buffer[this.i][row][col] = Math.random() < prob ? ALIVE : DEAD;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    if (this.time === this.steps) {
      const bI = this.i === 0 ? 1 : 0;
      const bB = this.buffer[bI];
      const cB = this.buffer[this.i];

      /* check state before moving */
      const checkState = (r, c) => {
        const status = cB[r][c];

        let human_neighbors = 0;
        let zombie_neighbors = 0;

        for (let x = r - 1; x <= r + 1; x++) {
          if (x < 0 || x > this.height - 1) {
            continue;
          }
          for (let y = c - 1; y <= c + 1; y++) {
            if (y < 0 || y > this.width - 1) {
              continue;
            }

            if (cB[x][y] === ALIVE && `${x}${y}` !== `${r}${c}`)
              human_neighbors++;
            else if (cB[x][y] === ZOMBIE && `${x}${y}` !== `${r}${c}`)
              zombie_neighbors++;
          }
        }

        if (status === DEAD) {
          const luck = Math.random();

          if (luck < PERSON_BIRTH_CHANCE && human_neighbors === 1) {
            /* if there are at only two people total */
            return ALIVE; /* if a person is born (ignore neighbors) */
          }

          return DEAD; /* dead spaces / the ground doesn't move / care about neighbors */
        }

        const human_ratio = human_neighbors / 8; /* up to 8 neighbors */
        const zombie_ratio = zombie_neighbors / 8; /* up to 8 neighbors */

        if (status === ALIVE) {
          const luck = Math.random();
          let new_state = ALIVE;

          /* for given HUMANvZOMBIE, if there is at least 2 zombie (2 / 8 = 0.25 > 0.2), turn into zombie */
          if (zombie_ratio > HUMANvZOMBIE) {
            // console.log(`human surrounded by zombie(s)! (${r},${c})`);
            new_state = ZOMBIE;

            if (luck < RUNAWAY) {
              // console.log(
              // `human ran away from zombie(s) and lived! (${r},${c})`,
              // );
              new_state = ALIVE;
            } else {
              // console.log(
              // `human couldn't run away and was turned into zombie! (${r},${c})`,
              // );
            }
          }

          if (zombie_neighbors > 0) {
            if (luck < FALLDOWN) {
              // console.log(`human fell down and was into zombie! (${r},${c})`);
              new_state = ZOMBIE;
            }
          }

          if (luck < PERSON_DEATH_CHANCE && new_state === ALIVE) {
            // console.log(`human died and turned into zombie! (${r},${c})`);
            new_state = ZOMBIE;
          }

          return new_state;
        }

        if (status === ZOMBIE) {
          const luck = Math.random();
          let new_state = ZOMBIE;

          /* for the given ZOMBIEvHUMAN, if there are at least 2 humans, 2 / 8 = 0.25 > 0.2, zombie dies */
          if (human_ratio > ZOMBIEvHUMAN) {
            // console.log(`zombie died from humans! (${r},${c})`);
            return DEAD;
          }

          if (luck < ZOMBIE_DEATH_CHANCE) {
            // console.log(`zombie died from elements! (${r},${c})`);
            return DEAD;
          }
          return new_state;
        }
      };

      /* randomly choose the next grid position */
      const calcNextPos = (r, c) => {
        /* 
          1 2 3
          4 5 6
          7 8 9
          
          5 = current position
          0 = re-roll
        */

        let nextPos = [-1, -1];
        let randomMove = 0;

        while (randomMove === 0) {
          randomMove = (Math.random() * 10) | 0;
        }

        switch (randomMove) {
          case 1:
            nextPos[0] = r - 1;
            nextPos[1] = c - 1;
            break;

          case 2:
            nextPos[0] = r - 1;
            nextPos[1] = c;
            break;

          case 3:
            nextPos[0] = r - 1;
            nextPos[1] = c + 1;
            break;

          case 4:
            nextPos[0] = r;
            nextPos[1] = c - 1;
            break;

          case 5:
            nextPos[0] = r;
            nextPos[1] = c;
            break;

          case 6:
            nextPos[0] = r;
            nextPos[1] = c + 1;
            break;

          case 7:
            nextPos[0] = r + 1;
            nextPos[1] = c - 1;
            break;

          case 8:
            nextPos[0] = r + 1;
            nextPos[1] = c;
            break;

          case 9:
            nextPos[0] = r + 1;
            nextPos[1] = c + 1;
            break;

          default:
            console.error(`Got ${randomMove} as randomMove`);
        }

        if (nextPos[0] < 0) {
          nextPos[0] = this.height - 1;
        }

        if (nextPos[1] < 0) {
          nextPos[1] = this.width - 1;
        }

        if (nextPos[0] > this.height - 1) {
          nextPos[0] = 0;
        }

        if (nextPos[1] > this.width - 1) {
          nextPos[1] = 0;
        }

        return nextPos;
      };

      /* move human / zombie */
      const nextMove = (r, c) => {
        const status = cB[r][c];

        let nextPos = calcNextPos(r, c);

        if (nextPos[0] === r && nextPos[1] === c) {
          return status; /* don't move */
        }

        /* check bB nextPos space */
        let cBNextPos = cB[nextPos[0]][nextPos[1]];

        /* if next pos is ground */
        if (cBNextPos === DEAD) {
          /* check to make sure bB is also ground */
          if (bB[nextPos[0]][nextPos[1]] === DEAD) {
            bB[nextPos[0]][nextPos[1]] = status;
            return DEAD;
          }
        }
        /**
         * otherwise there is a collision, so don't move
         * we can think of this as:
         * assume human saw zombie and returned to original pos or
         * assume zombie just returned to original pos
         *
         * one could do another neighbor check here though and `return`
         * accordingly, or just find a new position, but for simplicity
         * it was chosen to just avoid collisions by standing still
         */
        return status;

        // /* person */
        // if (status === ALIVE) {
        //   /* if next pos is occupied by a person */
        //   if (cBNextPos === ALIVE) {
        //     /* stand still */
        //     return ALIVE;

        //     // while (1) {
        //     //   if (Math.random() < HUMANvHUMAN)
        //     //     return DEAD; /* die to other human */

        //     //   /* survive */
        //     //   if (Math.random() < RUNvKILL) {
        //     //     /* run not kill */
        //     //     nextPos = calcNextPos(nextPos[0], nextPos[1]);
        //     //   } else {
        //     //     /* kill not run */
        //     //     bB[nextPos[0]][nextPos[1]] = DEAD; /* other cell is dead */
        //     //     return ALIVE; /* assume person goes back to original position */
        //     //   }
        //     // }
        //   }

        //   /* if next pos is occupied by a zombie */
        //   if (cBNextPos === ZOMBIE) {
        //     if (Math.random() < 1 - HUMANvZOMBIE)
        //       return ZOMBIE; /* die to zombie, zombie returns to original pos */

        //     bB[nextPos[0]][nextPos[1]] = ALIVE; /* move to new position, and */
        //     return DEAD; /* turn current position into ground */
        //   }

        //   /* else next pos is ground */
        //   bB[nextPos[0]][nextPos[1]] = ALIVE; /* move to next pos */
        //   return DEAD; /* leave current pos */
        // }

        // /* zombie */
        // if (status === ZOMBIE) {
        //   /* if next pos is occupied by a person */
        //   if (cBNextPos === ALIVE) {
        //     if (Math.random() < ZOMBIEvHUMAN) {
        //       bB[nextPos[0]][nextPos[1]] = ZOMBIE; /* turn zombie into human */
        //       return ZOMBIE; /* assume zombie returns to start pos */
        //     } else {
        //       return DEAD; /* zombie died to human */
        //     }
        //   }

        //   /* if next pos is zombie, just stay still (or assume zombie swaps position) */
        //   if (cBNextPos === ZOMBIE) {
        //     return ZOMBIE;
        //   }

        //   /* else next pos is ground possibly */
        //   if (cBNextPos === DEAD) {
        //     /* check to see if bB (about to be written) is ground (DEAD) */
        //     if (bB[nextPos[0]][nextPos[1]] !== DEAD) {
        //       return ZOMBIE; /* stay still (or assume swap) */
        //     } else {
        //       /* else it has NOT been written to */
        //       bB[nextPos[0]][nextPos[1]] = ZOMBIE;
        //       return DEAD;
        //     }
        //   }

        //   console.error('unknown zombie move');
        //   return status;
        // }

        // console.error('no move found. `return`ing status');
        // return status;
      };

      /* do neighbor check first */
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          cB[row][col] = checkState(row, col);
        }
      }

      /* copy updated neighbor state cB into bB */
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          bB[row][col] = cB[row][col];
        }
      }

      /* move humans and zombies (cB -> bB) */
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          /* only move if NOT ground */
          if (cB[row][col] !== DEAD) {
            bB[row][col] = nextMove(row, col);
          }
          /* copying cB into bB (above) will prevent empty grid spots in bB */
        }
      }

      this.i = this.i === 0 ? 1 : 0;

      this.time = 0;
      this.clock++;
    }

    this.time++;
  }
}

export default Life;
