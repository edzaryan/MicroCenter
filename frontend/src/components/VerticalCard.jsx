import { Link } from "react-router-dom";
import scrollTop from "../utils/helpers/scrollTop";
import displayINRCurrency from "../utils/helpers/displayCurrency";

const VerticalCard = ({ loading, data = [], heading, handleAddToCart }) => {
    const loadingList = new Array(13).fill(null);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="w-full bg-white rounded-sm shadow">
                            <div className="bg-slate-200 h-48 p-4 animate-pulse"></div>
                            <div className="p-4 grid gap-3">
                                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                                <div className="flex gap-3">
                                    <div className="h-4 bg-slate-200 w-full rounded animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 w-full rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product, index) => (
                        <Link
                            to={`/product/${product?._id}`}
                            className="w-full bg-white rounded-sm shadow"
                            onClick={scrollTop}
                            key={index}
                        >
                            <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                                <img
                                    src={product?.productImage[0]}
                                    className="h-full object-scale-down hover:scale-105 transition-all mix-blend-multiply"
                                />
                            </div>

                            <div className="p-4 grid gap-3">
                                <h2 className="font-medium text-lg text-black line-clamp-1">
                                    {product?.productName}
                                </h2>

                                <p className="capitalize text-slate-500">{product?.category}</p>

                                <div className="flex gap-3">
                                    <p className="text-red-600 font-medium">
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className="line-through text-slate-500">
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>

                                <button
                                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VerticalCard;
