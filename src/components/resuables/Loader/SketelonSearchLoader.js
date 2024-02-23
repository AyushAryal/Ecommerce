import React from "react";
import SkeletonLoader from "./SkeletonLoader";

function SketelonSearchLoader() {
    return (
        <div className="extensionBox__container__items__item">
            <div className="extensionBox__container__items__item__img">
                <SkeletonLoader type="product-image" />
            </div>
            <div className="extensionBox__container__items__item__desc">
                <SkeletonLoader type="text" />
            </div>
        </div>
    );
}

export default SketelonSearchLoader;
