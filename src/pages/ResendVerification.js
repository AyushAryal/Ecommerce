import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Layouts/Footer";
import isEmail from "../helpers/isEmail";
import isEmpty from "../helpers/isEmpty";
import { useSearchParams } from "react-router-dom";

function ResendVerification() {
    const [errors, setErrors] = useState({
        email: "",
    });

    let [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: searchParams.get("email") || "",
    });

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;

        setFormData(_formData);
    };

    const _resendVerification = () => {
        if (validateForm()) {
            //send login request
            setLoading(true);
        }
    };

    const validateForm = () => {
        let _emailError = "";
        let _toReturn = false;

        if (isEmpty(formData.email)) {
            _emailError = "Please enter your email";
        } else if (!isEmail(formData.email)) {
            _emailError = "Not a valid email address";
        }

        if (_emailError) {
            setErrors({
                email: _emailError,
            });
        } else {
            return true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="page  reset-password-page">
                <div className="page-header">Verify Your Email</div>

                <div className="knits-form login-form">
                    <div className="form-info">
                        You have been sent an email to verify your credentials.
                        If you didnt receive any email, you can request the link
                        again .
                    </div>
                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Email Address
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="knits-form__input__field"
                            value={formData.email}
                            // disabled
                            onChange={(e) =>
                                _changeFormData("email", e.target.value.trim())
                            }
                        />
                        {errors.email && (
                            <div className="knits-form__input__error">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <button
                        className="knits-form__button btn btn-primary btn-full"
                        disabled={loading}
                        onClick={_resendVerification}
                    >
                        Resend Verification Link
                    </button>

                    {/* <div className="knits-form__bottom">
                    Haven't registered to Knits and Stiches yet?{" "}
                    <Link className="link-border" to="/register">
                        Register
                    </Link>
                </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ResendVerification;
