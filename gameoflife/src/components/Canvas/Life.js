class Life {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cellSize = 10;
        this.cells = [[], []];

        this.cellWidth = Math.floor(this.width / this.cellSize);
        this.cellHeight = Math.floor(this.height / this.cellSize);

        for (let x = 0; x < this.cellWidth; x++) {
            for (let y = 0; y < this.cellHeight; y++) {
                this.cells[0].push({ coords: [x, y], alive: false });
                this.cells[1].push({ coords: [x, y], alive: false });
            }
        }

        this.buffer = 0;
    }

    getCells() {
        return this.cells[this.buffer];
    }

    getCellSize() {
        return this.cellSize;
    }

    toggleCell(x, y) {
        const index = (this.cellHeight * x) + y;
        const cell = this.cells[this.buffer][index];
        cell.alive = !cell.alive;
    }

    clearCells() {
        this.cells[this.buffer].forEach(cell => {
            if (cell.alive) {
                cell.alive = !cell.alive;
            }
        });
    }

    randomize() {
        this.cells[this.buffer].forEach(cell => {
            if (Math.random() >= 0.5) {
                cell.alive = !cell.alive;
            }
        });
    }

    calculateGeneration(gen) {
        for (let i = 0; i < gen; i++) {
            this.step();
        }
    }

    step() {
        let cells = this.cells[this.buffer];
        let cellsBuffer = this.cells[this.buffer === 0 ? 1 : 0];
        let cellWidth = this.cellWidth;
        let cellHeight = this.cellHeight;

        for (let i = 0; i < cells.length; i++) {
            let neighbors = 0;
            let x = cells[i].coords[0];
            let y = cells[i].coords[1];

            // North
            if (y > 0 && cells[i - 1].alive) {
                // console.log('NORTH ' + cells[i - 1].coords);
                neighbors++;
            }
            // North-West
            if (y > 0 && x > 0 && cells[i - cellHeight - 1].alive) {
                // console.log('NORTH-WEST ' + cells[i - cellHeight - 1].coords);
                neighbors++;
            }
            // North-East
            if (y > 0 && x < cellWidth - 1 && cells[i + cellHeight - 1].alive) {
                // console.log('NORTH-EAST ' + cells[(i + cellHeight) - 1].coords);
                neighbors++;
            }
            // South
            if (y < cellHeight - 1 && cells[i + 1].alive) {
                // console.log('SOUTH ' + cells[i + 1].coords);
                neighbors++;
            }
            // South-West
            if (y < cellHeight - 1 && x > 0 && cells[i + 1 - cellHeight].alive) {
                // console.log('SOUTH-WEST ' + cells[i + 1 - cellHeight].coords);
                neighbors++;
            }
            // South-East
            if (y < cellHeight - 1 && x < cellWidth - 1 && cells[i + 1 + cellHeight].alive) {
                // console.log('SOUTH-EAST ' + cells[i + 1 + cellHeight].coords);
                neighbors++;
            }
            // West
            if (x > 0 && cells[i - cellHeight].alive) {
                // console.log('WEST ' + cells[i - cellHeight].coords);
                neighbors++;
            }
            // East
            if (x < cellWidth - 1 && cells[i + cellHeight].alive) {
                // console.log('EAST ' + cells[i + cellHeight].coords);
                neighbors++;
            }

            if (cells[i].alive) {
                if (neighbors < 2) {
                    cellsBuffer[i].alive = false;
                } else if (neighbors === 2 || neighbors === 3) {
                    cellsBuffer[i].alive = true;
                } else {
                    cellsBuffer[i].alive = false;
                }
            } else {
                if (neighbors === 3) {
                    cellsBuffer[i].alive = true;
                } else {
                    cellsBuffer[i].alive = false;
                }
            }
        }
        this.buffer = this.buffer === 0 ? 1 : 0;
    }
}

export default Life;

