import React from "react";
import SettingSVG from "../assets/images/settings.png";
import WishlistSVG from "../assets/images/love.png";
import OrderSVG from "../assets/images/order.png";
import LogoutSVG from "../assets/images/logout.png";
import SkeletonLoader from "./resuables/Loader/SkeletonLoader";

function MyProfile({
    accountDetails,
    loading,
    manageAccount,
    setManageAccount,
    userlogout,
}) {
    return (
        <div className="my-profile">
            <div className="my-profile__desc">
                {loading && !accountDetails ? (
                    <>
                        <SkeletonLoader type="title" />
                    </>
                ) : (
                    <>
                        <div className="my-profile__desc__name">
                            {accountDetails && accountDetails.company_name}
                        </div>

                        <div className="my-profile__desc__email">
                            {accountDetails && accountDetails.user.email}
                        </div>
                    </>
                )}
            </div>
            <div className="my-profile__actions my-profile__actions--desktop">
                <div
                    className={`my-profile__actions__indi ${
                        !manageAccount
                            ? "my-profile__actions__indi--active"
                            : ""
                    }`}
                    onClick={() => setManageAccount(false)}
                >
                    <div className="my-profile__actions__indi__icon">
                        <img src={OrderSVG} />
                    </div>
                    <div className="my-profile__actions__indi__label">
                        My Orders
                    </div>
                </div>
                <div
                    className={`my-profile__actions__indi ${
                        manageAccount ? "my-profile__actions__indi--active" : ""
                    }`}
                    onClick={() => setManageAccount(true)}
                >
                    <div className="my-profile__actions__indi__icon">
                        <img src={SettingSVG} />
                    </div>
                    <div className="my-profile__actions__indi__label">
                        Manage Account
                    </div>
                </div>

                <div
                    className="my-profile__actions__indi"
                    onClick={() => userlogout()}
                >
                    <div className="my-profile__actions__indi__icon">
                        <img src={LogoutSVG} />
                    </div>
                    <div className="my-profile__actions__indi__label">
                        Logout
                    </div>
                </div>
            </div>

            <div className="my-profile__actions my-profile__actions--mobile">
                <div className="my-profile__actions__icons">
                    <div
                        className="my-profile__actions__icons__icon"
                        onClick={() => setManageAccount(true)}
                    >
                        <div className="my-profile__actions__indi__icon">
                            <img src={SettingSVG} />
                        </div>
                    </div>
                    <div
                        className="my-profile__actions__icons__icon"
                        onClick={() => userlogout()}
                    >
                        <div className="my-profile__actions__indi__icon">
                            <img src={LogoutSVG} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
