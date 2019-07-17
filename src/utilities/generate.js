export default function generate(gridSize, cellData) {
  const tempCellData = cellData.map((cell, index) => {
    let neighbors = 0;
    // handle corners first
    if (index === 0) {
      // upper left corner
      cellData[cellData.length - 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[cellData.length - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[cellData.length - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[2 * gridSize - 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[gridSize] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[gridSize + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
    } else if (index === gridSize - 1) {
      // upper right corner
      cellData[cellData.length - 2] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[cellData.length - 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[cellData.length - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
    } else if (index === cellData.length - gridSize) {
      // lower left corner
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[cellData.length - 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
    } else if (index === cellData.length - 1) {
      // lower right corner
      cellData[index - (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (2 * gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[gridSize - 2] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[gridSize - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[0] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      // now handle non-corner edges
    } else if (index < gridSize - 1) {
      // non-corner upper edges
      cellData[index + gridSize * (gridSize - 1) - 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize * (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize * (gridSize - 1) + 1] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
    } else if (index % gridSize === 0) {
      // non-corner left edges
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + (2 * gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
    } else if ((index + 1) % gridSize === 0) {
      // non-corner right edges
      cellData[index - (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (2 * gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
    } else if (index > cellData.length - gridSize && index < cellData.length) {
      // non-corner lower edges
      cellData[index - (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index - (gridSize * (gridSize - 1) - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - gridSize * (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (gridSize * (gridSize - 1) + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      // now handle non-corner, non-edges
    } else {
      cellData[index - (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index - 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + 1] % 10 === 1 ? (neighbors += 1) : (neighbors += 0);
      cellData[index + (gridSize - 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + gridSize] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
      cellData[index + (gridSize + 1)] % 10 === 1
        ? (neighbors += 1)
        : (neighbors += 0);
    }
    if (cell % 10 === 1) {
      if (neighbors < 2 || neighbors > 3) {
        return 10;
      } else if (cell < 32) {
        return cell + 10;
      } else {
        return cell;
      }
    } else if (neighbors === 3) {
      return 11;
    } else if (cell < 32) {
      return cell + 10;
    } else {
      return cell;
    }
  });
  return tempCellData;
}
