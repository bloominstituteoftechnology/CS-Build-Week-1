function Cell(x, y, _cells) {
  this.isAlive = false;
  this.x = x;
  this.y = y;
  this.neighbors = null;
  this.countN = function() {
    return this.neighbors.filter(function(cell) {
      return cell.isAlive;
    }).length;
  };
};
