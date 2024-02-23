import React, { useEffect, useState } from "react";
import PRoductImg from "../../assets/images/products/9.webp";
import PRoductImg1 from "../../assets/images/products/8.webp";
import SkeletonSearchLoader from "../resuables/Loader/SketelonSearchLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { searchProduct } from "../../api/private/products";
import { extractId } from "../../helpers/utils";
import { ReactComponent as DownArrow } from "../../assets/svgs/down-arrow.svg";
import DefaultImage from "../../assets/images/products/default.jpg";
const ItemsNotFound = () => {
    return (
        <div className="extensionBox__container__items__not-found">
            {" "}
            <div className="extensionBox__container__items__not-found__header">
                No items found.
            </div>
            <div className="extensionBox__container__items__not-found__sub-header">
                {" "}
                There are no results matching your search.{" "}
            </div>
            <div className="extensionBox__container__items__not-found__desc">
                Please try again writing it in a different way or using a
                different combination of filters
            </div>
        </div>
    );
};

const SearchDescription = () => {
    return (
        <div className="extensionBox__container__items__not-found">
            {" "}
            <div className="extensionBox__container__items__not-found__header">
                Search products
            </div>
            <div
                className="extensionBox__container__items__not-found__desc"
                style={{ marginTop: "1rem" }}
            >
                You can find best products , hand made and other things here.
            </div>
        </div>
    );
};

const LoadingComponent = () => {
    return (
        <>
            <SkeletonSearchLoader />
            <SkeletonSearchLoader />
            <SkeletonSearchLoader />
            <SkeletonSearchLoader />
            <SkeletonSearchLoader />
        </>
    );
};

const UserNotLoggedIn = () => {
    const naviagte = useNavigate();
    return (
        <div className="extensionBox__container__items__not-found">
            {" "}
            <div className="extensionBox__container__items__not-found__header">
                User not Logged in
            </div>
            {/* <div className="extensionBox__container__items__not-found__sub-header">
                {" "}
                Unlock the search feature.{" "}
            </div> */}
            <div
                style={{ margin: "1rem 0" }}
                className="extensionBox__container__items__not-found__desc"
            >
                We are trying to do something good.So, to protect we do this ,
                okey. Sign In and try again
            </div>
            <div>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => naviagte("/login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

function SearchBox({ mobile, searchOpen, searchText }) {
    const available = true;
    const userState = useSelector((state) => state.User);
    const [products, setProducts] = useState([]);
    const [productLoadding, setProductLoading] = useState(true);

    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        count: 0,
        hasNext: false,
    });

    const [paginationLoading, setPaginationLoading] = useState(false);

    const navigate = useNavigate();

    const _searchProduct = async (signal, _products, _currentPage) => {
        let query = `?search=${searchText}&page=${_currentPage}`;
        setPaginationLoading(true);
        await searchProduct(null, query, signal)
            .then((res) => {
                if (res.response.ok) {
                    setProducts([..._products, ...res.json.results]);
                    let _count = res.json.count;
                    if (res.json.next) {
                        //has more page

                        let searchQuery =
                            new URLSearchParams(res.json.next.split("?")[1]) ||
                            "";

                        let nextPage = searchQuery.get("page");

                        console.log("nextPage", nextPage);

                        setPaginationData({
                            currentPage: _currentPage,
                            count: _count,
                            hasNext: true,
                        });
                    } else {
                        //doesnt have pagination
                        // setProducts([]);
                        setPaginationData({
                            currentPage: _currentPage,
                            count: _count,
                            hasNext: false,
                        });
                    }
                } else {
                }
            })
            .catch((err) => {});
        setPaginationLoading(false);
    };

    useEffect(() => {
        const _localSearch = async () => {
            let controller = new AbortController();
            setProductLoading(true);
            await _searchProduct(controller.signal, [], 1);
            setProductLoading(false);
            return () => controller.abort();
        };

        if (searchText.length > 0 && userState.isLoggedIn) {
            _localSearch();
        } else {
        }
    }, [searchText]);

    const loadMore = async () => {
        let controller = new AbortController();

        await _searchProduct(
            controller.signal,
            products,
            paginationData.currentPage + 1
        );

        return () => controller.abort();
    };

    return (
        <div
            className={`extensionBox ${searchOpen ? "extensionBox--open" : ""}`}
        >
            <div className="extensionBox__container">
                {!mobile && (
                    <div className="extensionBox__container__label">
                        Products ({paginationData.count})
                    </div>
                )}
                <div className="extensionBox__container__items">
                    {userState.isLoggedIn ? (
                        searchText.length > 0 ? (
                            productLoadding ? (
                                <>
                                    <LoadingComponent />
                                </>
                            ) : products.length > 0 ? (
                                <>
                                    {products.map((item) => {
                                        return (
                                            <div
                                                className="extensionBox__container__items__item"
                                                onClick={() =>
                                                    navigate(
                                                        `/products/${extractId(
                                                            item.url
                                                        )}`
                                                    )
                                                }
                                            >
                                                <div className="extensionBox__container__items__item__img">
                                                    <img
                                                        src={
                                                            (item.variants &&
                                                                item
                                                                    .variants[0] &&
                                                                item.variants[0]
                                                                    .images[0]) ||
                                                            DefaultImage
                                                        }
                                                    />
                                                </div>
                                                <div className="extensionBox__container__items__item__desc">
                                                    <div className="extensionBox__container__items__item__desc__name">
                                                        {item.name}
                                                    </div>
                                                    <div className="extensionBox__container__items__item__desc__categ">
                                                        {
                                                            item.categories[0]
                                                                .name
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {}

                                    {paginationData.hasNext &&
                                        !paginationLoading && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "0.25rem",
                                                    padding: "0.5rem 0 1rem 0",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => loadMore()}
                                            >
                                                <div>Load more</div>
                                                <div
                                                    style={{
                                                        height: "18px",
                                                        width: "18px",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <DownArrow />
                                                </div>
                                            </div>
                                        )}
                                    {paginationLoading && <LoadingComponent />}
                                </>
                            ) : (
                                <ItemsNotFound />
                            )
                        ) : (
                            <>
                                <SearchDescription />
                            </>
                        )
                    ) : (
                        <UserNotLoggedIn />
                    )}
                </div>
                {!mobile && (
                    <div className="extensionBox__container__label">
                        Search for "{searchText}"
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBox;
