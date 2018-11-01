class Life {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cellSize = 10;
        this.cells = [[], []];

        this.cellWidth = this.width / this.cellSize;
        this.cellHeight = this.height / this.cellSize;

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

    pasteCells(x, y, name) {
        let cells = {
            glider: [[x, y - 1], [x, y + 1], [x + 1, y], [x + 1, y + 1], [x - 1, y + 1]],
            spaceship: [[x - 2, y + 1], [x - 2, y - 1], [x + 1, y + 1], [x + 2, y], [x + 2, y - 1], [x + 2, y - 2], [x + 1, y - 2], [x, y - 2], [x - 1, y - 2]],
            tumbler: [[x + 1, y], [x + 1, y - 1], [x + 1, y - 2], [x + 1, y - 3], [x + 1, y - 4], [x + 2, y - 3], [x + 2, y - 4], [x + 2, y + 1], [x + 3, y],
            [x + 3, y + 1], [x + 3, y - 1], [x - 1, y], [x - 1, y - 1], [x - 1, y - 2], [x - 1, y - 3], [x - 1, y - 4], [x - 2, y - 3], [x - 2, y - 4], [x - 2, y + 1],
            [x - 3, y], [x - 3, y + 1], [x - 3, y - 1]]
        };

        for (let i = 0; i < cells[name].length; i++) {
            const index = (Math.ceil(this.cellHeight) * cells[name][i][0]) + cells[name][i][1];
            const cell = this.cells[this.buffer][index];
            if (cell) {
                cell.alive = true;
            }
        }
    }

    toggleCell(x, y) {
        const index = (Math.ceil(this.cellHeight) * x) + y;
        const cell = this.cells[this.buffer][index];
        if (cell) {
            cell.alive = !cell.alive;
        }
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

    findNeighbors(x, y) {
        const index = (Math.ceil(this.cellHeight) * x) + y;
        const cell = this.cells[this.buffer][index];
        return cell && cell.alive ? 1 : 0;
    }

    step() {
        let cells = this.cells[this.buffer];
        let cellsBuffer = this.cells[this.buffer === 0 ? 1 : 0];
        let cellWidth = Math.ceil(this.cellWidth);
        let cellHeight = Math.ceil(this.cellHeight);

        for (let x = 0; x < cellWidth; x++) {
            for (let y = 0; y < cellHeight; y++) {
                let NORTH = (cellHeight + y - 1) % cellHeight;
                let SOUTH = (cellHeight + y + 1) % cellHeight;

                let EAST = (cellWidth + x + 1) % cellWidth;
                let WEST = (cellWidth + x - 1) % cellWidth;

                let neighbors =
                    this.findNeighbors(EAST, NORTH) + this.findNeighbors(WEST, NORTH) +
                    this.findNeighbors(EAST, SOUTH) + this.findNeighbors(WEST, SOUTH) +
                    this.findNeighbors(x, SOUTH) + this.findNeighbors(x, NORTH) +
                    this.findNeighbors(EAST, y) + this.findNeighbors(WEST, y);

                let i = (Math.ceil(this.cellHeight) * x) + y;

                if (cells[i].alive) {
                    if (neighbors < 2 || neighbors > 3) {
                        cellsBuffer[i].alive = false;
                    } else if (neighbors === 2 || neighbors === 3) {
                        cellsBuffer[i].alive = true;
                    }
                } else {
                    if (neighbors === 3) {
                        cellsBuffer[i].alive = true;
                    } else {
                        cellsBuffer[i].alive = false;
                    }
                }
            }
        }
        this.buffer = this.buffer === 0 ? 1 : 0;
    }
}

export default Life;

