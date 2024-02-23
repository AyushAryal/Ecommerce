import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = ({ component: Component, ...rest }) => {
    const state = useSelector((state) => state.User);

    if (state && state.isLoggedIn) {
        return <Navigate to={"/"} replace />;
    }
    return <Outlet />;
};
