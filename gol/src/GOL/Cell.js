
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
    this.active = false;
    this.id = null;
    this.x = i;
    this.y = j;
    this.width = 20;
    this.height = 20;
    this.p = p;
    this.activeFill = "#cc527a";
    this.inactiveFill = "#d11554";
  }

  toggleActive = () => {
    this.active = (this.active == false) ? true : false;
  }
  
  clicked = (x,y) => {
    if(x >= this.x*this.width && x < this.x*this.width+20){
      if(y >= this.y * this.width+20 && y < this.y * this.width+40){
        this.toggleActive();
      }
    }
  }

  setFill = () => {
    if(this.active == true){
      this.fill = this.activeFill;
    } else if (this.active == false) {
      this.fill = this.inactiveFill;
    }
    return this.fill;
  }

  createRect = () => {
    let fillV = this.setFill();
    this.p.noStroke();
    this.p.rect(this.x*this.width, this.y*this.width, this.width-1, this.width-1);
    this.p.fill(fillV);
  };
}
  
export default Cell;