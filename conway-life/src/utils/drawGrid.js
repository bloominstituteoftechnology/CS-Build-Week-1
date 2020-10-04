export const drawGrid = ({
  context,
  grid,
  s,
  pL,
  pR,
  pT,
  pB,
  nX,
  nY,
  gridHeight,
  gridWidth,
}) => {
  context.strokeStyle = "black";
  context.beginPath();
  console.log("counts ", nX, nY);
  //recalcuate offsets to avoid hellish nightmare --- move this to live with event listener
  context.lineWidth = 1;
  for (let x = pL; x <= gridWidth - pR; x += s) {
    context.moveTo(x, pT);
    for (let y = pT; y < gridHeight - pB; y += s) {}
    context.lineTo(x, gridHeight - pB);
  }
  for (let y = pT; y <= gridHeight - pB; y += s) {
    context.moveTo(pL, y);
    context.lineTo(gridWidth - pR, y);
  }
  context.stroke();
};
