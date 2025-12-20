import fetchCategoryWiseProduct from "../utils/helpers/fetchCategoryWiseProduct";
import { useState, useEffect, useContext, useCallback } from "react";
import displayINRCurrency from "../utils/helpers/displayCurrency";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import addToCart from "../utils/helpers/addToCart";
import VerticalCard from "../components/VerticalCard";
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
    const [recommendedProducts, setRecommendedProducts] = useState(null);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);

    const productImageListLoading = new Array(5).fill(null);

    const fetchProductDetails = useCallback(async () => {
        try {
            const response = await fetch(SummaryApi.productDetails.url, {
                method: SummaryApi.productDetails.method,
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ productId: params?.id })
            });

            const dataResponse = await response.json();
            setData(dataResponse?.data);
            setActiveImage(dataResponse?.data?.productImage[0]);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    const getCategoryWiseProduct = useCallback(async () => {
        const categoryProduct = await fetchCategoryWiseProduct(data?.category);
        setRecommendedProducts(categoryProduct?.data);
    }, [data?.category]);

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);

        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setZoomImageCoordinate({ x, y });
    }, []);

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
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="grid grid-flow-col gap-2">
                     <div className="h-full">
                        {loading ? (
                            <div className="flex lg:flex-col gap-2 overflow-scroll scrollbar-none h-full">
                                {productImageListLoading.map((_, index) => (
                                    <div key={index} className="w-23 h-23 bg-slate-200 rounded animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="flex lg:flex-col gap-2 h-full overflow-hidden">
                                {data?.productImage?.map((url, index) => (
                                    <div
                                        key={index}
                                        className={classnames(
                                            "w-24 h-24 rounded-[8px] cursor-pointer transition border-3",
                                            {
                                                "border-red-500 bg-white": activeImage === url,
                                                "border-transparent bg-slate-200": activeImage !== url,
                                            }
                                        )}
                                    >
                                        <img
                                            className="w-full h-full object-scale-down mix-blend-multiply rounded-[5px]"
                                            onClick={() => setActiveImage(url)}
                                            alt={`Product ${index + 1}`}
                                            src={url}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-[450px] h-[450px] bg-slate-200 relative rounded">
                        <img
                            src={activeImage}
                            onMouseLeave={() => setZoomImage(false)}
                            onMouseMove={handleZoomImage}
                            className="w-full h-full object-scale-down mix-blend-multiply rounded"
                            alt={activeImage ? data?.productName : ""}
                        />

                        {zoomImage && (
                            <div className="absolute z-1000 w-[940px] h-[660px] hidden lg:block bg-white 
                                            -right-[950px] top-0 overflow-hidden shadow-md rounded">
                                <div
                                    className="w-full h-full bg-no-repeat"
                                    style={{
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                                        backgroundImage: `url(${activeImage})`,
                                        backgroundSize: "200%", 
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-1 w-full">
                        <p className="bg-slate-200 animate-pulse h-6 w-full rounded-full"></p>
                        <h2 className="bg-slate-200 animate-pulse h-8 w-full rounded-full">
                            <span className="sr-only">Loading title…</span>
                        </h2>
                        <p className="bg-slate-200 animate-pulse h-6 w-1/2 rounded-full"></p>
                        <div className="bg-slate-200 animate-pulse h-6 w-1/3 rounded-full"></div>
                        <div className="flex gap-3 my-2">
                            <button className="bg-slate-200 animate-pulse h-8 w-full rounded"></button>
                            <button className="bg-slate-200 animate-pulse h-8 w-full rounded"></button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
                            {data?.brandName}
                        </p>

                        <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
                        <p className="capitalize text-slate-400">{data?.category}</p>

                        <div className="text-red-600 flex gap-1">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                        </div>

                        <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                            <p className="text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
                            <p className="line-through text-slate-400">{displayINRCurrency(data.price)}</p>
                        </div>

                        <div className="flex items-center gap-3 my-2">
                            <button
                                onClick={(e) => handleBuyProduct(e, data?._id)}
                                className="border-2 border-red-600 px-3 py-1 text-red-600 rounded hover:bg-red-600 hover:text-white"
                            >
                                Buy
                            </button>

                            <button
                                onClick={(e) => handleAddToCart(e, data?._id)}
                                className="border-2 border-red-600 px-3 py-1 bg-red-600 text-white rounded hover:bg-white hover:text-red-600"
                            >
                                Add To Cart
                            </button>
                        </div>

                        <div>
                            <p className="text-slate-600 font-medium my-1">Description :</p>
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
}

export default ProductDetailsPage;
