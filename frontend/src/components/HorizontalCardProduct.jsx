import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context";
import addToCart from "../utils/helpers/addToCart";
import fetchCategoryWiseProduct from "../utils/helpers/fetchCategoryWiseProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./Button";
import displayINRCurrency from "../utils/helpers/displayCurrency";

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const {fetchUserAddToCart} = useContext(Context);

    useEffect(() => {
        fetchData();
    }, [category]);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    }

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
                className="grid grid-flow-col items-center gap-6 overflow-hidden scrollbar-none py-3 "
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
                        loadingList.map((product, index)=> (
                            <div
                                key={index}
                                className="rounded-lg shadow-md w-[320px] grid grid-cols-[150px_1fr]"
                            >
                                <div className="bg-slate-200 animate-pulse rounded-l-lg h-[150px]" />
                                <div className="grid gap-1 w-full rounded-r-lg p-4">
                                    <p className="bg-slate-200 animate-pulse h-[28px] rounded-full" />
                                    <p className="capitalize text-slate-500 h-[24px] bg-slate-200 animate-pulse rounded-full" />
                                    <div className="flex gap-3 w-full h-[24]">
                                        <p className="p-2 bg-slate-200 w-full animate-pulse rounded-full" />
                                        <p className="p-2 bg-slate-200 w-full animate-pulse rounded-full" />
                                    </div>
                                    <div className="text-sm text-white h-[28px] rounded-full w-full bg-slate-200 animate-pulse" />
                                </div>
                            </div>
                        ))) : (
                        data.map(product => (
                            <Link
                                to={`product/${product?._id}`}
                                key={product?._id}
                                className="rounded-lg shadow-md w-[320px] grid grid-cols-[150px_1fr]"
                            >
                                <div className="grid justify-center items-center bg-slate-200 p-4 rounded-l-lg">
                                    <img
                                        src={product.productImage[0]}
                                        alt={product?.productName || `Product image ${product?._id}`}
                                        className="h-full hover:scale-105 transition-all"
                                    />
                                </div>
                                <div className="grid gap-1 w-full border border-l-0 p-4 border-gray-100 rounded-r-lg">
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
                                        shape="rounded"
                                        variant="danger"
                                        size="sm"
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                        danger>
                                        Add to Cart
                                    </Button>
                                </div>
                            </Link>
                        )))
                }
            </div>
        </div>
    )
}

export default HorizontalCardProduct;