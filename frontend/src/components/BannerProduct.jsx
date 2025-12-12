import {useCallback, useEffect, useState} from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";
import mobileImage1 from "../assets/banner/img1_mobile.jpg";
import mobileImage2 from "../assets/banner/img2_mobile.webp";
import mobileImage3 from "../assets/banner/img3_mobile.jpg";
import mobileImage4 from "../assets/banner/img4_mobile.jpg";
import mobileImage5 from "../assets/banner/img5_mobile.png";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        { src: image1, alt: "Product banner 1" },
        { src: image2, alt: "Product banner 2" },
        { src: image3, alt: "Product banner 3" },
        { src: image4, alt: "Product banner 4" },
        { src: image5, alt: "Product banner 5" },
    ];

    const mobileImages = [
        { src: mobileImage1, alt: "Product banner 1 mobile" },
        { src: mobileImage2, alt: "Product banner 2 mobile" },
        { src: mobileImage3, alt: "Product banner 3 mobile" },
        { src: mobileImage4, alt: "Product banner 4 mobile" },
        { src: mobileImage5, alt: "Product banner 5 mobile" },
    ];

    const nextImage = useCallback(() => {
        setCurrentImage(prev =>
            prev === desktopImages.length - 1 ? 0 : prev + 1
        );
    }, [desktopImages.length]);

    const prevImage = () => {
        setCurrentImage(prev =>
            prev === 0 ? desktopImages.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => nextImage(), 5000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className="container mx-auto px-4 rounded relative">
            <button
                onClick={prevImage}
                className="
                    absolute -left-3
                    top-1/2 -translate-y-1/2
                    z-[50] 
                    bg-white shadow-lg rounded-full p-3
                    text-[28px] hover:bg-gray-100 transition duration-200
                    hidden md:flex items-center justify-center
                "
            >
                <FaAngleLeft />
            </button>
            <button
                onClick={nextImage}
                className="
                    absolute -right-3
                    top-1/2 -translate-y-1/2
                    z-[50]
                    bg-white shadow-lg rounded-full p-3
                    text-[28px] hover:bg-gray-100 transition duration-200
                    hidden md:flex items-center justify-center
                "
            >
                <FaAngleRight />
            </button>
            <div className="relative w-full h-56 md:h-72 overflow-hidden rounded">
                <div className="hidden md:flex w-full h-full">
                    {desktopImages.map((img, index) => (
                        <div
                            key={index}
                            className="w-full h-full min-w-full transition-all duration-700"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex md:hidden w-full h-full">
                    {mobileImages.map((img, index) => (
                        <div
                            key={index}
                            className="w-full h-full min-w-full transition-all duration-700"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
