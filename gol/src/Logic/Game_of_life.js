
class Game_of_life {
    constructor(aliveOrganizms = new Map(), generation = 0){
        this.aliveOrganizms = aliveOrganizms;
        this.generation = generation;
        this.nextIteration = new Map();
        this.deadCells = new Map();
    }

    generate() {
        return this.generation;
    }

    iteration() {
        this.aliveOrganizms.forEach((cell) => {
            this.liveCellsCount(cell);
        })
        this.deadCells.forEach((cell) => {
            this.deadCellsCount(cell);
        })
        this.generation ++;

        return new Game_of_life(this.nextIteration, this.generation);
    }

    alive() {
        return this.aliveOrganizms;
    }

    newCell (coordinates) {
        this.aliveOrganizms.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
    }

    deleteCell (coordinates) {
        this.aliveOrganizms.delete(coordinates);
    }

    aliveCells (coordinates) {
        return this.aliveOrganizms.has(coordinates);
    }

    toggleCell (coordinates) {
        if (this.aliveCells(coordinates.x + "," + coordinates.y)){
            this.deleteCell(coordinates.x + "," + coordinates.y);
            console.log("Delete cell")
        } else {
            this.newCell(coordinates);
            console.log("New Cell")
        }
        return new Game_of_life(this.aliveOrganizms, this.generation);
    }

    ///////// Game rules goes here///////////

    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

    // Need to check for any live nextdoor cells
    liveCellsCount (coordinates) {
        let nextdoorCells = 0;

        for (let i = coordinates.x - 1; i <= coordinates.x + 1; i++) {
            for (let j = coordinates.y - 1; j <= coordinates.y + 1; j++) {
                if (i === coordinates.x && j === coordinates.y) {
                    continue;
                }
                // Alve nexdoor cell is added to the nexdoorCells count.
                // Otherwises it is added to the deadCells
                if (this.aliveCells(i + "," + j)) {
                    nextdoorCells ++;
                } else {
                    this.deadCells.set(i + "," + j, {x: i, y: j});
                }
            }
        }

        // Any live cell with two or three live neighbors lives on to the next generation.
        if (nextdoorCells === 2 || nextdoorCells === 3) {
            this.nextIteration.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
        }

    }
    // Need to check for any dead nextdoor cells
    deadCellsCount (coordinates) {
        let nextdoorCells = 0;

        for (let i = coordinates.x - 1; i <= coordinates.x + 1; i++) {
            for (let j = coordinates.y - 1; j <= coordinates.y + 1; j++) {
                if (i === coordinates.x && j === coordinates.y) {
                    continue;
                }
                if (this.aliveCells(i + "," + j)) {
                    nextdoorCells ++;
                }
            }
        }

        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        if (nextdoorCells === 3) {
            this.nextIteration.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
        }
    }
}
 
export default Game_of_life;
