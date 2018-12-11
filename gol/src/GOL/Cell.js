
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
    this.active = 1;
    this.id = null;
    this.x = i;
    this.y = j;
    this.width = 20;
    this.height = 20;
    this.p = p;
    this.activeFill = "#cc527a";
    this.inactiveFill = "#d11554";
  }
  
  setXAndY = () => {
    
  };

  setFill = () => {
    if(this.active == 0){
      this.fill = this.activeFill;
    } else {
      this.fill = this.inactiveFill;
    }
    return this.fill;
  }

  createRect = () => {
    let fillV = this.setFill();
    console.log(fillV);
    
    this.p.noStroke();
    this.p.rect(this.x*this.width, this.y*this.width, this.width-1, this.width-1);
    this.p.fill(fillV);
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