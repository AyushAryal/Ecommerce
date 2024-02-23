//Auth actions to be defined here...

import * as ActionType from "../ActionTypes";
export const login = (userData) => {
    return {
        type: ActionType.SAVE_USER,
        payload: userData,
    };
};

export const logout = () => {
    return {
        type: ActionType.LOGOUT,
    };
};
