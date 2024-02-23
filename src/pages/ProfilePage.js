import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { fetchOrderDetails, fetchUserDetails } from "../api/private/user";
import AccountSettings from "../components/AccountSettings";
import Footer from "../components/Layouts/Footer";
import MyOrders from "../components/MyOrders";
import MyProfile from "../components/MyProfile";
import { logout } from "../redux/ActionCreators/AuthAction";
import { saveCart, updateProducts } from "../redux/ActionCreators/CartAction";

function ProfilePage() {
    const [manageAccount, setManageAccount] = useState(false);

    const [accountDetails, setAccountDetails] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state) => state.User.userState);

    const userlogout = () => {
        dispatch(logout());
        dispatch(updateProducts([]));
        let _dataTostore = { user: "", auth_token: "" };
        localStorage.setItem("knit_user", JSON.stringify(_dataTostore));
        navigate("/");
        toast.success("User Logged out");
    };

    const _getMyDetails = async (signal) => {
        await fetchUserDetails({ id: userState.user }, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    setAccountDetails(res.json);
                } else {
                }
            })
            .catch((err) => {});
    };
    const _getMyOrders = async (signal) => {
        setLoading(true);
        await fetchOrderDetails(null, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    setOrders(res.json.results);
                } else {
                }
            })
            .catch((err) => {});
        setLoading(false);
    };

    useEffect(() => {
        const controller = new AbortController();

        _getMyOrders(controller.signal);
        _getMyDetails(controller.signal);

        return () => controller.abort();
    }, []);

    return (
        <>
            <div className="page profile-page">
                {manageAccount && (
                    <div
                        className="back-to-orders"
                        onClick={() => setManageAccount(false)}
                    >
                        Back to Orders
                    </div>
                )}
                <div className="page-header">My Account</div>

                <div className="profile-page__container">
                    <div className="profile-page__my-profile">
                        <MyProfile
                            manageAccount={manageAccount}
                            setManageAccount={setManageAccount}
                            userlogout={userlogout}
                            loading={loading}
                            accountDetails={accountDetails}
                        />
                    </div>
                    <div className="profile-page__other-details">
                        {manageAccount ? (
                            <AccountSettings
                                userlogout={userlogout}
                                loading={loading}
                                accountDetails={accountDetails}
                            />
                        ) : (
                            <MyOrders orders={orders} loading={loading} />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;
