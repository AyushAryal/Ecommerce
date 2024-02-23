import React, { useState } from "react";
import Footer from "../components/Layouts/Footer";
import isEmail from "../helpers/isEmail";
import isEmpty from "../helpers/isEmpty";

function ForgotPassword() {
    const [errors, setErrors] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [isMailSent, setIsMailSent] = useState(false);

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;

        setFormData(_formData);
    };

    const _resetPassword = () => {
        if (validateProcess()) {
            //send login request
            setLoading(true);
        }
    };

    const validateProcess = () => {
        let _emailError = "";
        let _toReturn = false;

        if (isEmpty(formData.email)) {
            _emailError = "Please enter your email";
        } else if (!isEmail(formData.email)) {
            _emailError = "Not a valid email address";
        }

        if (_emailError) {
            setErrors({ email: _emailError });
        } else {
            return true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="page   registration-success-page">
                <div className="page-header">Forgot Password</div>
                <div className="knits-form login-form">
                    {isMailSent ? (
                        <div className="form-info">
                            Password reset link has been sent to your email.
                        </div>
                    ) : (
                        <div className="form-info">
                            Forgot your password? Dont worry. Provide your valid
                            email address that you have logged in with. You will
                            be receiving a link to reset the password.
                        </div>
                    )}

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
                        onClick={_resetPassword}
                        style={{ marginTop: "0.5rem" }}
                    >
                        Send Reset Link
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ForgotPassword;
