

const initialState = {
    someState = []

}

const gridReducer = (state = initialState, action) => {
    switch (action.type) {
        case SOME_TYPE:
            return {
                ...state
            }
    }
}

export default gridReducer