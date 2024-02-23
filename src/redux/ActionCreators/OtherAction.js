//We define small functionalities here....

import * as ActionType from "../ActionTypes";
export const setBackDrop = (val) => {
    return {
        type: ActionType.SET_BACKDROP,
        payload: val,
    };
};
