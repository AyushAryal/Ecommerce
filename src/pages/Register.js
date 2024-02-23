import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "../helpers/isEmail";
import isEmpty from "../helpers/isEmpty";
import PhoneInput from "react-phone-number-input";
import { registerUser } from "../api/public/user";
import Footer from "../components/Layouts/Footer";
import { toast } from "react-toastify";

function Register() {
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        whyjoin: "",
        address: "",
        password: "",
        confirm_password: "",
    });

    const [phoneValue, setPhoneValue] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        whyjoin: "",
        address: "",
        password: "",
        confirm_password: "",
    });

    const [readTerms, setReadTerms] = useState(false);

    const navigate = useNavigate();

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;

        setFormData(_formData);
    };

    const _register = async (e) => {
        e.preventDefault();
        if (validateRegistration()) {
            setLoading(true);
            let dataToSend = {
                email: formData.email,
                customer: {
                    contact: phoneValue,
                    company_name: formData.name,
                    company_address: formData.address,
                    reason_for_signup: formData.whyjoin,
                },
                username: formData.email,
                password: formData.password,
            };
            const controller = new AbortController();

            await registerUser(dataToSend, "", controller.signal)
                .then((res) => {
                    console.log(res);
                    if (res.response.ok) {
                        toast.success("Registration sucessful!");
                        navigate(`/verify-email?email=${formData.email}`);
                    } else {
                        let _errors = {};
                        if (res.json.email) {
                            _errors.email = res.json.email[0];
                        }
                        if (res.json.password) {
                            _errors.password = res.json.password[0];
                        }
                        setErrors({ ...errors, ..._errors });

                        toast.error("Invalid form details");
                    }
                })
                .catch((err) => {});

            setLoading(false);
            return () => controller.abort();
        }
    };

    const validateRegistration = () => {
        let _emailError = "";
        let _nameError = "";
        let _whyJoinError = "";
        let _addressError = "";
        let _passwordError = "";
        let _confirmPasswordError = "";
        let _toReturn = false;

        if (isEmpty(formData.email)) {
            _emailError = "Please enter your email";
        } else if (!isEmail(formData.email)) {
            _emailError = "Not a valid email address";
        }

        if (isEmpty(formData.name)) {
            _nameError = "Please provide your company name";
        }
        if (isEmpty(formData.address)) {
            _addressError = "Please provide your primary company address";
        }

        if (isEmpty(formData.whyjoin) || formData.whyjoin.length < 10) {
            _whyJoinError = "Please provide valid reason to join";
        } else if (formData.whyjoin.length > 1000) {
            _whyJoinError = "Max length :1000 letters";
        }

        if (isEmpty(formData.password)) {
            _passwordError = "Please provide password";
        } else if (formData.password.length < 8) {
            _passwordError = "Password too short";
        } else if (formData.password.length > 25) {
            _passwordError = "Password too long";
        } else {
            if (isEmpty(formData.confirm_password)) {
                _confirmPasswordError = "Confirm your password";
            } else if (formData.confirm_password !== formData.password) {
                _passwordError = "Passwords do not match";
            }
        }

        setErrors({
            email: _emailError,
            name: _nameError,
            whyjoin: _whyJoinError,
            address: _addressError,
            password: _passwordError,
            confirm_password: _confirmPasswordError,
        });
        if (
            _emailError ||
            !readTerms ||
            _nameError ||
            _whyJoinError ||
            _addressError ||
            _passwordError ||
            _confirmPasswordError
        ) {
            window.scrollTo(0, 200);
        } else {
            return true;
        }

        return _toReturn;
    };
    return (
        <>
            <div className="page register-page">
                <div className="page-header">Join Knits and Stitches</div>
                {/* <div className="register-page__desc">
                <p>
                    To create a free Ravelry account, you'll need a valid email
                    address.
                </p>

                <p>
                    This address will *only* be used to send you your signup
                    link. We will never send you spam or other unwanted email.
                </p>
            </div> */}

                <form
                    method="post"
                    onSubmit={_register}
                    className="knits-form login-form"
                >
                    <div className="form-info">
                        This address will *only* be used to send you your signup
                        link. We will never send you spam or other unwanted
                        email.
                    </div>
                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Company Name*
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Company Name"
                            className="knits-form__input__field"
                            value={formData.name}
                            onChange={(e) =>
                                _changeFormData("name", e.target.value.trim())
                            }
                        />
                        {errors.email && (
                            <div className="knits-form__input__error">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Company Address*
                        </div>
                        <input
                            type="text"
                            name="address"
                            placeholder="Where are you located at"
                            className="knits-form__input__field"
                            value={formData.address}
                            onChange={(e) =>
                                _changeFormData(
                                    "address",
                                    e.target.value.trim()
                                )
                            }
                        />
                        {errors.address && (
                            <div className="knits-form__input__error">
                                {errors.address}
                            </div>
                        )}
                    </div>
                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Email Address*
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

                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Contact Number
                        </div>
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="US"
                            value={phoneValue}
                            onChange={setPhoneValue}
                        />
                    </div>

                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Password*
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="knits-form__input__field"
                            value={formData.password}
                            onChange={(e) =>
                                _changeFormData(
                                    "password",
                                    e.target.value.trim()
                                )
                            }
                        />
                        {errors.password && (
                            <div className="knits-form__input__error">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Confirm Password*
                        </div>
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm your password"
                            className="knits-form__input__field"
                            value={formData.confirm_password}
                            onChange={(e) =>
                                _changeFormData(
                                    "confirm_password",
                                    e.target.value.trim()
                                )
                            }
                        />
                        {errors.confirm_password && (
                            <div className="knits-form__input__error">
                                {errors.confirm_password}
                            </div>
                        )}
                    </div>
                    <div className="knits-form__input">
                        <div className="knits-form__input__label">
                            Why do you want to join Us*
                        </div>
                        <textarea
                            placeholder="Provide some description (Max:1000)"
                            onChange={(e) =>
                                _changeFormData(
                                    "whyjoin",
                                    e.target.value.trim()
                                )
                            }
                            rows={4}
                        >
                            {formData.whyjoin}
                        </textarea>
                        {errors.whyjoin && (
                            <div className="knits-form__input__error">
                                {errors.whyjoin}
                            </div>
                        )}
                    </div>
                    <div>
                        <label forHtml="rememberMe" style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                checked={readTerms}
                                onChange={() => setReadTerms((prev) => !prev)}
                                id="customCheck1"
                            />

                            <span
                                style={{
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                }}
                            >
                                I have read all the{" "}
                                <Link
                                    className="link-border"
                                    to="/terms-and-condition"
                                >
                                    Terms and Conditions
                                </Link>
                            </span>
                        </label>
                    </div>

                    <button
                        className="knits-form__button btn btn-primary btn-full"
                        disabled={loading || !readTerms}
                        onClick={_register}
                    >
                        Register
                    </button>

                    <div className="knits-form__bottom">
                        Already Have an account?{" "}
                        <Link className="link-border" to="/login">
                            Login
                        </Link>
                    </div>
                    <input type="submit" hidden />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Register;
