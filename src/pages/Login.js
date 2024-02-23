import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/public/user";
import isEmail from "../helpers/isEmail";
import isEmpty from "../helpers/isEmpty";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/ActionCreators/AuthAction";
import Footer from "../components/Layouts/Footer";
import { toast } from "react-toastify";
function Login() {
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _changeFormData = (name, value) => {
        let _formData = { ...formData };
        _formData[name] = value;
        setFormData(_formData);
    };

    const _login = async (e) => {
        e.preventDefault();
        if (validateLogin()) {
            //send login request
            setLoading(true);

            let dataToSend = {
                email: formData.email,
                password: formData.password,
            };
            const controller = new AbortController();

            await loginUser(dataToSend, "", controller.signal)
                .then((res) => {
                    console.log(res);
                    if (res.response.ok) {
                        let _authData = {
                            user: res.json.user,
                            auth_token: res.json.token,
                        };

                        dispatch(login(_authData));
                        localStorage.setItem(
                            "knit_user",
                            JSON.stringify(_authData)
                        );
                        navigate("/");
                        toast.success("Logged in successfully");
                    } else {
                        if (res.json.detail) {
                            toast.error(res.json.detail);
                        }
                    }
                })
                .catch((err) => {
                    toast.error("Unable to Login at the moment");
                });

            setLoading(false);
            return () => controller.abort();
        }
    };

    const validateLogin = () => {
        let _emailError = "";
        let _passwordError = "";
        let _toReturn = false;

        if (isEmpty(formData.email)) {
            _emailError = "Please enter your email";
        } else if (!isEmail(formData.email)) {
            _emailError = "Not a valid email address";
        }
        if (isEmpty(formData.password)) {
            _passwordError = "Please provide your password";
        }
        setErrors({ email: _emailError, password: _passwordError });
        if (_emailError || _passwordError) {
        } else {
            return true;
        }

        return _toReturn;
    };

    return (
        <>
            <div className="page login-page">
                <div className="page-header">Login</div>

                <form
                    onSubmit={_login}
                    method="post"
                    className="knits-form login-form"
                >
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
                    <div>
                        <Link
                            to="/forgot-password"
                            className="link-border"
                            style={{ fontSize: "0.875rem" }}
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        className="knits-form__button btn btn-primary btn-full"
                        disabled={loading}
                        onClick={_login}
                    >
                        Login
                    </button>

                    {/* <div className="knits-form__flex">
                        <div>
                            <label forHtml="rememberMe">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                        </div>
                    </div> */}

                    <div className="knits-form__bottom">
                        Haven't registered to Knits and Stiches yet?{" "}
                        <Link className="link-border" to="/register">
                            Register
                        </Link>
                    </div>
                    <input type="submit" hidden />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;
