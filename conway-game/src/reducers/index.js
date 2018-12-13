const initialState = {
  gridRows: 15,
  gridBoxArr: [],
  isRunning: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POPULATE_GRID":
      const boxArr = [];
      const coordinates = [];
      for (let y = 1; y <= action.payload; y++) {
        for (let x = 1; x <= action.payload; x++) {
          coordinates.push({ x, y });
        }
      }
      const boxes = action.payload * action.payload;
      for (let i = 0; i < boxes; i++) {
        boxArr.push({ id: i, coords: coordinates[i], active: false });
      }
      return {
        gridBoxArr: boxArr
      };
    case "START_GAME":
      return Object.assign({}, state, { isRunning: true });
    case "PAUSE_GAME":
      return Object.assign({}, state, { isRunning: false });
    default:
      return state;
  }
};
