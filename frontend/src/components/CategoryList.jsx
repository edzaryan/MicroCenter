import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setCategoryProduct(dataResponse.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="container mx-auto p-4 overflow-x-hidden">
            <div className="flex justify-between gap-3">
                {loading ? (
                    [...Array(12)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200" />
                        </div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link
                            key={product?.category}   // valid unique key
                            to={`/product-category?category=${product?.category}`}
                            className="cursor-pointer"
                        >
                            <div className="w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                <img
                                    src={product?.productImage?.[0]}
                                    className="h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all"
                                    alt={product?.category}
                                />
                            </div>
                            <p className="text-center text-sm md:text-[15px] capitalize mt-1">
                                {product?.category}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
