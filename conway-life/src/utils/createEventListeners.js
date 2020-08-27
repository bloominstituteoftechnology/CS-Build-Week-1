export function createEventListeners({
  canvas,
  pL,
  pT,
  pR,
  pB,
  height,
  width,
  cellSizePx,
  nX,
  nY,
  cells,
  stopAnimation,
  update,
}) {
  let cellLeft = canvas.offsetLeft - window.pageXOffset;
  let cellTop = canvas.offsetTop;
  let context = canvas.getContext("2d");
  function reOffset() {
    let BB = canvas.getBoundingClientRect();
    cellLeft = canvas.offsetLeft - window.pageXOffset;
    cellTop = canvas.offsetTop;
  }

  window.onscroll = function (e) {
    reOffset();
  };
  window.onresize = function (e) {
    reOffset();
  };
  canvas.addEventListener("click", function (event) {
    console.log("click registered");
    let cellLeft = canvas.offsetLeft,
      cellTop = canvas.offsetTop;
    if (stopAnimation == true) {
      let xClick = event.pageX - cellLeft,
        yClick = event.pageY - cellTop;
      let relX = xClick - pL,
        relY = yClick - pT;
      //   console.log("you clicked the coords: ", relX, relY);
      if (
        pL < xClick &&
        xClick <= width - pR &&
        pB <= yClick &&
        yClick <= height - pT
      ) {
        let xNum = Math.ceil(relX / cellSizePx) - 1;
        let yNum = Math.ceil(relY / cellSizePx) - 1;
        //use xnum and ynum to point to squares you absolute loon

        let squareNum = xNum + 1 + nX * yNum;
        console.log("you clicked square number ", squareNum);
        if (cells[xNum][yNum].alive) {
          cells[xNum][yNum].alive = false;
          cells[xNum][yNum].context = context;
          cells[xNum][yNum].draw(context);

          update(cells, cellSizePx / 2);
        } else {
          cells[xNum][yNum].context = context;
          cells[xNum][yNum].alive = true;
          cells[xNum][yNum].draw(context);
          update(cells, cellSizePx / 2);
        }
      }
    } else {
      //   console.log("You cannot modify units while in play!");
    }
  });
}
