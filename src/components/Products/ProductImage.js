import React, { useEffect, useState } from "react";
import { useSwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

function ProductImage({
    currentIndex,
    setCurrentIndex,
    setSelectedImage,
    selectedImage,
    productImages,
}) {
    const [initialStyle, setInitialState] = useState({
        backgroundImage: `url(${productImages[currentIndex].image})`,
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    });

    const swiperSlide = useSwiperSlide();
    const [styleState, setStyleState] = useState(initialStyle);
    useEffect(() => {
        setStyleState({
            backgroundImage: `url(${productImages[currentIndex]})`,
            backgroundPosition: "0% 0%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        });
    }, [currentIndex, selectedImage]);

    const zoomIn = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setStyleState({
            backgroundImage: `url(${productImages[currentIndex]})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundRepeat: "no-repeat",
        });
    };

    const zoomout = (e) => {
        setStyleState({
            ...initialStyle,
            backgroundImage: `url(${productImages[currentIndex]})`,
        });
    };

    return (
        <Swiper
            navigation={true}
            // pagination={pagination}
            modules={[Navigation, Pagination]}
            loop={true}
            initialSlide={0}
            // onNavigationNext={(swiperCore) => {
            //     console.log("next");
            //     const { activeIndex, snapIndex, previousIndex, realIndex } =
            //         swiperCore;
            //     console.log(
            //         "Currentindex :",
            //         currentIndex,
            //         " previndex:",
            //         previousIndex,
            //         " activeIndex: ",
            //         activeIndex,
            //         " realIndex : ",
            //         realIndex
            //     );
            //     if (currentIndex + 1 == previousIndex) {
            //         console.log("slide normally... next..");
            //         swiperCore.slideNext();
            //         setCurrentIndex(realIndex);
            //     } else {
            //         let moveto =
            //             currentIndex + 1 >= productImages.length
            //                 ? 0
            //                 : currentIndex + 1;
            //         console.log("else , move to ", moveto);
            //         swiperCore.slideTo(moveto);
            //         setCurrentIndex(moveto);
            //     }

            //     // console.log(swiperCore.realIndex, swiperCore.activeIndex);

            //     // console.log(first);x
            // }}
            // onNavigationPrev={(swiperCore) => {
            //     const { activeIndex, snapIndex, previousIndex, realIndex } =
            //         swiperCore;

            //     if (currentIndex == previousIndex - 1) {
            //         swiperCore.slidePrev();
            //         setCurrentIndex(realIndex);
            //     } else {
            //         let moveto =
            //             currentIndex - 1 < 0
            //                 ? productImages.length - 1
            //                 : currentIndex - 1;
            //         swiperCore.slideTo(moveto);
            //         setCurrentIndex(moveto);
            //     }
            // }}
            onSlideChange={(swiperCore) => {
                const { realIndex } = swiperCore;

                setCurrentIndex(realIndex);
            }}
            className="product-page__right__main__swiper"
        >
            {productImages &&
                productImages.map((data) => {
                    return (
                        <SwiperSlide>
                            <div
                                className="product-image"
                                onMouseMove={(e) => zoomIn(e)}
                                onMouseOut={(e) => zoomout(e)}
                                style={styleState}
                            ></div>
                        </SwiperSlide>
                    );
                })}
        </Swiper>
    );
}

export default ProductImage;
