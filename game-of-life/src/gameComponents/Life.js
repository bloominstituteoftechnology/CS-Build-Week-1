let Life=class {
    constructor(){
        this.grid=[];
    }
    runIteration(board){
        const newBoard = board.map(arr=>[...arr]);
        const height=board.length;
        const width=board[0].length;
        for (let i=0; i<height; i++) {
          for (let j=0; j<width; j++) {
            const neighbors=this.getNeighbors(board,i,j);
            if (neighbors===3 && !board[i][j].currentState) {
              newBoard[i][j].currentState=1;
            } else if ((neighbors===2 || neighbors===3) && board[i][j].currentState) {
              newBoard[i][j].currentState=1;
            } else {
              newBoard[i][j].currentState=0;
            }
          }
        }
        this.grid=newBoard;
        return this.grid;
      };
      getNeighbors(board,i,j){
        const height=board.length;
        const width=board[0].length;
        let count=0;
        for (let x=-1;x<=1;x++) {
          for (let y=-1;y<=1;y++) {
            if (!x && !y) {
              continue;
            }
            const x_index=x+i;
            const y_index=y+j;
            if (x_index>=0 && x_index<width && y_index>=0 && y_index<height) {
              if (board[x_index][y_index].currentState) {
                count++;
              }
            }
          }
        }
        return count;
      }
    createGrid(){
        this.grid=[];
            for (let i=0; i<15; i++) {
                this.grid[i]=[];
                for (let j=0; j<15; j++) {
                    this.grid[i].push({currentState:0,isClickable:true});
                }
            }
        return this.grid;
        }
    changeClickState(){
        for (let i=0; i<this.grid.length;i++) {
            for (let j=0; j<this.grid[0].length; j++) {
                this.grid[i][j].isClickable=!this.grid[i][j].isClickable;
            }
        }
    }
}
export default Life;