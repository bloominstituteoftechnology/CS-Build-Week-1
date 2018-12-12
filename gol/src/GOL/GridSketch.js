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
  let currGrid = [[]], nextGrid = [[]]
  let cellFill = "#cc527a";
  let isBlasting = false;
  let generations = 0;

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
    if(props.data.isRollin == true){
      isBlasting = !isBlasting;
    }
  }

  p.setup = () => {
    p.frameRate(15);
    p.pixelDensity(1);
    p.createCanvas(parentW,parentH);
    createCells();
    p.background("#e8175d");
  };

  p.draw = () => {
    if(isBlasting == true){
      judgement();
    }
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        currGrid[i][j].createRect();
      }
    }
  };

  p.mousePressed = () => {
    if(isBlasting == true){
      return;
    }
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        currGrid[i][j].clicked(p.mouseX, p.mouseY);
      }
    }
  }

  const judgement = () => {
    
    for(let i=1; i<cols-1; i++){
      for( let j=1; j<rows-1; j++){
        let theLoving = 0;
        if(currGrid[i-1][j-1].getActivity() == true){theLoving++;}
        if(currGrid[i-1][j+1].getActivity() == true){theLoving++;}
        if(currGrid[i-1][j].getActivity() == true){theLoving++;}
        if(currGrid[i+1][j-1].getActivity() == true){theLoving++;}
        if(currGrid[i+1][j].getActivity() == true){theLoving++;}
        if(currGrid[i+1][j+1].getActivity() == true){theLoving++;}
        if(currGrid[i][j-1].getActivity() == true){theLoving++;}
        if(currGrid[i][j+1].getActivity() == true){theLoving++;}
        if(theLoving > 3 || theLoving < 2){
          if(currGrid[i][j].getActivity() == true){
            nextGrid[i][j].setActiveToFalse();
          }
        } else if (theLoving == 3) {
          if(currGrid[i][j].getActivity() == false){
            nextGrid[i][j].setActiveToTrue();
          }
        } else {
          nextGrid[i][j].setActivity(currGrid[i][j].getActivity());
        }
      }
    }

    let temp = currGrid;
    currGrid = nextGrid;
    nextGrid = temp;
    if(generations < 400){
      incrementGenerations();
    } else {
      return;
    }
  };

  const swapJudgement = (curr, next) => {
    let temp = [[]];
    temp = curr; 
    curr = next;
    next = temp;
    incrementGenerations();
  }

  const incrementGenerations = () => {
    generations += 1;
  }

  const clearEm = () => {
    for (let i=0; i<cols; i++){
      for (let j=0; j<rows; j++){
        currGrid[i][j].setActiveToFalse();
      }
    }
  }
}

export default sketch;
