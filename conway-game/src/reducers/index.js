
const initialState = {
      gridRows: 15,
      gridColumns: 15,
      gridBoxArr: [], 
      isRunning: false
}

export const gameReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state; 
    }
}