class Life {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cellSize = 10;
        this.cells = [];
        for (let x = 0; x < this.width / this.cellSize; x++) {
            for (let y = 0; y < this.height / this.cellSize; y++) {
                this.cells.push({ coords: [x, y], alive: false });
            }
        }
    }

    getCells() {
        return this.cells;
    }

    toggleCell(x, y) {
        const index = this.cells.findIndex(element => {
            return element.coords[0] === x && element.coords[1] === y;
        });
        this.cells[index].alive = !this.cells[index].alive;
    }

    clearCells() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].alive === true) {
                this.cells[i].alive = false;
            }
        }
    }

}

export default Life;

