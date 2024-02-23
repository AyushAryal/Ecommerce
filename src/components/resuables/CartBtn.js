import React, { useState } from "react";

import { ReactComponent as AddSVG } from "../../assets/svgs/add.svg";
import { ReactComponent as SubstractSVG } from "../../assets/svgs/substract.svg";
function CartBtn({ page, cartQuantity, setCartQuantity }) {
    const [loading, setLoading] = useState(false);

    const updateItem = (type, value) => {
        console.log("Cliceked");
        console.log("Value", value);
        if (type == "input" && value < 1000) {
            setCartQuantity(value);
        } else if (type == "subs" && cartQuantity > 1) {
            if (cartQuantity === "") {
                setCartQuantity(1);
            } else {
                setCartQuantity((prev) => --prev);
            }
        } else if (type == "add") {
            if (cartQuantity === "") {
                setCartQuantity(1);
            } else {
                setCartQuantity((prev) => ++prev);
            }
        }

        console.log(cartQuantity);
    };

    return (
        <>
            <div className="product-page__product__cart__btn">
                <button
                    className="product-page__product__cart__btn__update product-page__product__cart__btn__update--sub"
                    onClick={() => updateItem("subs")}
                >
                    <SubstractSVG />
                </button>
                <div className="product-page__product__cart__btn__quantity">
                    <input
                        type="number"
                        min={0}
                        value={cartQuantity}
                        onChange={(e) => updateItem("input", e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === ".") {
                                event.preventDefault();
                            }
                        }}
                        pattern="[0-9]"
                    />
                </div>
                <button
                    className="product-page__product__cart__btn__update product-page__product__cart__btn__update--add"
                    onClick={() => updateItem("add")}
                >
                    <AddSVG />
                </button>
            </div>
        </>
    );
}

export default CartBtn;
