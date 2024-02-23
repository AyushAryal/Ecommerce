import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { changeUserPassword } from "../../api/private/user";
import isEmpty from "../../helpers/isEmpty";

function ResetPassword() {
    const [errors, setErrors] = useState({
        current_password: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        current_password: "",
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
            await changeUserPassword(data_toSend, "", controller.signal)
                .then((res) => {
                    if (res.response.ok) {
                        toast.success("Password changed successfully");
                        navigate("/");
                    } else {
                        if (res.json.password) {
                            setErrors({
                                current_password: res.json.password[0],
                            });
                        } else if (res.json.new_password) {
                            setErrors({
                                password: res.json.new_password[0],
                            });
                        }
                    }
                })
                .catch((err) => {});

            setLoading(false);

            return () => controller.abort();
        }
    };

    const validateForm = () => {
        let _currentPasswordError = "";
        let _passwordError = "";
        let _confirmPasswordError = "";
        let _toReturn = false;

        if (isEmpty(formData.current_password)) {
            _currentPasswordError = "Please enter your current password";
        }
        if (isEmpty(formData.password)) {
            _passwordError = "Please provide your password";
        } else if (isEmpty(formData.confirm_password)) {
            _confirmPasswordError = "Please provide your password";
        } else if (formData.password !== formData.confirm_password) {
            _passwordError = "Passwords do not match.";
        }

        setErrors({
            current_password: _currentPasswordError,
            password: _passwordError,
            confirm_password: _confirmPasswordError,
        });
        if (_currentPasswordError || _passwordError) {
        } else {
            return true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="knits-form__input">
                <div className="knits-form__input__label">Current Password</div>
                <input
                    type="password"
                    name="currentPAssword"
                    placeholder="Enter your Current Password"
                    className="knits-form__input__field"
                    value={formData.current_password}
                    onChange={(e) =>
                        _changeFormData(
                            "current_password",
                            e.target.value.trim()
                        )
                    }
                />
                {errors.current_password && (
                    <div className="knits-form__input__error">
                        {errors.current_password}
                    </div>
                )}
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
                <div className="knits-form__input__label">Confirm Password</div>
                <input
                    type="password"
                    name="password"
                    placeholder="Re-enter Your Password"
                    className="knits-form__input__field"
                    value={formData.confirm_password}
                    onChange={(e) =>
                        _changeFormData("confirm_password", e.target.value)
                    }
                />
                {errors.confirm_password && (
                    <div className="knits-form__input__error">
                        {errors.confirm_password}
                    </div>
                )}
            </div>

            <button
                className="btn btn-primary btn-sm"
                disabled={loading}
                onClick={_resetPassword}
            >
                Reset Password
            </button>
        </>
    );
}

export default ResetPassword;
