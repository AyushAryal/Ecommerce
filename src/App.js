import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import "./assets/styles/main.scss";
import Copyright from "./components/partials/Copyright";
import Navbar from "./components/Layouts/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Products from "./pages/Products";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ResetPassword from "./pages/ResetPassword";
import ServerError from "./pages/ServerError";
import { setBackDrop } from "./redux/ActionCreators/OtherAction";
import { ToastContainer, toast } from "react-toastify";
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "./components/Layouts/Footer";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import MobileNav from "./components/Layouts/MobileNav";
import { GuestRoute } from "./Routes/GuestRoute";
import { AuthRoute } from "./Routes/AuthRoute";
import { fetchCategories } from "./api/public/others";
import { fetchCartItems } from "./api/private/cart";
import { saveCart } from "./redux/ActionCreators/CartAction";
import { getWishListItem } from "./api/private/wishlist";
import { setWishList } from "./redux/ActionCreators/WishListAction";
import Button from "react-bootstrap/Button";
import SearchModal from "./components/SearchModal";
import ResendVerification from "./pages/ResendVerification";
function App() {
    const location = useLocation();
    const dispatch = useDispatch();

    const isBackDropOn = useSelector((state) => state.Other.isBackDropOn);
    const userState = useSelector((state) => state.User);

    const [searchOpen, setSearchOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [categories, setCategories] = useState([]);

    const [openSearchModal, setOpenSearchModal] = useState(false);

    const cartItems = useSelector((state) => state.Cart.cart);
    const { pathname } = useLocation();

    const _getProductCategories = async (signal) => {
        await fetchCategories(null, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    setCategories(res.json.results);
                } else {
                }
            })
            .catch((err) => {});
    };

    const _getCartItems = async (signal) => {
        console.log("Get cart");
        await fetchCartItems(null, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    console.log(res.json.items);
                    let _dataToSet = {
                        cart: res.json.items,
                        numberOfItems: res.json.items.length,
                        isset: true,
                    };

                    dispatch(saveCart(_dataToSet));
                } else {
                }
            })
            .catch((err) => {});
    };
    const _fetchWishlistItems = async (signal) => {
        await getWishListItem(null, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    dispatch(setWishList(res.json.items));
                }
            })
            .catch((err) => {});
    };
    useEffect(() => {
        const controller = new AbortController();
        _getProductCategories(controller.signal);

        if (userState.userState && userState.userState.user) {
            _fetchWishlistItems(controller.signal);
            _getCartItems(controller.signal);
        }
        return () => controller.abort();
    }, [userState.userState]);

    useEffect(() => {
        closeAlltabsOpen();
        setOpenNav(false);
    }, [location.pathname]);

    const closeAlltabsOpen = () => {
        dispatch(setBackDrop(false));
        setSearchOpen(false);
        setProductOpen(false);
        setProfileOpen(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Navbar
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                productOpen={productOpen}
                setProductOpen={setProductOpen}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
                setOpenNav={setOpenNav}
                cartItems={cartItems.length || 0}
                categories={categories}
            />
            <MobileNav
                openNav={openNav}
                setOpenNav={setOpenNav}
                categories={categories}
                setOpenSearchModal={setOpenSearchModal}
            />
            <SearchModal
                setOpenSearchModal={setOpenSearchModal}
                openSearchModal={openSearchModal}
            />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/registration-success"
                        element={<RegistrationSuccess />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/verify-email"
                        element={<ResendVerification />}
                    />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/server-error" element={<ServerError />} />

                <Route element={<AuthRoute />}>
                    <Route path="/category/:id" element={<CategoryPage />} />
                    <Route path="/products/:id" element={<Products />} />
                    <Route path="/my-cart" element={<Cart />} />
                    <Route
                        path="/checkout-success"
                        element={<CheckoutSuccess />}
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/my-profile" element={<ProfilePage />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* <Footer /> */}
            {isBackDropOn && (
                <div className="backdrop" onClick={closeAlltabsOpen}></div>
            )}
        </>
    );
}

export default App;
