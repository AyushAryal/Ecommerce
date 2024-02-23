import React, { useEffect, useState } from "react";
import PrimaryLogoImg from "../../assets/images/logos/primary-logo.png";
import LogoImg from "../../assets/images/logos/logo.png";
import { ReactComponent as SearchIcon } from "../../assets/svgs/searchnew.svg";
import { ReactComponent as CartIcon } from "../../assets/svgs/cart.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svgs/person-profile.svg";
import HeartSVG from "../../assets/svgs/heart.svg";

import SettingSVG from "../../assets/images/settings.png";
import WishlistSVG from "../../assets/images/love.png";
import OrderSVG from "../../assets/images/order.png";
import LogoutSVG from "../../assets/images/logout.png";

import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../partials/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { setBackDrop } from "../../redux/ActionCreators/OtherAction";
import { searchProduct } from "../../api/private/products";

const ProductBox = ({ productOpen, setOpenNav, categories }) => {
    return (
        <div
            className={`extensionBox extensionBox-products ${
                productOpen ? "extensionBox--open" : ""
            }`}
        >
            <div className="extensionBox__container">
                <div className="extensionBox__container__products">
                    <div className="extensionBox__container__products__items">
                        {categories &&
                            categories.map((data, index) => {
                                return (
                                    <Link
                                        className="extensionBox__container__products__item link-withoutdecoration"
                                        key={data.id}
                                        to={`category/${data.id}`}
                                    >
                                        {data.name}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileBox = ({ profileOpen }) => {
    const navigate = useNavigate();

    const switchPage = (path) => {
        navigate(path);
    };
    return (
        <div
            className={`extensionBox extensionBox-products extensionBox-products--profile ${
                profileOpen ? "extensionBox--open" : ""
            }`}
        >
            <div className="extensionBox__container">
                <div className="extensionBox__container__products extensionBox__container__products--profile">
                    <div className="extensionBox__container__products__items">
                        <div
                            className="extensionBox__container__products__item"
                            onClick={() => switchPage("/my-profile")}
                        >
                            <div className="extensionBox__container__products__item__icon">
                                <img src={SettingSVG} />
                            </div>
                            <div className="extensionBox__container__products__item__title">
                                My Account
                            </div>
                        </div>
                        <div
                            className="extensionBox__container__products__item"
                            onClick={() => switchPage("/my-orders")}
                        >
                            <div className="extensionBox__container__products__item__icon">
                                <img src={OrderSVG} />
                            </div>
                            <div className="extensionBox__container__products__item__title">
                                My Orders
                            </div>
                        </div>
                        <div
                            className="extensionBox__container__products__item"
                            onClick={() => switchPage("/wishlist")}
                        >
                            <div className="extensionBox__container__products__item__icon">
                                <img src={WishlistSVG} />
                            </div>
                            <div className="extensionBox__container__products__item__title">
                                Wishlist
                            </div>
                        </div>
                        <div className="extensionBox__container__products__item">
                            <div className="extensionBox__container__products__item__icon">
                                <img src={LogoutSVG} />
                            </div>
                            <div className="extensionBox__container__products__item__title">
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
function Navbar({
    searchOpen,
    setSearchOpen,
    productOpen,
    setProductOpen,
    profileOpen,
    setProfileOpen,
    setOpenNav,
    cartItems,
    categories,
}) {
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.User);

    useEffect(() => {
        if (searchText.trim().length > 0) {
            setSearchOpen(true);
            setProductOpen(false);
        } else {
            setSearchOpen(false);
        }
    }, [searchText]);

    useEffect(() => {
        if (searchOpen || productOpen || profileOpen) {
            dispatch(setBackDrop(true));
            if (productOpen) {
                setSearchOpen(false);
                setProfileOpen(false);
            } else if (searchOpen) {
                setProductOpen(false);
                setProfileOpen(false);
            } else {
                setSearchOpen(false);
                setProductOpen(false);
            }
        } else {
            dispatch(setBackDrop(false));
        }
    }, [searchOpen, productOpen, profileOpen]);

    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__left">
                    <div className="navbar__left__logo">
                        <Link to="/">
                            <img src={PrimaryLogoImg} />
                        </Link>
                    </div>

                    <div className="navbar__left__links navbar-links--desktop">
                        <div
                            className="navbar__left__links__products"
                            onClick={() => setProductOpen((prev) => !prev)}
                        >
                            <span className="navbar__left__links__products__name">
                                Products
                            </span>
                            <span
                                className={`navbar__left__links__products__icon ${
                                    productOpen
                                        ? "navbar__left__links__products__icon--rotate"
                                        : ""
                                }`}
                            >
                                <svg
                                    width="10"
                                    height="7"
                                    viewBox="0 0 10 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.92994 3.51003L1.41998 4.38074e-05L-1.53204e-05 1.41004L4.92994 6.34003L9.8501 1.42L8.4401 -6.16331e-08L4.92994 3.51003Z"
                                        fill="black"
                                    />
                                </svg>
                            </span>

                            <ProductBox
                                productOpen={productOpen}
                                categories={categories}
                            />
                        </div>
                    </div>
                </div>
                <div className="navbar__middle">
                    <div className="search-products search-products--desktop ">
                        <SearchIcon />
                        <input
                            maxLength={60}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="search"
                            placeholder="Search your items...."
                        />
                        <SearchBox
                            searchOpen={searchOpen}
                            searchText={searchText}
                        />
                    </div>
                </div>
                <div className="navbar__right navbar-right--desktop">
                    <Link to="/wishlist" className="navbar__right__indi ">
                        <img src={HeartSVG} />
                    </Link>
                    <Link
                        to="/my-cart"
                        className="navbar__right__indi navbar__right__indi--cart"
                    >
                        <div className="navbar__right__indi__cart-num">
                            {cartItems}
                        </div>
                        <CartIcon />
                    </Link>
                    {userState && userState.isLoggedIn ? (
                        <div className="navbar__right__indi">
                            <div
                                className="navbar__right__indi__profile"
                                onClick={() => {
                                    navigate("/my-profile");
                                }}
                            >
                                <ProfileIcon />
                                {/* <ProfileBox profileOpen={profileOpen} /> */}
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="navbar__right__indi">
                            <btn className="btn btn-primary btn-fit">Login</btn>
                        </Link>
                    )}
                </div>
                <div className="navbar__right navbar-right--mobile">
                    <Link
                        to="/my-cart"
                        className="navbar__right__indi navbar__right__indi--cart"
                    >
                        <div className="navbar__right__indi__cart-num">
                            {cartItems}
                        </div>
                        <CartIcon />
                    </Link>
                    <div onClick={() => setOpenNav((prev) => !prev)}>
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.30475 12.1055H20.8047"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                            <path
                                d="M4.30475 6.10547H20.8047"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                            <path
                                d="M4.30475 18.1055H20.8047"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
