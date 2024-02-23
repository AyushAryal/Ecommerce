import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ProductImage from "../../assets/images/products/1.jpg";
import {
    extractId,
    getFormattedDate,
    capitaliseFirstLetter,
} from "../../helpers/utils";

import DefaultImage from "../../assets/images/products/default.jpg";

function Order({ data, index }) {
    const getVariantInfo = (productData) => {
        let activeId = productData.item_variant;
        let toRetun = "";
        productData.item.variants.map((_variant) => {
            if (activeId === _variant.id) {
                toRetun = `${productData.item.name} (${_variant.color})`;
            }
        });

        return toRetun;
    };

    const getVariantImage = (productData) => {
        let activeId = productData.item_variant;
        let toRetun;
        productData.item.variants.map((_variant) => {
            if (activeId === _variant.id) {
                toRetun = _variant.images[0] || DefaultImage;
            }
        });

        return toRetun;
    };
    return (
        <Accordion>
            <Accordion.Item eventKey={index}>
                <Accordion.Header>
                    <div className="acc-header">
                        <div className="acc-header__title">Order No.</div>
                        <div className="acc-header__value">
                            #{extractId(data.url)}
                        </div>
                    </div>
                    <div className="acc-header">
                        <div className="acc-header__title">Order Placed</div>
                        <div className="acc-header__value">
                            {getFormattedDate(data.timestamp)}{" "}
                        </div>
                    </div>
                    <div className="acc-header">
                        <div className="acc-header__title">Order Status</div>
                        <div className="acc-header__value">
                            {capitaliseFirstLetter(data.status)}
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    {data.purchases.map((_data, index) => {
                        return (
                            <div
                                className="order-body"
                                key={_data.item_variant}
                            >
                                <div className="order-body__left">
                                    <div className="order-body__left__image">
                                        <img
                                            src={
                                                getVariantImage(_data) ||
                                                DefaultImage
                                            }
                                        />
                                    </div>
                                    <div className="order-body__left__desc">
                                        <div className="order-body__left__desc__name">
                                            {getVariantInfo(_data)}
                                        </div>
                                        <div className="order-body__left__desc__quantity">
                                            Quantity : {_data.quantity}
                                        </div>
                                    </div>
                                </div>
                                <div className="order-body__right">
                                    Quantity : {_data.quantity}
                                </div>
                            </div>
                        );
                    })}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Order;
