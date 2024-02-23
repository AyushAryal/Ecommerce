//fetch categories, products , search

import { privateRequest } from "../base";

export const fetchCategoryDetails = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/category/${data.id}/`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const fetchProductsByCategory = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/item/${query && query}`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const fetchIndividualProduct = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/item/${data.id}`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const searchProduct = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/item/${query && query}`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const fetchSimilarProducts = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/item/${data.productId}/recommend/`,
            "GET",
            null,
            signal
        );
    } catch (err) {
        throw err;
    }
};
