import React from "react";
import { Link } from "react-router-dom";
import PrimaryLogoImg from "../../assets/images/logos/vertical-logo.png";
import FacebookLogo from "../../assets/images/socials/facebook.png";
import InstagramLogo from "../../assets/images/socials/instagram.png";
import TwitterLogo from "../../assets/images/socials/twitter.png";
import Copyright from "../partials/Copyright";

import PhoneImg from "../../assets/images/socials/phone.png";
import MailImg from "../../assets/images/socials/email.png";

function Footer() {
    return (
        <div className="footer-container">
            <div className="page-container" style={{ margin: "0 auto" }}>
                <div className="footer__logo">
                    <img src={PrimaryLogoImg} />
                </div>

                <div className="footer">
                    <div className="footer__left">
                        <div className="footer__left__first">
                            <div className="footer-title">About Us</div>
                            <div className="footer__left__first__content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>
                        </div>
                    </div>

                    <div className="footer__right__socials">
                        <div className="footer-title">Follow Us</div>
                        <div className="footer__right__socials__icons">
                            <a href="">
                                <div className="footer__right__socials__icons__icon">
                                    <img src={FacebookLogo} />
                                </div>
                            </a>

                            <a href="">
                                <div className="footer__right__socials__icons__icon">
                                    <img src={InstagramLogo} />
                                </div>
                            </a>

                            <a href="">
                                <div className="footer__right__socials__icons__icon">
                                    <img src={TwitterLogo} />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="footer__right__contact">
                        <div className="footer-title">Contacts</div>
                        <div className="footer__right__contact__content">
                            <div className="footer__right__contact__content__indi">
                                <div className="footer__right__contact__content__indi__logo">
                                    <img src={PhoneImg} />
                                </div>
                                <div className="footer__right__contact__content__indi__label">
                                    +977-014253673
                                </div>
                            </div>

                            <div className="footer__right__contact__content__indi">
                                <div className="footer__right__contact__content__indi__logo">
                                    <img src={MailImg} />
                                </div>
                                <div className="footer__right__contact__content__indi__label">
                                    knitsandstitches@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Copyright />
            </div>
        </div>
    );
}

export default Footer;
