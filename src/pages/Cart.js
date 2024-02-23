import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkoutCart } from "../api/private/cart";
import Footer from "../components/Layouts/Footer";
import CartItem from "../components/resuables/CartItem";
import SkeletonCartLoader from "../components/resuables/Loader/SkeletonCartLoader";
import SkeletonLoader from "../components/resuables/Loader/SkeletonLoader";
import SkeletonParagraph from "../components/resuables/Loader/SkeletonParagraph";
import { addProducts, saveCart } from "../redux/ActionCreators/CartAction";

function Cart() {
    const [productLoading, setProductLoading] = useState(false);

    const cartState = useSelector((state) => state.Cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const _checkout = async () => {
        let controller = new AbortController();

        await checkoutCart({ items: cartState.cart }, "", controller.signal)
            .then((res) => {
                if (res.response.ok) {
                    toast.success("Checkout Completed!");
                    dispatch(saveCart({ cart: [] }));
                    navigate("/checkout-success");
                } else {
                }
            })
            .catch((err) => {});

        return () => controller.abort();
    };

    return (
        <>
            <div className="page cart-page">
                {cartState.isset ? (
                    <div className="page-header">My Cart</div>
                ) : (
                    <SkeletonLoader type="title" />
                )}

                {cartState.isset && cartState.cart.length === 0 && (
                    <>
                        <div className="empty-state">
                            <div className="empty-state__text">
                                There are no items in your cart!
                            </div>
                            <Link to="/" className="empty-state__order">
                                Continue Shopping
                            </Link>
                        </div>
                    </>
                )}

                <div className="cart-container">
                    {/* cartState.isset */}

                    <div className="cart-container__left">
                        {cartState && cartState.isset ? (
                            cartState.cart.length > 0 && (
                                <>
                                    {cartState.cart.map((cartItem) => {
                                        return (
                                            <CartItem
                                                data={cartItem}
                                                key={cartItem.item_variant}
                                                setProductLoading={
                                                    setProductLoading
                                                }
                                                productLoading={productLoading}
                                            />
                                        );
                                    })}
                                </>
                            )
                        ) : (
                            <>
                                <SkeletonCartLoader />
                                <SkeletonCartLoader />
                                <SkeletonCartLoader />
                            </>
                        )}
                    </div>
                    {cartState && cartState.isset ? (
                        cartState.cart.length > 0 && (
                            <>
                                <div className="cart-container__right">
                                    <div className="form-info">
                                        Items in the cart are the stock.If
                                        checking out, you will be sending us the
                                        quotation. After we will have a look,
                                        will contact you ,okay bye
                                    </div>
                                    <button
                                        style={{ marginTop: "1.5rem" }}
                                        className="btn btn-primary btn-full"
                                        disabled={productLoading}
                                        onClick={_checkout}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <div className="cart-container__right">
                                <SkeletonLoader type="info" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
