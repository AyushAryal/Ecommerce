import React from "react";
import Order from "./resuables/Order";
import Accordion from "react-bootstrap/Accordion";
import SkeletonLoader from "./resuables/Loader/SkeletonLoader";
import { Link } from "react-router-dom";
function MyOrders({ loading, orders }) {
    return (
        <div className="my-orders">
            <div className="profile-header">My Orders</div>

            <div className="my-orders__container">
                {loading ? (
                    <>
                        {[1, 2, 3].map((data) => {
                            return <SkeletonLoader type="order" />;
                        })}
                    </>
                ) : (
                    <>
                        {orders && orders.length === 0 ? (
                            <>
                                <div className="empty-state">
                                    <div className="empty-state__text">
                                        There are no orders yet to display!
                                    </div>
                                    <Link to="/" className="empty-state__order">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </>
                        ) : (
                            orders.map((data, index) => {
                                return (
                                    <Order
                                        data={data}
                                        key={index}
                                        index={index}
                                    />
                                );
                            })
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MyOrders;
