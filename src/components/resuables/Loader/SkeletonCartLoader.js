import React from "react";
import SkeletonBlockLoader from "./SkeletonBlockLoader";
import SkeletonLoader from "./SkeletonLoader";

function SkeletonCartLoader() {
    return (
        <div className="cart-item">
            <div className="cart-item__left">
                <div className="cart-item__left__image">
                    <SkeletonLoader type="product-image" />
                </div>
                <div className="cart-item__left__attributes">
                    <div className="cart-item__left__desc">
                        <div className="cart-item__left__desc__name">
                            <SkeletonLoader type="partial-text" />
                        </div>
                        {/* <div className="cart-item__left__desc__color">
                Color : Red
            </div> */}
                    </div>
                    <div className="cart-item__left__mobile-action">
                        <div className="cart-item__left__mobile-action__itemUpdate">
                            <SkeletonLoader type="button-sm" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-item__right">
                <div className="cart-item__right__itemUpdate">
                    <SkeletonLoader type="button-lg" />
                </div>
            </div>
        </div>
    );
}

export default SkeletonCartLoader;
