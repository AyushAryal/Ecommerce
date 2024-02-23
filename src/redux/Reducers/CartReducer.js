import * as ActionTypes from "../ActionTypes";
const initialState = {
    cart: [],
    isset: false,
};

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_CART:
            return {
                ...state,
                cart: action.payload.cart,
                isset: true,
            };
        case ActionTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case ActionTypes.UPDATE_ITEM_IN_CART:
            return {
                ...state,
                cart: [...action.payload],
            };

        case ActionTypes.DELETE_ITEMS_FROM_CART:
            let searchIdToDelete = action.payload.item_variant;
            let _newCartAfterDelete = [];
            state.cart.map((_cartData) => {
                if (_cartData.item_variant !== searchIdToDelete) {
                    _newCartAfterDelete.push(_cartData);
                }
            });

            return {
                ...state,
                cart: [..._newCartAfterDelete],
            };

        default:
            return { ...state };
    }
};

export default CartReducer;
