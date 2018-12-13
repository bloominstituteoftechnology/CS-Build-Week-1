export const populateArrayBoxes = rows => {
  return {
    type: "POPULATE_GRID",
    payload: rows
  };
};

export const startRunning = () => {
  return {
    type: "START_GAME"
  };
};

export const pauseRunning = () => {
  return {
    type: "PAUSE_GAME"
  };
};
