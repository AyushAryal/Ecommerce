import React from "react";
import SkeletonLoader from "./SkeletonLoader";
import SkeletonParagraph from "./SkeletonParagraph";

function ProductLoader() {
    return (
        <div className="product-page__container">
            <div className="product-page__right">
                <div className="product-page__right__container">
                    <div className="product-page__right__main">
                        <SkeletonLoader type="product-image" />
                    </div>
                    <div className="product-page__right__sub">
                        <SkeletonLoader type="text" />
                        <SkeletonLoader type="text" />
                    </div>
                </div>
            </div>
            <div className="product-page__left">
                <div className="product-page__product">
                    <div className="product-page__product__title">
                        <SkeletonLoader type="title" />
                        <SkeletonLoader type="text" />
                    </div>

                    <div className="product-page__product__color">
                        <div className="product-page__product__color__title">
                            <SkeletonLoader type="title" />
                        </div>
                        <SkeletonParagraph />
                        <br />
                        <SkeletonParagraph />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductLoader;
