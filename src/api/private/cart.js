import { privateRequest } from "../base";

export const fetchCartItems = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/cart${query && query}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const addItemToCart = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/cart${query && query}/`,
            "PUT",
            data,
            signal
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const checkoutCart = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/cart/checkout${query && query}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
};
