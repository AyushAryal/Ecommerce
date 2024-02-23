import React from "react";
import { useNavigate } from "react-router";
import { ReactComponent as NextSVG } from "../../assets/svgs/next.svg";

function CategoryCard({ name, image, url }) {
    const navigate = useNavigate();

    return (
        <div className="category-card" onClick={() => navigate(url)}>
            <div className="category-card__category-image">
                <img src={image} />
            </div>
            <div className="category-card__category-content">
                <div className="category-card__category-content__title">
                    {name}
                </div>
                <div className="category-card__category-content__icon">
                    <NextSVG />
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
