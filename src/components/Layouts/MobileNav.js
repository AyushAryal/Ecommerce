import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/svgs/searchnew.svg";
import { ReactComponent as CartIcon } from "../../assets/svgs/cart.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svgs/profile11.svg";
import { ReactComponent as LoginIcon } from "../../assets/svgs/login.svg";
import WishlistSVG from "../../assets/images/love.png";
import { ReactComponent as ProductsIcon } from "../../assets/svgs/category.svg";
import HeartSVG from "../../assets/svgs/heart.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function MobileNav({ categories, openNav, setOpenNav, setOpenSearchModal }) {
    const [showCategories, setShowCategories] = useState(false);

    const navigate = useNavigate();

    const toggleProductCategory = () => {
        if (showCategories) {
            setShowCategories(false);
        } else {
            setShowCategories(true);
        }
    };

    const closeNav = () => {
        setOpenNav(false);
    };

    const userState = useSelector((state) => state.User);
    return (
        <div className={`mobile-nav ${openNav ? "mobile-nav--open" : ""}`}>
            <div className="mobile-nav__container">
                <div
                    className="mobile-nav__container__link"
                    onClick={toggleProductCategory}
                >
                    <div className="mobile-nav__container__link__icon">
                        <ProductsIcon />
                    </div>
                    <div className="mobile-nav__container__link__name">
                        {" "}
                        Products Category
                    </div>
                </div>
                <div
                    className={`product-listing ${
                        showCategories ? "product-listing--open" : ""
                    }`}
                >
                    <div className="product-listing__container">
                        {categories &&
                            categories.map((_item) => {
                                return (
                                    <div
                                        className="product-listing__container__item"
                                        key={_item.id}
                                        onClick={() => {
                                            closeNav();
                                            navigate(`/category/${_item.id}`);
                                        }}
                                    >
                                        {_item.name}
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div
                    className="mobile-nav__container__link"
                    onClick={() => {
                        setOpenNav(false);
                        setOpenSearchModal(true);
                    }}
                >
                    <div className="mobile-nav__container__link__icon">
                        <SearchIcon />
                    </div>
                    <div className="mobile-nav__container__link__name">
                        {" "}
                        Search Your Products
                    </div>
                </div>
                <div
                    className="mobile-nav__container__link"
                    onClick={() => navigate("/wishlist")}
                >
                    <div className="mobile-nav__container__link__icon">
                        <img src={HeartSVG} />
                    </div>
                    <div className="mobile-nav__container__link__name">
                        {" "}
                        My Wishlist
                    </div>
                </div>
                <div
                    className="mobile-nav__container__link"
                    onClick={() => {
                        userState && userState.isLoggedIn
                            ? navigate("/my-profile")
                            : navigate("/login");
                    }}
                >
                    {userState && userState.isLoggedIn ? (
                        <>
                            <div
                                className="mobile-nav__container__link__icon"
                                style={{ scale: "0.9" }}
                            >
                                <ProfileIcon />
                            </div>
                            <div className="mobile-nav__container__link__name">
                                {" "}
                                My Profile
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="mobile-nav__container__link__icon"
                                style={{ scale: "0.9" }}
                                onClick={() => navigate("/login")}
                            >
                                <LoginIcon />
                            </div>
                            <div className="mobile-nav__container__link__name">
                                {" "}
                                Login
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MobileNav;
