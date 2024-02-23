import { publicRequest } from "../base";

export const fetchBanners = async (data, query, signal) => {
    try {
        return await publicRequest(
            `/api/banner${query && query}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const fetchRecommendedCategories = async (data, query, signal) => {
    try {
        return await publicRequest(
            `/api/category${query && query}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const fetchRecommendedItems = async (data, query, signal) => {
    try {
        return await publicRequest(
            `/api/item${query && query}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};
