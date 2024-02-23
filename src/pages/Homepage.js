import React, { useState, useEffect } from "react";
import Navbar from "../components/Layouts/Navbar";
import Banner1 from "../assets/images/banners/banner1.png";
import Banner2 from "../assets/images/banners/banner2.png";

import Brief1 from "../assets/images/banners/small-banner1.jpg";
import Brief2 from "../assets/images/banners/small-banner2.jpg";

import DefaultImg from "../assets/images/products/default.jpg";
import { extractId } from "../helpers/utils";

import Image2 from "../assets/images/products/chappal2.webp";
import Image3 from "../assets/images/products/chappal3.webp";
import Image4 from "../assets/images/products/chappal4.webp";
import Image5 from "../assets/images/products/chappal5.webp";

import LeftImg from "../assets/images/banners/img1.webp";
import RightImg1 from "../assets/images/banners/img2.webp";
import RightImg2 from "../assets/images/banners/img3.webp";

import CategoryCard from "../components/Products/CategoryCard";
import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/Layouts/Footer";
import {
    fetchBanners,
    fetchRecommendedCategories,
    fetchRecommendedItems,
} from "../api/public/home";
import SkeletonLoader from "../components/resuables/Loader/SkeletonLoader";
import ProductLoader from "../components/resuables/Loader/ProductLoader";
import SkeletonParagraph from "../components/resuables/Loader/SkeletonParagraph";

const HomePageLoader = () => {
    return (
        <div className="homepage">
            <div className="homepage__banner">
                <SkeletonLoader type="banner" />
            </div>

            <div className="page-container">
                <div className="homepage__favourite-categories">
                    <div className="homepage__favourite-categories__title">
                        <SkeletonLoader type="title" />
                    </div>
                    <div className="homepage__favourite-categories__container">
                        <SkeletonLoader type="product-image" />
                        <SkeletonLoader type="product-image" />
                        <SkeletonLoader type="product-image" />
                        <SkeletonLoader type="product-image" />
                    </div>
                </div>
                <br />
                <br />
                <SkeletonParagraph />
                <br />
                <br />
                <SkeletonParagraph />
                <br />
                <br />
                <SkeletonParagraph />

                <br />
                <br />
                <SkeletonParagraph />
                <br />
                <br />
                <SkeletonParagraph />
            </div>
        </div>
    );
};

function Homepage() {
    const [loading, setLoading] = useState(true);

    const [productBanners, setProductBanners] = useState();
    const [recommendedProducts, setRecommendedProducts] = useState();
    const [recommendedCategories, setRecommendedCategories] = useState();

    const _getHomepageBanners = async (signal) => {
        await fetchBanners(null, "", signal)
            .then((res) => {
                if (res.response.ok) {
                    let _desktopBanner = [];
                    let _mobileBanner = [];
                    res.json.results.map((_data) => {
                        if (_data.for_mobile) {
                            _mobileBanner = [..._mobileBanner, _data];
                        } else {
                            _desktopBanner = [..._desktopBanner, _data];
                        }
                    });
                    setProductBanners({
                        mobile: _mobileBanner,
                        desktop: _desktopBanner,
                    });
                } else {
                }
            })
            .then((res) => {})
            .catch((err) => {});
    };

    const _getRecommendedProducts = async (signal) => {
        await fetchRecommendedItems(null, "?recommend=true", signal)
            .then((res) => {
                if (res.response.ok) {
                    setRecommendedProducts(res.json.results);
                } else {
                }
            })
            .catch((err) => {});
    };

    const _getRecommendedCategories = async (signal) => {
        await fetchRecommendedCategories(null, "?recommend=true", signal)
            .then((res) => {
                if (res.response.ok) {
                    setRecommendedCategories(res.json.results);
                } else {
                }
            })
            .catch((err) => {});
    };

    const _getHomepageDatas = async () => {
        let controller = new AbortController();

        await _getHomepageBanners(controller.signal);
        await _getRecommendedProducts(controller.signal);
        await _getRecommendedCategories(controller.signal);
        setLoading(false);

        return () => controller.abort();
    };

    useEffect(() => {
        setLoading(true);
        _getHomepageDatas();
    }, []);

    return (
        <>
            {loading || !productBanners || !recommendedCategories ? (
                <HomePageLoader />
            ) : (
                <>
                    <div className="homepage">
                        {productBanners && productBanners.desktop[0] && (
                            <div className="homepage__banner">
                                <img src={productBanners.desktop[0].image} />
                            </div>
                        )}
                        {productBanners && productBanners.mobile[0] && (
                            <div className="homepage__banner homepage__banner--mobile">
                                <img src={productBanners.mobile[0].image} />
                            </div>
                        )}
                        <div className="page-container">
                            {recommendedCategories &&
                                recommendedCategories.length > 0 && (
                                    <div className="homepage__favourite-categories">
                                        <div className="homepage__favourite-categories__title">
                                            Our Favourite Categories
                                        </div>
                                        <div className="homepage__favourite-categories__container">
                                            {recommendedCategories
                                                .slice(0, 4)
                                                .map((categData) => {
                                                    return (
                                                        <CategoryCard
                                                            name={
                                                                categData.name
                                                            }
                                                            image={
                                                                categData.image ||
                                                                DefaultImg
                                                            }
                                                            key={categData.id}
                                                            url={`/category/${categData.id}`}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}

                            <div className="homepage__brief">
                                <div className="homepage__brief__content">
                                    <div className="homepage__brief__content__title">
                                        Knitted With Love
                                    </div>
                                    <div className="homepage__brief__content__desc">
                                        By all means, you could probably keep it
                                        in a big house for less than what Mike
                                        was spending. Owning a tiger is like
                                        using cocaine - it's God's way of saying
                                        you're making way too much money.
                                    </div>
                                </div>
                                <div className="homepage__brief__image">
                                    <img src={Brief1} />
                                </div>
                            </div>

                            <div className="homepage__brief">
                                <div className="homepage__brief__content">
                                    <div className="homepage__brief__content__title">
                                        Knitted With Love
                                    </div>
                                    <div className="homepage__brief__content__desc">
                                        By all means, you could probably keep it
                                        in a big house for less than what Mike
                                        was spending. Owning a tiger is like
                                        using cocaine - it's God's way of saying
                                        you're making way too much money.
                                    </div>
                                </div>
                                <div className="homepage__brief__image">
                                    <img src={Brief2} />
                                </div>
                            </div>
                        </div>

                        <div className="page-container">
                            <div className="homepage__images">
                                <div className="homepage__images__right descriptive-image">
                                    <img src={LeftImg} />
                                </div>
                                <div className="homepage__images__left">
                                    <div className="homepage__images__left__first descriptive-image">
                                        <img src={RightImg1} />
                                    </div>
                                    <div className="homepage__images__left__second descriptive-image">
                                        <img src={RightImg2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {productBanners && productBanners.desktop[1] && (
                            <div className="homepage__banner">
                                <img src={productBanners.desktop[1].image} />
                            </div>
                        )}
                        {productBanners && productBanners.mobile[1] && (
                            <div className="homepage__banner homepage__banner--mobile">
                                <img src={productBanners.mobile[1].image} />
                            </div>
                        )}
                        {recommendedProducts &&
                            recommendedProducts.length > 0 && (
                                <div className="page-container">
                                    <div className="homepage__our-products">
                                        <div className="homepage__our-products__title">
                                            {" "}
                                            Our Products
                                        </div>
                                        <div className="homepage__our-products__container">
                                            {recommendedProducts
                                                .splice(0, 4)
                                                .map((productData) => {
                                                    return (
                                                        <ProductCard
                                                            image={
                                                                (productData.variants &&
                                                                    productData
                                                                        .variants[0] &&
                                                                    productData
                                                                        .variants[0]
                                                                        .images[0]) ||
                                                                DefaultImg
                                                            }
                                                            name={
                                                                productData.name
                                                            }
                                                            productId={extractId(
                                                                productData.url
                                                            )}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}

export default Homepage;
