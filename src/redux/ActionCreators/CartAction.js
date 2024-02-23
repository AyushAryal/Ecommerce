//Cart actions to be defined here...

import * as ActionType from "../ActionTypes";
export const saveCart = (cartData) => {
    return {
        type: ActionType.SAVE_CART,
        payload: cartData,
    };
};

export const addProducts = (cartData) => {
    return {
        type: ActionType.ADD_ITEM_TO_CART,
        payload: cartData,
    };
};
export const updateProducts = (cartData) => {
    return {
        type: ActionType.UPDATE_ITEM_IN_CART,
        payload: cartData,
    };
};
