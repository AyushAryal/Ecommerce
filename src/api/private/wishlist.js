import store from "../../redux/Store";
import { privateRequest, publicRequest } from "../base";

//fetch user profile
const userData = store.getState().User;

export const getWishListItem = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/wishlist/${query && query}`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};
export const updateWishListItem = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/wishlist/${query && query}`,
            "PUT",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};
