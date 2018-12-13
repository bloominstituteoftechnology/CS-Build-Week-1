
export const cellInitAlgo = (gridSizeValue) => {
  let nextNodeHolder = [];
  class Node {
    constructor(id) {
      this.id = id;
      this.isAlive = false;
    }
  }
  for (let i = 0; i < gridSizeValue; i++) {
    nextNodeHolder.push([]);
  }
  let id = 0;
  for (let i = 0; i < nextNodeHolder.length; i++) {
    for (let j = 0; j < nextNodeHolder.length; j++) {
      nextNodeHolder[i].push(new Node(id));
      id++
    }
  }
  return nextNodeHolder;
}


export const cellPresetAlgo = (currentNodeHolder, target) => {
  let len = currentNodeHolder.length;
  let middleOfGrid = Math.floor(len / 2);
  if (target !== "") {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (currentNodeHolder[i][j].isAlive) {
          currentNodeHolder[i][j].isAlive = false;
        }
      }
    }
  }
  switch(target) {
    case 'Glider':
      currentNodeHolder[middleOfGrid][middleOfGrid].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid - 1][middleOfGrid - 1].isAlive = true;
      currentNodeHolder[middleOfGrid - 1][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid + 1][middleOfGrid].isAlive = true;
      break;
      case 'Acorn':
      currentNodeHolder[middleOfGrid][middleOfGrid].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 4].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 5].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 6].isAlive = true;
      currentNodeHolder[middleOfGrid - 2][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid - 1][middleOfGrid + 3].isAlive = true;
    break;
    case 'Blinkers':
      currentNodeHolder[middleOfGrid][middleOfGrid].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid - 1].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 4].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 5].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid + 6].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid - 4].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid - 5].isAlive = true;
      currentNodeHolder[middleOfGrid][middleOfGrid - 6].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid - 1].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid + 1].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid - 1].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid + 4].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid + 5].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid + 6].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid - 4].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid - 5].isAlive = true;
      currentNodeHolder[middleOfGrid + 4][middleOfGrid - 6].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid + 4].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid + 5].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid + 6].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid - 4].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid - 5].isAlive = true;
      currentNodeHolder[middleOfGrid - 4][middleOfGrid - 6].isAlive = true;
    break;
    case 'Random':
      let random;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          random = Math.random() * (20 - 1) + 1;
          if (random > 10) {
            currentNodeHolder[i][j].isAlive = true;
          }
        }
      }
    break;
    default:
    break;
  }
  return currentNodeHolder;
}


export const CellAlgo = (currentNodeHolder) => {
  let len = currentNodeHolder.length;
  let lenCheck = currentNodeHolder.length - 1;
  let nextNodeHolder = [];
  for (let i = 0; i < len; i++) {
    nextNodeHolder.push([]);
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      nextNodeHolder[i][j] = Object.assign({}, currentNodeHolder[i][j]);
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (currentNodeHolder[i][j].isAlive) {
        let checker = 0;
      
        if (i > 0 && j > 0 && currentNodeHolder[i-1][j-1]) {
          if (currentNodeHolder[i-1][j-1].isAlive) {
            checker++
          }
        }
        if (i > 0 && currentNodeHolder[i-1][j]) {
          if (currentNodeHolder[i-1][j].isAlive) {
            checker++
          }
        }
        if (i > 0 && j < lenCheck && currentNodeHolder[i-1][j+1]) {
          if (currentNodeHolder[i-1][j+1].isAlive) {
            checker++
          }
        }
        if (j > 0 && currentNodeHolder[i][j-1]) {
          if (currentNodeHolder[i][j-1].isAlive) {
            checker++
          }
        }
        if (j < lenCheck && currentNodeHolder[i][j+1]) {
          if (currentNodeHolder[i][j+1].isAlive) {
            checker++
          }
        }
        if (j > 0 && i < lenCheck && currentNodeHolder[i+1][j-1]) {
          if (currentNodeHolder[i+1][j-1].isAlive) {
            checker++
          }
        }
        if (i < lenCheck && currentNodeHolder[i+1][j]) {
          if (currentNodeHolder[i+1][j].isAlive) {
            checker++
          }
        }
        if (i < lenCheck && j < lenCheck && currentNodeHolder[i+1][j+1]) {
          if (currentNodeHolder[i+1][j+1].isAlive) {
            checker++
          }
        }
        if (checker === 2 || checker === 3) {
        } else {
          nextNodeHolder[i][j].isAlive = false;
        }
      }

      if (!currentNodeHolder[i][j].isAlive) {
        let checker = 0;
        
        if (i > 0 && j > 0 && currentNodeHolder[i-1][j-1]) {
          if (currentNodeHolder[i-1][j-1].isAlive) {
            checker++
          }
        }
        if (i > 0 && currentNodeHolder[i-1][j]) {
          if (currentNodeHolder[i-1][j].isAlive) {
            checker++
          }
        }
        if (i > 0 && j < lenCheck && currentNodeHolder[i-1][j+1]) {
          if (currentNodeHolder[i-1][j+1].isAlive) {
            checker++
          }
        }
        if (j > 0 && currentNodeHolder[i][j-1]) {
          if (currentNodeHolder[i][j-1].isAlive) {
            checker++
          }
        }
        if (j < lenCheck && currentNodeHolder[i][j+1]) {
          if (currentNodeHolder[i][j+1].isAlive) {
            checker++
          }
        }
        if (j > 0 && i < lenCheck && currentNodeHolder[i+1][j-1]) {
          if (currentNodeHolder[i+1][j-1].isAlive) {
            checker++
          }
        }
        if (i < lenCheck && currentNodeHolder[i+1][j]) {
          if (currentNodeHolder[i+1][j].isAlive) {
            checker++
          }
        }
        if (i < lenCheck && j < lenCheck && currentNodeHolder[i+1][j+1]) {
          if (currentNodeHolder[i+1][j+1].isAlive) {
            checker++
          }
        }
        if (checker === 3) {
          nextNodeHolder[i][j].isAlive = true;
        }
      }
    }
  }
  return nextNodeHolder;
}

export const clearCellsAlgo = (currentNodeHolder) => {
  for (let i = 0; i < currentNodeHolder.length; i++) {
    for (let j = 0; j < currentNodeHolder.length; j++) {
      if (currentNodeHolder[i][j].isAlive) {
        currentNodeHolder[i][j].isAlive = false;
      }
    }
  }
  return currentNodeHolder;
}
