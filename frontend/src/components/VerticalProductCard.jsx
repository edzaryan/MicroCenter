import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context";
import addToCart from "../utils/helpers/addToCart";
import fetchCategoryWiseProduct from "../utils/helpers/fetchCategoryWiseProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import displayINRCurrency from "../utils/helpers/displayCurrency";
import Button from "./Button";

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft += 300;
        }
    }

    const scrollLeft = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft -= 300;
        }
    }

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-2">{heading}</h2>
            <div
                ref={scrollElement}
                className="flex items-center gap-6 overflow-hidden scrollbar-none py-3"
            >
                {
                    !loading && (
                        <>
                            <button
                                onClick={scrollLeft}
                                className="bg-white shadow-sm rounded-full p-2 absolute -left-2 text-lg
                                             block z-20 hover:bg-gray-50 transition duration-200 cursor-pointer"
                            >
                                <FaAngleLeft size={26} />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="bg-white shadow-sm rounded-full p-2 absolute -right-2 text-lg
                                             block z-20 hover:bg-gray-50 transition duration-200 cursor-pointer"
                            >
                                <FaAngleRight size={26} />
                            </button>
                        </>
                    )
                }
                {
                    loading ? (
                        loadingList.map((product, index) => (
                            <div
                                key={index}
                                className="rounded-lg shadow-lg shadow-gray-100">
                                <div className="w-[320px] h-48 bg-slate-200 animate-pulse rounded-t-lg" />
                                <div className="grid gap-3 p-4 rounded-b-lg">
                                    <p className="h-[28px] animate-pulse rounded-full bg-slate-200" />
                                    <p className="h-[24px] animate-pulse rounded-full bg-slate-200" />
                                    <div className="flex gap-3">
                                        <p className="h-[24px] animate-pulse rounded-full bg-slate-200 w-full" />
                                        <p className="h-[24px] animate-pulse rounded-full bg-slate-200 w-full" />
                                    </div>
                                    <div className="h-[28px] rounded-full bg-slate-200 animate-pulse" />
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map(product => (
                            <Link
                                to={`product/${product?._id}`}
                                key={product?._id}
                                className="rounded-lg shadow-md shadow-gray-100"
                            >
                                <div className="bg-slate-200 p-4 w-[320px] h-48 flex
                                                justify-center items-center rounded-t-lg">
                                    <img
                                        src={product.productImage[0]}
                                        alt={product?.productName || `Product image ${product?._id}`}
                                        className="object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply"
                                    />
                                </div>
                                <div className="p-4 grid gap-3 border border-t-0 rounded-b-lg border-gray-100">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                                        {product?.productName}
                                    </h2>
                                    <p className="capitalize text-slate-500">
                                        {product?.category}
                                    </p>
                                    <div className="flex gap-3">
                                        <p className="text-red-600 font-medium">
                                            {displayINRCurrency(product?.sellingPrice)}
                                        </p>
                                        <p className="text-slate-500 line-through">
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <Button
                                        danger
                                        shape="rounded"
                                        variant="danger"
                                        size="sm"
                                        onClick={e => handleAddToCart(e, product?._id)}
                                    >
                                        Add To Cart
                                    </Button>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default VerticalCardProduct;
