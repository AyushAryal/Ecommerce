import * as ActionTypes from "../ActionTypes";
const initialState = {
    isBackDropOn: false,
};

const OtherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_BACKDROP:
            return {
                ...state,
                isBackDropOn: action.payload,
            };
        default:
            return { ...state };
    }
};

export default OtherReducer;
