import store from "../../redux/Store";
import { privateRequest, publicRequest } from "../base";

//fetch user profile
const userData = store.getState().User;
export const fetchUserDetails = async (data, query, signal) => {
    try {
        return await privateRequest(
            `/api/customer/${data.id}/`,
            "GET",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};

//update user profile
export const updateUserProfile = async (data, query, signal) => {
    let userId = JSON.parse(localStorage.getItem("knit_user"));

    try {
        return await privateRequest(
            `/api/customer/${userId.user}/`,
            "PATCH",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};

//user orders

export const fetchOrderDetails = async (data, query, signal) => {
    try {
        return await privateRequest(`/api/order/`, "GET", null, signal);
    } catch (err) {
        throw err;
    }
};

//change user password

export const changeUserPassword = async (data, query, signal) => {
    let userId = JSON.parse(localStorage.getItem("knit_user"));
    try {
        return await privateRequest(
            `/api/user/${userId.user}/change_password/`,
            "PUT",
            data,
            signal
        );
    } catch (err) {
        throw err;
    }
};
