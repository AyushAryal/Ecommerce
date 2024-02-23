import React, { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../components/Layouts/Footer";
import isEmpty from "../helpers/isEmpty";

function ResetPassword() {
    const [errors, setErrors] = useState({
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;

        setFormData(_formData);
    };

    const navigate = useNavigate();

    const _resetPassword = async () => {
        if (validateForm()) {
            //send login request
            setLoading(true);

            let data_toSend = {
                password: formData.current_password,
                new_password: formData.password,
            };

            let controller = new AbortController();

            //api calling here to reset the password

            setLoading(false);

            return () => controller.abort();
        }
    };

    const validateForm = () => {
        let _passwordError = "";
        let _confirmPasswordError = "";
        let _toReturn = false;

        if (isEmpty(formData.password)) {
            _passwordError = "Please provide your password";
        } else if (isEmpty(formData.confirm_password)) {
            _confirmPasswordError = "Please provide your password";
        } else if (formData.password !== formData.confirm_password) {
            _passwordError = "Passwords do not match.";
        }

        setErrors({
            password: _passwordError,
            confirm_password: _confirmPasswordError,
        });
        if (_passwordError) {
        } else {
            return true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="page  reset-password-page">
                <div className="page-header">Reset Your Password</div>

                <div className="knits-form login-form">
                    <div className="form-info">
                        Reset your password from here.
                    </div>
                    <div className="knits-form__input knits-form__input--last">
                        <div className="knits-form__input__label">Password</div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="knits-form__input__field"
                            value={formData.password}
                            onChange={(e) =>
                                _changeFormData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="knits-form__input__error">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="knits-form__input knits-form__input--last">
                        <div className="knits-form__input__label">
                            Confirm Password
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Re-enter Your Password"
                            className="knits-form__input__field"
                            value={formData.confirm_password}
                            onChange={(e) =>
                                _changeFormData(
                                    "confirm_password",
                                    e.target.value
                                )
                            }
                        />
                        {errors.confirm_password && (
                            <div className="knits-form__input__error">
                                {errors.confirm_password}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-primary btn-full"
                        style={{ marginTop: "1rem" }}
                        disabled={loading}
                        onClick={_resetPassword}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ResetPassword;
