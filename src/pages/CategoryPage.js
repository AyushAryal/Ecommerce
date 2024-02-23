import React, { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";

import Image2 from "../assets/images/products/chappal2.webp";
import Image3 from "../assets/images/products/chappal3.webp";
import Image4 from "../assets/images/products/chappal4.webp";
import Image5 from "../assets/images/products/chappal5.webp";
import Footer from "../components/Layouts/Footer";
import { useNavigate, useParams } from "react-router";
import {
    fetchCategoryDetails,
    fetchProductsByCategory,
} from "../api/private/products";
import SkeletonLoader from "../components/resuables/Loader/SkeletonLoader";
import SkeletonProductLoader from "../components/resuables/Loader/SkeletonProductLoader";
import { extractId } from "../helpers/utils";
import DefaultImage from "../assets/images/products/default.jpg";
function CategoryPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState({});
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const _getCategoryDetails = async (signal) => {
        setLoading(true);
        await fetchCategoryDetails({ id }, "", signal)
            .then(async (res) => {
                if (res.response.ok) {
                    if (res.json.id) {
                        setCategoryData(res.json);
                        let query = `?categories=${id}`;
                        await fetchProductsByCategory(null, query, signal)
                            .then((res) => {
                                if (res.response.ok) {
                                    setItems(res.json.results);
                                } else {
                                }
                            })
                            .catch((err) => {});
                    }
                } else {
                    if (res.response.status == 404) {
                        navigate("/error404");
                    }
                }
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const controller = new AbortController();
        _getCategoryDetails(controller.signal);
        return () => controller.abort();
    }, [id]);

    return (
        <>
            <div className="page category-page">
                {loading || !categoryData.id ? (
                    <SkeletonLoader type="title" />
                ) : (
                    <div className="page-header">
                        {categoryData && categoryData.name}
                    </div>
                )}

                <div className="wishlist-page__container products-container">
                    {loading || !categoryData.id ? (
                        <>
                            {[1, 2, 3, 4, 5, 6, 7].map((data) => {
                                return <SkeletonProductLoader key={data} />;
                            })}
                        </>
                    ) : (
                        <>
                            {categoryData &&
                                items.map((data) => {
                                    return (
                                        <ProductCard
                                            image={
                                                (data.variants[0] &&
                                                    data.variants[0]
                                                        .images[0]) ||
                                                DefaultImage
                                            }
                                            name={data.name}
                                            productId={extractId(data.url)}
                                            key={data.url}
                                        />
                                    );
                                })}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CategoryPage;
