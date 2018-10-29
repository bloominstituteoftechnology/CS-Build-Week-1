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
}

export default Life;

