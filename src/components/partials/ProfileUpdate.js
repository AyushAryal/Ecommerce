import React, { useState, useEffect } from "react";
import isEmail from "../../helpers/isEmail";
import isEmpty from "../../helpers/isEmpty";
import PhoneInput from "react-phone-number-input";
import { updateUserProfile } from "../../api/private/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfileUpdate({ accountDetails }) {
    const [errors, setErrors] = useState({
        address: "",
    });

    const [phoneValue, setPhoneValue] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: "",
    });
    const userData = useSelector((state) => state.User);

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;

        setFormData(_formData);
    };

    const _update = async () => {
        if (validate()) {
            //send login request
            console.log("CClicekd update");
            let toSend = {
                company_address: formData.address,
                contact: phoneValue,
                reason_for_signup: accountDetails.reason_for_signup,
                company_name: accountDetails.company_name,
            };
            let controller = new AbortController();
            setLoading(true);
            await updateUserProfile(toSend, "", controller.signal)
                .then((res) => {
                    if (res.response.ok) {
                        toast.success("User data updated");
                    } else {
                        toast.error(" Couldnot update user data");
                    }
                })
                .catch((err) => {
                    toast.error(" Couldnot update user data");
                });

            // return () => controller.signal;
        }
    };

    useEffect(() => {
        if (accountDetails) {
            if (accountDetails.contact) {
                setPhoneValue(accountDetails.contact);
            }
            setFormData({ address: accountDetails.company_address });
        }
    }, [accountDetails]);

    const validate = () => {
        let _addressError = "";
        let _toReturn = false;

        if (isEmpty(formData.address)) {
            _addressError = "Please provide your primary company address";
        }

        if (_addressError) {
            setErrors({
                address: _addressError,
            });
        } else {
            setErrors({
                address: "",
            });
            _toReturn = true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="knits-form__input">
                <div className="knits-form__input__label">Company Name</div>
                {accountDetails && accountDetails.company_name}
            </div>

            <div className="knits-form__input">
                <div className="knits-form__input__label">Email Address</div>
                <div>{accountDetails && accountDetails.user.email}</div>
            </div>

            <div className="knits-form__input">
                <div className="knits-form__input__label">Company Address*</div>
                <input
                    type="text"
                    name="address"
                    placeholder="Where are you located at"
                    className="knits-form__input__field"
                    value={formData.address}
                    onChange={(e) =>
                        _changeFormData("address", e.target.value.trim())
                    }
                />
                {errors.address && (
                    <div className="knits-form__input__error">
                        {errors.address}
                    </div>
                )}
            </div>

            <div className="knits-form__input">
                <div className="knits-form__input__label">Contact Number</div>
                <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="US"
                    value={phoneValue}
                    onChange={setPhoneValue}
                />
            </div>

            <button className="btn btn-primary btn-sm" onClick={_update}>
                Update Profile
            </button>
        </>
    );
}

export default ProfileUpdate;
