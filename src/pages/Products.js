import React, { useEffect, useState } from "react";
import Image1 from "../assets/images/products/chappal1.webp";
import Image2 from "../assets/images/products/chappal2.webp";
import Image3 from "../assets/images/products/chappal3.webp";
import Image4 from "../assets/images/products/chappal4.webp";
import Image5 from "../assets/images/products/chappal5.webp";
import Image6 from "../assets/images/products/9.webp";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import Variant1 from "../assets/images/products/4.jpg";
import Variant2 from "../assets/images/products/chappal1.webp";
import Variant3 from "../assets/images/products/chappalwhite1.webp";

import Info from "../assets/images/info.png";
import OtherImage2 from "../assets/images/products/chappalgray.webp";
import OtherImage3 from "../assets/images/products/chappalwhite1.webp";
import Variants from "../components/Products/Variants";
import ProductImage from "../components/Products/ProductImage";

import { ReactComponent as AddSVG } from "../assets/svgs/add.svg";
import { ReactComponent as SubstractSVG } from "../assets/svgs/substract.svg";
import { ReactComponent as WishlistSVG } from "../assets/svgs/wishlist.svg";
import ProductCard from "../components/Products/ProductCard";
import CartItem from "../components/resuables/CartItem";
import CartBtn from "../components/resuables/CartBtn";
import Footer from "../components/Layouts/Footer";
import { useNavigate, useParams } from "react-router";
import {
    fetchIndividualProduct,
    fetchProductsByCategory,
    fetchSimilarProducts,
} from "../api/private/products";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../api/private/cart";
import {
    addProducts,
    updateProducts,
} from "../redux/ActionCreators/CartAction";
import { toast } from "react-toastify";
import { updateWishListItem } from "../api/private/wishlist";
import { updateWishList } from "../redux/ActionCreators/WishListAction";
import SkeletonLoader from "../components/resuables/Loader/SkeletonLoader";
import SkeletonParagraph from "../components/resuables/Loader/SkeletonParagraph";
import ProductLoader from "../components/resuables/Loader/ProductLoader";
import SkeletonProductLoader from "../components/resuables/Loader/SkeletonProductLoader";
import { useSearchParams } from "react-router-dom";
import { extractId } from "../helpers/utils";

import DefaultImage from "../assets/images/products/default.jpg";

function Products() {
    const { id } = useParams();
    const [productImages, setProductImages] = useState([]);
    const variants = [
        { id: "v1", image: Variant1, color: "red" },
        { id: "v2", image: Variant2, color: "blue" },
        { id: "v3", image: Variant3, color: "white" },
    ];

    const [styleImage, setStyleImage] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const cartState = useSelector((state) => state.Cart.cart);

    const whiteListState = useSelector((state) => state.WishList);
    const otherImages = [];

    const [selectedImage, setSelectedImage] = useState();
    const [cartQuantity, setCartQuantity] = useState(1);
    const [showWishlist, setShowWishList] = useState(false);

    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

    const [productDetail, setProductDetail] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState({});

    const [isWhiteListed, setIsWhiteListed] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const isVariantWhitelisted = () => {
        let toreturn = false;
        whiteListState &&
            whiteListState.wishListItems.map((item) => {
                if (item.item_variant === selectedVariant.id) {
                    toreturn = true;
                }
            });
        return toreturn;
    };

    const _toggleWhiteList = async () => {
        let _items = [];
        console.log(whiteListState.wishListItems);
        setProductLoading(true);
        if (isWhiteListed) {
            whiteListState.wishListItems.map((item) => {
                if (item.item_variant !== selectedVariant.id) {
                    _items.push(item);
                }
            });
        } else {
            _items = [
                ...whiteListState.wishListItems,
                { item: productDetail, item_variant: selectedVariant.id },
            ];
        }

        console.log(_items);

        let controller = new AbortController();
        updateWishListItem({ items: _items }, "", controller.signal)
            .then((res) => {
                if (res.response.ok) {
                    if (isWhiteListed) {
                        setIsWhiteListed(false);
                        toast.success("Item removed from wishlist");
                    } else {
                        setIsWhiteListed(true);
                        toast.success("Item added to wishlist");
                    }
                    dispatch(updateWishList(_items));
                } else {
                    toast.error("Unable to change the data");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to change the data");
            });
        setProductLoading(false);
        return () => controller.abort();
    };

    const _checkCartDetails = (variantId) => {
        //check to see if the item is in cart
        let _quantity = 1;
        let _isInCart = false;
        cartState &&
            cartState.map((cartData) => {
                if (cartData.item_variant == variantId) {
                    _isInCart = true;
                    _quantity = cartData.quantity;
                }
            });
        setCartQuantity(_quantity);
        setIsInCart(_isInCart);
    };

    useEffect(() => {
        if (selectedVariant && selectedVariant.id) {
            setIsWhiteListed(isVariantWhitelisted);
            setProductImages(selectedVariant.images);
            console.log(selectedVariant.images);
            setSelectedImage(selectedVariant.images[0]);
            setCurrentIndex(0);
            _checkCartDetails(selectedVariant.id);
        }
    }, [selectedVariant]);

    // const _getSimilarProducts = async (category, signal) => {
    //     let query = `?category=${category.id}`;
    //     await fetchProductsByCategory(null, query, signal)
    //         .then((res) => {
    //             if (res.response.ok) {
    //                 let data = res.json.results.slice(0, 4);
    //                 setSimilarProducts(data);
    //             } else {
    //             }
    //         })
    //         .catch((err) => {});
    // };

    const dispatch = useDispatch();

    const _getItemDetails = async (signal) => {
        setLoading(true);
        await fetchIndividualProduct({ id }, "", signal)
            .then(async (res) => {
                if (res.response.ok) {
                    setProductDetail(res.json);

                    if (searchParams.get("variant")) {
                        let _toselect = searchParams.get("variant");
                        let _selectedVariant = res.json.variants[0];

                        res.json.variants.map((item) => {
                            if (item.color === _toselect) {
                                _selectedVariant = item;
                            }
                        });

                        setSelectedVariant(_selectedVariant);
                    } else {
                        setSelectedVariant(res.json.variants[0]);
                    }

                    await fetchSimilarProducts({ productId: id }, "", signal)
                        .then((_res) => {
                            if (_res.response.ok) {
                                setSimilarProducts(
                                    _res.json.results.splice(0, 4)
                                );
                            } else {
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // if (res.json.categories.length > 0) {
                    //     _getSimilarProducts(res.json.categories[0], signal);
                    // }
                } else {
                    if (res.response.status === 404) {
                        navigate("/error404");
                    }
                }
            })
            .catch((err) => {});

        setLoading(false);
    };

    useEffect(() => {
        const controller = new AbortController();
        _getItemDetails(controller.signal);
        return () => controller.abort();
    }, [id]);
    const updateItem = (type, value) => {
        console.log("Cliceked");
        console.log("Value", value);
        if (type == "input" && value < 1000) {
            setCartQuantity(value);
        } else if (type == "subs" && cartQuantity > 1) {
            if (cartQuantity === "") {
                setCartQuantity(1);
            } else {
                setCartQuantity((prev) => --prev);
            }
        } else if (type == "add") {
            if (cartQuantity === "") {
                setCartQuantity(1);
            } else {
                setCartQuantity((prev) => ++prev);
            }
        }

        console.log(cartQuantity);
    };

    const _addItemToCart = async () => {
        let toSend = {};
        if (isInCart) {
            let _toSend = [];

            cartState &&
                cartState.map((_cartItem) => {
                    if (_cartItem.item_variant !== selectedVariant.id) {
                        _toSend.push(_cartItem);
                    } else {
                        _toSend.push({
                            item: productDetail,
                            item_variant: selectedVariant.id,
                            quantity: cartQuantity,
                        });
                    }
                });

            toSend = { items: [..._toSend] };
        } else {
            toSend = {
                items: [
                    ...cartState,
                    {
                        item: productDetail,
                        item_variant: selectedVariant.id,
                        quantity: cartQuantity,
                    },
                ],
            };
        }

        setProductLoading(true);
        const controller = new AbortController();
        await addItemToCart(toSend, "", controller.signal)
            .then((res) => {
                if (res.response.ok) {
                    toast.success("Item added to cart");
                    dispatch(updateProducts(toSend.items));
                } else {
                    toast.error("Unable to add item to cart");
                }
            })
            .catch((err) => {
                toast.error("Unable to add item to cart");
            });
        setProductLoading(false);

        return () => controller.abort();
    };
    return (
        <>
            <div className="page product-page">
                {loading || !selectedImage ? (
                    <>
                        <ProductLoader />
                    </>
                ) : (
                    <div className="product-page__container">
                        <div className="product-page__right">
                            <div className="product-page__right__container">
                                <div className="product-page__right__main">
                                    <ProductImage
                                        productImages={productImages}
                                        selectedImage={selectedImage}
                                        setSelectedImage={setSelectedImage}
                                        currentIndex={currentIndex}
                                        setCurrentIndex={setCurrentIndex}
                                    />
                                </div>
                                <div className="product-page__right__sub">
                                    <Swiper
                                        navigation={true}
                                        slidesPerView={4.7}
                                        spaceBetween={10}
                                        className="product-page__right__sub__swiper"
                                        breakpoints={{
                                            576: {
                                                slidesPerView: 5,
                                            },
                                            // when window width is >= 768px
                                            768: {
                                                slidesPerView: 6,
                                            },
                                            992: {
                                                slidesPerView: 4.7,
                                            },
                                        }}
                                    >
                                        {productImages &&
                                            productImages.map((data, index) => {
                                                console.log(data);
                                                return (
                                                    <SwiperSlide
                                                        className={`product-page__right__sub__swiper__slide ${
                                                            currentIndex ===
                                                            index
                                                                ? "product-page__right__sub__swiper__slide--active"
                                                                : ""
                                                        }`}
                                                    >
                                                        <img
                                                            src={data}
                                                            onClick={() => {
                                                                setCurrentIndex(
                                                                    index
                                                                );
                                                            }}
                                                        />
                                                    </SwiperSlide>
                                                );
                                            })}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="product-page__left">
                            <div className="product-page__product">
                                <div className="product-page__product__title">
                                    <h1> {productDetail.name}</h1>
                                </div>

                                {productDetail.subtitle && (
                                    <div className="product-page__product__intro">
                                        <p> {parse(productDetail.subtitle)}</p>
                                    </div>
                                )}
                                <div className="product-page__product__color">
                                    <div className="product-page__product__color__title">
                                        Color variants
                                    </div>
                                    <div className="product-page__product__color__colors">
                                        {productDetail.variants &&
                                            productDetail.variants.map(
                                                (data, index) => {
                                                    return (
                                                        <Variants
                                                            data={data}
                                                            selectedVariant={
                                                                selectedVariant
                                                            }
                                                            setSelectedVariant={
                                                                setSelectedVariant
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                                <div className="product-page__product__quantity-title">
                                    Quantity
                                </div>
                                <div className="product-page__product__cart">
                                    <CartBtn
                                        cartQuantity={cartQuantity}
                                        setCartQuantity={setCartQuantity}
                                    />
                                    <button
                                        className="btn btn-primary btn-full "
                                        disabled={
                                            cartQuantity == "" ||
                                            cartQuantity == 0 ||
                                            productLoading
                                        }
                                        onClick={() => _addItemToCart()}
                                    >
                                        {isInCart
                                            ? "Update Cart"
                                            : "Add to cart"}
                                    </button>
                                    <div
                                        className={`product-page__product__cart__wishlist ${
                                            isWhiteListed
                                                ? "product-page__product__cart__wishlist--saved"
                                                : ""
                                        }`}
                                        onMouseEnter={() =>
                                            setShowWishList(true)
                                        }
                                        onMouseLeave={() =>
                                            setShowWishList(false)
                                        }
                                    >
                                        <WishlistSVG
                                            onClick={_toggleWhiteList}
                                        />
                                        <div
                                            className={`variant__popup variant__popup--wishlist ${
                                                showWishlist
                                                    ? "variant__popup--active"
                                                    : ""
                                            }`}
                                        >
                                            <div className="variant__popup__pointer"></div>
                                            <div className="variant__popup__text">
                                                {!isWhiteListed
                                                    ? "Add to Wishlist"
                                                    : "Remove from  WishList"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="product-page__product__desc">
                                    <div className="product-page__product__desc__title">
                                        <div className="product-page__product__desc__title__icon">
                                            <img src={Info} />
                                        </div>{" "}
                                        <div>Product Description</div>
                                    </div>
                                    {parse(productDetail.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="product-page__interested">
                        <div className="product-page__interested__title">
                            <SkeletonLoader type="title" />
                        </div>
                        <div className="product-page__interested__products">
                            <SkeletonProductLoader />
                            <SkeletonProductLoader />
                            <SkeletonProductLoader />
                            <SkeletonProductLoader />
                        </div>
                    </div>
                ) : (
                    similarProducts &&
                    similarProducts.length > 0 && (
                        <div className="product-page__interested">
                            <div className="product-page__interested__title">
                                You might also be interested in
                            </div>
                            <div className="product-page__interested__products">
                                {similarProducts.map((similarItem) => {
                                    return (
                                        <ProductCard
                                            image={
                                                (similarItem.variants &&
                                                    similarItem.variants[0] &&
                                                    similarItem.variants[0]
                                                        .images[0]) ||
                                                DefaultImage
                                            }
                                            name={similarItem.name}
                                            productId={extractId(
                                                similarItem.url
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

export default Products;
