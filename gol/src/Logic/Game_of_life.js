
class Game_of_life {
    constructor(aliveOrganizms = new Map()){
        
        this.aliveOrganizms = aliveOrganizms;
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

    toggleCell (coordinates){
        if (this.aliveCells(coordinates.x + "," + coordinates.y)){
            this.deleteCell(coordinates.x + "," + coordinates.y);
            console.log("Delete cell")
        } else {
            this.newCell(coordinates);
            console.log("New Cell")
        }
        return new Game_of_life(this.aliveOrganizms);
    }

    // Game rules goes here

    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
}
 
export default Game_of_life;
