import displayINRCurrency from "../utils/helpers/displayCurrency";
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import Context from "../context";
import cn from "classnames";

const CartPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const loadingCart = new Array(6).fill(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            const json = await res.json();
            if (res.ok) setData(json.data);
            else console.error("Fetch error:", json.message);

        } catch (err) {
            console.error("Network error:", err);
        }

        setLoading(false);
    };

    const updateQty = async (id, qty) => {
        setLoading(true);

        try {
            const res = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: id, quantity: qty })
            });

            const json = await res.json();
            json.success ? fetchData() : console.error("Update error:", json.message);

        } catch (err) {
            console.error("Update failed:", err);
        }

        setLoading(false);
    };

    const increaseQty = (id, qty) => updateQty(id, qty + 1);
    const decreaseQty = (id, qty) => qty > 1 && updateQty(id, qty - 1);

    const deleteCartProduct = async (id) => {
        setLoading(true);

        try {
            const res = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: id })
            });

            const json = await res.json();

            if (json.success) {
                fetchData();
                context.fetchUserAddToCart();
            } else {
                console.error("Delete error:", json.message);
            }

        } catch (err) {
            console.error("Delete failed:", err);
        }

        setLoading(false);
    };

    const totalQty = data.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = data.reduce(
        (sum, p) => sum + p.quantity * (p?.productId?.sellingPrice || 0),
        0
    );

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-2xl font-semibold py-2">Cart Items</h2>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between py-3">
                
                <div className="w-full grid gap-4 animate-fade-slide" style={{ animationDelay: "0ms" }}>
                    {loading ? (
                        loadingCart.map((_, idx) => (
                            <div key={idx} className="grid grid-cols-[150px_1fr] border border-slate-200 rounded-lg shadow-md animate-pulse">
                                <div className="bg-gray-200 h-[150px] rounded-l-lg" />
                                <div className="grid gap-2 p-4">
                                    <div className="h-6 bg-gray-200 rounded-full" />
                                    <div className="h-5 bg-gray-200 rounded-full" />
                                    <div className="h-6 bg-gray-200 rounded-full" />
                                    <div className="h-6 bg-gray-200 rounded-full" />
                                </div>
                            </div>
                        ))
                    ) : data.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-10 text-slate-600 bg-gray-50 rounded-lg shadow-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12m-9 0a1 1 0 11-2 0m10 0a1 1 0 11-2 0" />
                            </svg>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm text-slate-500">Start adding products to continue</p>
                        </div>
                    ) : (
                        data.map((product) => {
                            const p = product.productId || {};

                            return (
                                <div
                                    key={product._id}
                                    className="grid grid-cols-[150px_1fr] rounded-lg shadow-md animate-fade-slide"
                                    style={{ animationDelay: "0ms" }}
                                >
                                    <div className="w-[150px] h-[150px] bg-slate-200 p-4 rounded-l-lg flex items-center justify-center">
                                        <img
                                            src={p.productImage?.[0]}
                                            className="h-full w-full object-contain transition-transform duration-200 hover:scale-105"
                                            alt={p.productName}
                                        />
                                    </div>

                                    <div className="grid gap-1 p-4 relative rounded-r-lg border border-l-0 border-slate-200">
                                        <div
                                            className="absolute right-2 top-2 bg-gray-50 border rounded-full p-2 text-red-600 cursor-pointer shadow-md transition-all duration-200 hover:bg-red-600 hover:text-white"
                                            onClick={() => deleteCartProduct(product._id)}
                                        >
                                            <MdDelete />
                                        </div>

                                        <h2 className="text-lg font-medium text-ellipsis line-clamp-1">
                                            {p.productName}
                                        </h2>

                                        <p className="capitalize text-slate-500">{p.category || "No Category"}</p>

                                        <div className="flex items-center justify-between">
                                            <p className="text-red-600 font-medium">
                                                {displayINRCurrency(p.sellingPrice)}
                                            </p>
                                            <p className="text-slate-600 font-semibold">
                                                {displayINRCurrency((p.sellingPrice || 0) * product.quantity)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => decreaseQty(product._id, product.quantity)}
                                                className="w-7 h-7 flex justify-center items-center border border-red-600 text-red-600 rounded shadow transition-all duration-200 hover:bg-red-600 hover:text-white"
                                            >
                                                -
                                            </button>

                                            <span>{product.quantity}</span>

                                            <button
                                                onClick={() => increaseQty(product._id, product.quantity)}
                                                className="w-7 h-7 flex justify-center items-center border border-red-600 text-red-600 rounded shadow transition-all duration-200 hover:bg-red-600 hover:text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div
                    className="w-full lg:max-w-sm animate-fade-slide"
                    style={{ animationDelay: "0ms" }}
                >
                    <div className="bg-white rounded-lg shadow-lg">
                        <h2 className="bg-red-600 text-white py-3 px-3 rounded-t-lg uppercase font-bold text-lg">
                            Summary
                        </h2>

                        {loading ? (
                            <div className="grid gap-2 px-5 py-4 h-[96px] animate-pulse">
                                <div className="rounded-full bg-slate-200 h-[28px]" />
                                <div className="rounded-full bg-slate-200 h-[28px]" />
                            </div>
                        ) : (
                            <div className="grid gap-2 px-5 py-4">
                                <div className="flex items-center justify-between text-lg text-slate-600">
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className="flex items-center justify-between text-lg text-slate-600">
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className={cn(
                                "p-3 w-full rounded-b-lg cursor-pointer transition-all duration-200",
                                {
                                    "bg-gray-300 cursor-not-allowed": loading,
                                    "bg-blue-600 hover:bg-blue-700 text-white": !loading
                                }
                            )}
                        >
                            Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
