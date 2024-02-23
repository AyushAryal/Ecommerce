import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateWishListItem } from "../../api/private/wishlist";
import ProductImage from "../../assets/images/products/1.jpg";
import { extractId } from "../../helpers/utils";
import { updateWishList } from "../../redux/ActionCreators/WishListAction";
function WishListCard({ productLoading, data, setProductLoading }) {
    const [variantData, setVariantData] = useState();

    const wishListState = useSelector((state) => state.WishList.wishListItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchImage = () => {
        let variantId = data.item_variant;
        console.log(variantId);
        let variantData = _getVariantData(variantId);
        setVariantData(variantData);
    };

    const _getVariantData = (id) => {
        let _toReturn = {};
        data.item.variants.map((_data) => {
            console.log(_data);
            if (_data.id === id) {
                _toReturn = _data;
            }
        });

        return _toReturn;
    };

    const removeFromWishList = async () => {
        setProductLoading(true);
        let _toSend = [];
        wishListState &&
            wishListState.map((item) => {
                if (item.item_variant !== data.item_variant) {
                    _toSend.push(item);
                }
            });
        let controller = new AbortController();
        await updateWishListItem({ items: [..._toSend] }, "", controller.signal)
            .then((res) => {
                if (res.response.ok) {
                    dispatch(updateWishList(_toSend));
                    toast.success("Item removed from wishlist");
                } else {
                    toast.success("Couldnt remove item from wishlist");
                }
            })
            .catch((err) => {
                toast.success("Couldnt remove item from wishlist");
            });

        setProductLoading(false);
        return () => controller.abort();
    };

    const movetoVariant = () => {
        console.log("Clicked");
        let query = `/products/${extractId(data.item.url)}?variant=${
            variantData.color
        }`;

        navigate(query);
    };
    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div
            className={`wishlist-card ${
                productLoading ? "wishlist-card--loading" : ""
            }`}
        >
            <div onClick={movetoVariant}>
                <div className="wishlist-card__image">
                    <img src={variantData && variantData.images[0]} />
                </div>
                {variantData && (
                    <div className="wishlist-card__name">{`${data.item.name} (${variantData.color})`}</div>
                )}
            </div>

            <div
                className="wishlist-card__operations link-withdecoration"
                onClick={removeFromWishList}
            >
                Remove from Wishlist
            </div>
        </div>
    );
}

export default WishListCard;
