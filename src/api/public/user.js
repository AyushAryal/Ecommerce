//login , register , forget password

import { publicRequest } from "../base";

export const loginUser = async (data, query, signal) => {
    try {
        return await publicRequest(
            `/api/token${query && query}/`,
            "POST",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};

export const registerUser = async (data, query, signal) => {
    try {
        return await publicRequest(
            `/api/customer${query && query}/`,
            "POST",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};
