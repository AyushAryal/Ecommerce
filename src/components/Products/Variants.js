import React, { useState } from "react";

function Variants({ data, selectedVariant, setSelectedVariant }) {
    const [showColor, setShowColor] = useState(false);
    console.log(data);
    return (
        <div
            className={`variant ${
                data.id === selectedVariant.id ? "variant--active" : ""
            }`}
            onClick={() => setSelectedVariant(data)}
        >
            <img
                src={data.images[0]}
                onMouseEnter={() => setShowColor(true)}
                onMouseLeave={() => setShowColor(false)}
            />
            <div
                className={`variant__popup ${
                    showColor ? "variant__popup--active" : ""
                }`}
            >
                <div className="variant__popup__pointer"></div>
                <div className="variant__popup__text">{data.color}</div>
            </div>
        </div>
    );
}

export default Variants;
