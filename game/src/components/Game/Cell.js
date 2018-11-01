export default class Cell {
  constructor(isAlive = false, isClickable = false) {
    this.isAlive = this.isAlive;
    this.isClickable = this.isClickable;
  }

  create = () => {
    this.isAlive = true;
  }

  kill = () => {
    this.isAlive = false;
  }

  toggleState = () => {
    if (this.isAlive) {
      this.isAlive = false;
    } else {
      this.isAlive = true;
    }
  }

}
