import GridConstants from './GridConstants';
import Cell from './Cell';
/**
 * Palette:
lite gray: #a8a7a8
matte pink: #cc527a
brite pink: #e8175d
med gray: #474747
dark gray: #363636
 */



function sketch (p){

  const cols = GridConstants.num_cols;
  const rows = GridConstants.num_rows;
  let parentW = document.querySelector(".sketch-container").clientWidth;
  let parentH = document.querySelector(".sketch-container").clientHeight;
  let currGrid = [[]], nextGrid = [[]];
  let cellFill = "#cc527a";
  let isBlasting = false;

  p.preload = () => {};

  const createCells = () => {
    for (let i=0; i<cols; i++){
        currGrid[i] = [];
        for(let j=0; j<rows; j++){
          currGrid[i][j] = new Cell(p, i, j, cellFill);
        }
    }
    nextGrid = currGrid;
  };
  
  p.arbitrary = (props) => {
    console.log(props);
    if(props.data.isRollin == true){
      blastEm();
    }
  }

  p.setup = () => {
    p.pixelDensity(1);
    p.createCanvas(parentW,parentH);
    createCells();
    p.background("#e8175d");
  };

  p.draw = () => {
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        currGrid[i][j].createRect();
      }
    }
  };

  p.mousePressed = () => {
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        currGrid[i][j].clicked(p.mouseX, p.mouseY);
      }
    }
  }

  const blastEm = () => {
    console.log("Blast'em");
    console.log(isBlasting); 
  }

  const clearEm = () => {
    
  }
}

export default sketch;
