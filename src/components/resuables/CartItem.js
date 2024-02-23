import React, { useState, useEffect } from "react";
import Image2 from "../../assets/images/products/chappal2.webp";

import { ReactComponent as DeleteSvg } from "../../assets/svgs/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as SubstractSVG } from "../../assets/svgs/substract.svg";
import CartBtn from "./CartBtn";
import { addItemToCart } from "../../api/private/cart";
import { toast } from "react-toastify";
import { updateProducts } from "../../redux/ActionCreators/CartAction";
import { useNavigate } from "react-router";
import { extractId } from "../../helpers/utils";

function CartItem({ data, setProductLoading, productLoading }) {
    const [cartQuantity, setCartQuantity] = useState(0);
    const [variantData, setVariantData] = useState();

    const [startUpdate, setStartUpdate] = useState(false);

    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.Cart.cart);

    const _getVariantData = (id) => {
        let _toReturn = {};
        data.item &&
            data.item.variants.map((_data) => {
                console.log(_data);
                if (_data.id === id) {
                    _toReturn = _data;
                }
            });

        return _toReturn;
    };

    const navigate = useNavigate();

    const _deleteItem = async () => {
        let _toSend = [];
        cartState &&
            cartState.map((item) => {
                if (item.item_variant !== data.item_variant) {
                    _toSend.push(item);
                }
            });

        let controller = new AbortController();
        await addItemToCart({ items: [..._toSend] }, "", controller.signal)
            .then((res) => {
                if (res.response.ok) {
                    dispatch(updateProducts(_toSend));
                    toast.success("Item removed from cart");
                } else {
                    toast.error("Could not remove item from cart");
                }
            })
            .catch((err) => {
                toast.error("Could not remove item from cart");
            });

        return () => controller.abort();
    };

    const _updateItem = async (signal) => {
        let _toSend = [];
        cartState &&
            cartState.map((item) => {
                if (item.item_variant !== data.item_variant) {
                    _toSend.push(item);
                } else {
                    _toSend.push({
                        item: data.item,
                        quantity: cartQuantity,
                        item_variant: variantData.id,
                    });
                }
            });

        await addItemToCart({ items: [..._toSend] }, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    dispatch(updateProducts(_toSend));
                    toast.success("Cart updated successfully");
                } else {
                    console.log(res.response);
                    toast.error("Could not update cart");
                }
            })
            .catch((err) => {
                // toast.error("Could not update cart");
            });
    };

    useEffect(() => {
        let variantId = data.item_variant;
        let variantData = _getVariantData(variantId);
        setVariantData(variantData);
        setCartQuantity(data.quantity);
    }, []);

    useEffect(() => {
        if (startUpdate && cartQuantity > 0) {
            let controller = new AbortController();
            _updateItem(controller.signal);
            setProductLoading(false);
            return () => controller.abort();
        }
        if (cartQuantity && cartQuantity > 0) {
            setStartUpdate(true);
            setProductLoading(false);
        } else {
            setProductLoading(true);
        }
    }, [cartQuantity]);
    const movetoVariant = () => {
        // console.log("Clicked");
        let query = `/products/${extractId(data.item.url)}?variant=${
            variantData.color
        }`;

        navigate(query);
    };

    return (
        <div className="cart-item">
            <div className="cart-item__left">
                <div
                    className="cart-item__left__image"
                    onClick={movetoVariant}
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src={
                            variantData &&
                            variantData.images &&
                            variantData.images[0]
                        }
                    />
                </div>
                <div className="cart-item__left__attributes">
                    <div
                        className="cart-item__left__desc"
                        onClick={movetoVariant}
                        style={{ cursor: "pointer" }}
                    >
                        {variantData && (
                            <div className="cart-item__left__desc__name">
                                {`${data.item.name} (${variantData.color})`}
                            </div>
                        )}
                        {/* <div className="cart-item__left__desc__color">
                        Color : Red
                    </div> */}
                    </div>
                    <div className="cart-item__left__mobile-action">
                        <div className="cart-item__left__mobile-action__itemUpdate">
                            <CartBtn
                                cartQuantity={cartQuantity}
                                setCartQuantity={setCartQuantity}
                                page="cart"
                            />
                        </div>
                        <div
                            className="cart-item__left__mobile-action__actions"
                            onClick={() => _deleteItem()}
                        >
                            <DeleteSvg />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-item__right">
                <div className="cart-item__right__itemUpdate">
                    <CartBtn
                        cartQuantity={cartQuantity}
                        setCartQuantity={setCartQuantity}
                        page="cart"
                    />
                </div>
                <div
                    className="cart-item__right__actions"
                    onClick={() => _deleteItem()}
                >
                    <DeleteSvg />
                </div>
            </div>
        </div>
    );
}

export default CartItem;
