import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishListItem } from "../api/private/wishlist";
import Footer from "../components/Layouts/Footer";
import WishListCard from "../components/Products/WishListCard";
import SkeletonLoader from "../components/resuables/Loader/SkeletonLoader";
import SkeletonProductLoader from "../components/resuables/Loader/SkeletonProductLoader";

function Wishlist() {
    const wishListState = useSelector((state) => state.WishList);
    const [productLoading, setProductLoading] = useState(false);

    return (
        <>
            <div className="page wishlist-page">
                {!wishListState.isset ? (
                    <SkeletonLoader type="title" />
                ) : (
                    <div className="page-header">My WishList</div>
                )}

                {wishListState.isset &&
                    wishListState.wishListItems.length === 0 && (
                        <>
                            <div className="empty-state">
                                <div className="empty-state__text">
                                    There are no items in your wishList!
                                </div>
                                <Link to="/" className="empty-state__order">
                                    Explore products
                                </Link>
                            </div>
                        </>
                    )}

                <div className="wishlist-page__container products-container">
                    {!wishListState.isset ? (
                        <>
                            {[1, 2, 3, 4, 5, 6, 7].map((data) => {
                                return <SkeletonProductLoader key={data} />;
                            })}
                        </>
                    ) : (
                        <>
                            {wishListState &&
                                wishListState.wishListItems.map((item) => {
                                    return (
                                        <WishListCard
                                            productLoading={productLoading}
                                            key={item.item_variant}
                                            data={item}
                                            setProductLoading={
                                                setProductLoading
                                            }
                                        />
                                    );
                                })}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Wishlist;
