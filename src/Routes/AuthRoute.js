import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
    const state = useSelector((state) => state.User);

    if (state && state.isLoggedIn) {
        return <Outlet />;
    }
    return <Navigate to={"/login"} replace />;
};
