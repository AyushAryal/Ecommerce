import React from "react";
import { useNavigate } from "react-router";

function ProductCard({ image, name, productId }) {
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
            onClick={() => navigate(`/products/${productId}`)}
        >
            <div className="product-card__image">
                <img src={image} />
            </div>
            <div className="product-card__name">{name}</div>
        </div>
    );
}

export default ProductCard;
