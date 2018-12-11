
/**
 * Palette:
lite gray: #a8a7a8
matte pink: #cc527a
brite pink: #e8175d
med gray: #474747
dark gray: #363636
 */

class Cell {
  constructor(p, i, j, fill){
    this.active = 0;
    this.id = null;
    this.x = i;
    this.y = j;
    this.width = 20;
    this.height = 20;
    this.p = p;
    this.fill = fill;
  }
  
  setXAndY = () => {
    
  };

  createRect = () => {
    this.p.noStroke();
    this.p.rect(this.x*this.width, this.y*this.width, this.width-1, this.width-1);
    this.p.fill(this.fill);
  };
}


  // Set key value:
  // setKey = () => {

  // };

  // Swap state.alive value:
  // toggleAlive = () => {

  // };

  // Determine if cell was clicked:
  // onclick = (mx, my) => {

  // };

  
export default Cell;