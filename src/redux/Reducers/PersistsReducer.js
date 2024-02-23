import * as ActionTypes from "../ActionTypes";
const initialState = {
    userState: {
        user: "",
        auth_token: "",
    },
    isLoggedIn: false,
};

const CustomPersistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_USER:
            return {
                ...state,
                userState: {
                    user: action.payload.user,
                    auth_token: action.payload.auth_token,
                },
                isLoggedIn: true,
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                userState: {
                    user: "",
                    auth_token: "",
                },
                isLoggedIn: false,
            };
        default:
            return { ...state };
    }
};

export default CustomPersistReducer;
