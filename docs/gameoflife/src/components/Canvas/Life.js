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
        let cellWidth = Math.ceil(this.cellWidth);
        let cellHeight = Math.ceil(this.cellHeight);

        let NORTH = (cellHeight + y - 1) % cellHeight;
        let SOUTH = (cellHeight + y + 1) % cellHeight;

        let EAST = (cellWidth + x + 1) % cellWidth;
        let WEST = (cellWidth + x - 1) % cellWidth;

        let cells = {
            glider: [[x, NORTH], [x, SOUTH], [EAST, y], [EAST, SOUTH], [WEST, SOUTH]],
            spaceship: [[WEST - 1, SOUTH], [WEST - 1, NORTH], [EAST, SOUTH], [EAST + 1, y], [EAST + 1, NORTH], [EAST + 1, NORTH - 1], [EAST, NORTH - 1],
            [x, NORTH - 1], [WEST, NORTH - 1]],
            tumbler: [[EAST, y], [EAST, NORTH], [EAST, NORTH - 1], [EAST, NORTH - 2], [EAST, NORTH - 3], [EAST + 1, NORTH - 2], [EAST + 1, NORTH - 3],
            [EAST + 1, SOUTH], [EAST + 2, y], [EAST + 2, SOUTH], [EAST + 2, NORTH], [WEST, y], [WEST, NORTH], [WEST, NORTH - 1], [WEST, NORTH - 2],
            [WEST, NORTH - 3], [WEST - 1, NORTH - 2], [WEST - 1, NORTH - 3], [WEST - 1, SOUTH], [WEST - 2, y], [WEST - 2, SOUTH], [WEST - 2, NORTH]]
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

