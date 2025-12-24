import fetchCategoryWiseProduct from "../utils/helpers/fetchCategoryWiseProduct";
import { FaStar, FaStarHalf, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import displayINRCurrency from "../utils/helpers/displayCurrency";
import { useNavigate, useParams } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";
import addToCart from "../utils/helpers/addToCart";
import classnames from "classnames";
import SummaryApi from "../common";
import Context from "../context";

const ProductDetailsPage = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const params = useParams();
    const navigate = useNavigate();
    const { fetchUserAddToCart } = useContext(Context);

    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [recommendedProducts, setRecommendedProducts] = useState(null);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);
    const [lensStyle, setLensStyle] = useState({ left: 0, top: 0, display: "none" });

    const imageContainerRef = useRef(null);

    const productImageListLoading = new Array(5).fill(null);

    const fetchProductDetails = useCallback(async () => {
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ productId: params?.id })
        });
        const dataResponse = await response.json();
        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0]);
        setActiveIndex(0);
        setLoading(false);
    }, [params.id]);

    const getCategoryWiseProduct = useCallback(async () => {
        const categoryProduct = await fetchCategoryWiseProduct(data?.category);
        setRecommendedProducts(categoryProduct?.data);
    }, [data?.category]);

    const handleZoomImage = useCallback((e) => {
        if (window.innerWidth < 1024) return;

        const container = imageContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const lensWidth = 250;
        const lensHeight = 180;

        let x = e.clientX - rect.left - lensWidth / 2;
        let y = e.clientY - rect.top - lensHeight / 2;

        x = Math.max(0, Math.min(x, rect.width - lensWidth));
        y = Math.max(0, Math.min(y, rect.height - lensHeight));

        setZoomImage(true);

        setLensStyle({
            left: x,
            top: y,
            display: "block"
        });

        setZoomImageCoordinate({
            x: (x + lensWidth / 2) / rect.width,
            y: (y + lensHeight / 2) / rect.height
        });
    }, []);

    const handlePrevImage = () => {
        const total = data.productImage.length;
        const newIndex = (activeIndex - 1 + total) % total;
        setActiveIndex(newIndex);
        setActiveImage(data.productImage[newIndex]);
    };

    const handleNextImage = () => {
        const total = data.productImage.length;
        const newIndex = (activeIndex + 1) % total;
        setActiveIndex(newIndex);
        setActiveImage(data.productImage[newIndex]);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
        navigate("/cart");
    };

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails]);

    useEffect(() => {
        if (data?.category) getCategoryWiseProduct();
    }, [data.category, getCategoryWiseProduct]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2">
                    <div className="order-2 md:order-1">
                        {loading ? (
                            <div className="flex flex-row md:flex-col gap-2">
                                {productImageListLoading.map((_, index) => (
                                    <div key={index} className="aspect-square w-16 sm:w-20 md:w-24 bg-slate-200 rounded animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-row md:flex-col gap-2">
                                {data?.productImage?.map((url, index) => (
                                    <div
                                        key={index}
                                        className={classnames(
                                            "aspect-square w-24 rounded-md cursor-pointer transition border-2",
                                            activeIndex === index
                                                ? "border-red-500 bg-white"
                                                : "border-transparent bg-slate-200"
                                        )}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            setActiveImage(url);
                                        }}
                                    >
                                        <img
                                            src={url}
                                            className="w-full h-full object-scale-down mix-blend-multiply rounded"
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative order-1 md:order-2 w-full aspect-square md:max-w-[450px] bg-slate-200 rounded">
                        <div
                            ref={imageContainerRef}
                            className="relative w-full h-full overflow-hidden"
                        >
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full p-3 
                                        text-[28px] hover:bg-gray-100 transition flex items-center justify-center cursor-pointer"
                            >
                                <FaAngleLeft />
                            </button>

                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full p-3 
                                        text-[28px] hover:bg-gray-100 transition flex items-center justify-center cursor-pointer"
                            >
                                <FaAngleRight />
                            </button>

                            <div
                                className="absolute border rounded border-gray-400 bg-gray-300"
                                style={{
                                    width: "250px",
                                    height: "180px",
                                    left: lensStyle.left,
                                    top: lensStyle.top,
                                    display: lensStyle.display
                                }}
                            />

                            <img
                                src={activeImage}
                                onMouseLeave={() => {
                                    setZoomImage(false);
                                    setLensStyle((prev) => ({ ...prev, display: "none" }));
                                }}
                                onMouseMove={handleZoomImage}
                                className="w-full h-full object-scale-down mix-blend-multiply rounded"
                                alt=""
                            />
                        </div>

                        {zoomImage && (
                            <div className="absolute hidden lg:block w-[940px] h-[660px] bg-white -right-[950px] 
                                        top-0 overflow-hidden shadow-md rounded z-50">
                                <div
                                    className="w-full h-full bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${activeImage})`,
                                        backgroundSize: "200%",
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-2 w-full">
                        <div className="h-6 bg-slate-200 rounded animate-pulse" />
                        <div className="h-8 bg-slate-200 rounded animate-pulse" />
                        <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2" />
                        <div className="h-6 bg-slate-200 rounded animate-pulse w-1/3" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
                            {data?.brandName}
                        </p>

                        <h2 className="text-2xl lg:text-4xl font-medium">
                            {data?.productName}
                        </h2>

                        <p className="capitalize text-slate-400">{data?.category}</p>

                        <div className="flex gap-1 text-red-600">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                        </div>

                        <div className="flex items-center gap-3 text-2xl lg:text-3xl">
                            <p className="text-red-600">
                                {displayINRCurrency(data.sellingPrice)}
                            </p>
                            <p className="line-through text-slate-400">
                                {displayINRCurrency(data.price)}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={(e) => handleBuyProduct(e, data?._id)}
                                className="border-2 border-red-600 px-4 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                            >
                                Buy
                            </button>

                            <button
                                onClick={(e) => handleAddToCart(e, data?._id)}
                                className="border-2 border-red-600 px-4 py-1 rounded bg-red-600 text-white hover:bg-white hover:text-red-600"
                            >
                                Add To Cart
                            </button>
                        </div>

                        <div>
                            <p className="font-medium text-slate-600">Description :</p>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                )}
            </div>

            {recommendedProducts && (
                <VerticalCard
                    heading="Recommended Products"
                    data={recommendedProducts}
                    loading={loading}
                    handleAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default ProductDetailsPage;
