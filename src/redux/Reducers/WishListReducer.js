import * as ActionTypes from "../ActionTypes";
const initialState = {
    wishListItems: [],
    isset: false,
};

const WishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_WISHLIST:
            return {
                ...state,
                isset: true,
                wishListItems: action.payload,
            };
        case ActionTypes.UPDATE_WISHLIST:
            return {
                ...state,
                wishListItems: action.payload,
            };
        default:
            return { ...state };
    }
};

export default WishListReducer;
