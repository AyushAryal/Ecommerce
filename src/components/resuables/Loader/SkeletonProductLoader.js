import React from "react";
import SkeletonLoader from "./SkeletonLoader";

function SkeletonProductLoader() {
    return (
        <div className="product-card">
            <div className="product-card__image">
                <SkeletonLoader type="product-image" />
            </div>
            <div className="product-card__name">
                <SkeletonLoader type="text" />
            </div>
        </div>
    );
}

export default SkeletonProductLoader;
