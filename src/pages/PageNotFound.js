import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../assets/images/404.png";
function PageNotFound() {
    return (
        <div className="page">
            <div className="not-found-page">
                <div className="not-found-page__image">
                    <img src={NotFound} />
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
