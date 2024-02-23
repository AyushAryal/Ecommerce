import React from "react";
import { Link } from "react-router-dom";
import successImg from "../assets/images/successful.png";
import Footer from "../components/Layouts/Footer";
function RegistrationSuccess() {
    return (
        <>
            <div className="page success-page">
                <div className="center-element">
                    <div className="success-page__desc">
                        <div className="success-page__desc__image">
                            <img src={successImg} />
                        </div>
                        <div className="success-page__desc__title">
                            Registration Successful!
                        </div>
                        <div className="success-page__desc__content">
                            Registration was successfully done! Admin will look
                            through your request to verify your request. <br />
                            You will be getting a link when you are verified.
                            <br />
                        </div>

                        <Link to="/" className="success-page__link">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RegistrationSuccess;
