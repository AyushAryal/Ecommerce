import { publicRequest } from "../base";

export const fetchCategories = async (data, query, signal) => {
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
