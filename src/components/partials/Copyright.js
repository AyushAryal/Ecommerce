import React from "react";
import { Link } from "react-router-dom";

function Copyright() {
    return (
        <div
            className="copyright-container page-container"
            style={{ margin: "0 auto" }}
        >
            <div className="copyright">
                <div>
                    &copy; 2022. Designed and developed by Ayush Aryal. All
                    rights reserved.
                </div>
                <div>
                    <Link>Terms And Conditions</Link>
                    <Link>Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}

export default Copyright;
