import React from "react";
import { Link } from "react-router-dom";
import successImg from "../assets/images/successful.png";
import Footer from "../components/Layouts/Footer";

function CheckoutSuccess() {
    return (
        <>
            <div className="page success-page">
                <div className="center-element">
                    <div className="success-page__desc">
                        <div className="success-page__desc__image">
                            <img src={successImg} />
                        </div>
                        <div className="success-page__desc__title">
                            Checkout Successful!
                        </div>
                        <div className="success-page__desc__content">
                            Checkout was successfully done! Admin will look
                            through your request to verify your request. <br />
                            You will be getting some info from ADmin now.
                            <br />
                        </div>

                        <Link to="/">Go to Home</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CheckoutSuccess;
