//We define wishlist functionalities here....

import * as ActionType from "../ActionTypes";
export const setWishList = (val) => {
    return {
        type: ActionType.SET_WISHLIST,
        payload: val,
    };
};

export const updateWishList = (data) => {
    return {
        type: ActionType.UPDATE_WISHLIST,
        payload: data,
    };
};
