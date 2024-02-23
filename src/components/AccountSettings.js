import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import isEmail from "../helpers/isEmail";
import isEmpty from "../helpers/isEmpty";
import ProfileUpdate from "./partials/ProfileUpdate";
import ResetPassword from "./partials/ResetPassword";

function AccountSettings({ accountDetails }) {
    return (
        <div className="account-settings">
            <div className="profile-header">Account Settings</div>
            <div className="account-settings__container">
                <div className="account-settings__user-details">
                    <ProfileUpdate accountDetails={accountDetails} />
                </div>
                <div className="account-settings__reset-password">
                    <div className=" profile-header account-settings__reset-password__title">
                        Reset Your Password
                    </div>
                    <div className="account-settings__reset-password__fields">
                        <ResetPassword />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
