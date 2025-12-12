import { useContext, useEffect, useState } from "react";
import Context from "../context";
import SummaryApi from "../common";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../utils/helpers/displayCurrency";

const CartPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const loadingCart = new Array(13).fill(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseData = await response.json();

            if (response.ok) {
                setData(responseData.data);
            } else {
                console.error("Error fetching data:", responseData.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateQty = async (id, qty) => {
        setLoading(true);

        try {
            const response = await fetch(`${SummaryApi.updateCartProduct.url}`, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty
                })
            });

            const responseData = await response.json();
            responseData.success
                ? fetchData()
                : console.error("Error updating quantity:", responseData.message);

        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setLoading(false);
        }
    }

    const increaseQty = (id, qty) => {
        updateQty(id, qty + 1);
    }

    const decreaseQty = (id, qty) => {
        if (qty > 1) {
            updateQty(id, qty - 1);
        }
    }

    const deleteCartProduct = async (id) => {
        setLoading(true);

        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: id })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            } else {
                console.error("Error deleting product:", responseData.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
        }
    }

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * (curr?.productId?.sellingPrice || 0)), 0);

    return (
        <div className="container mx-auto">
            <div className="text-center text-lg my-3">
                {data.length === 0 && !loading && (
                    <p className="bg-white py-5">No Data</p>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                <div className="w-full max-w-3xl">
                    {loading ? (
                        loadingCart.map((el, index) => (
                            <div key={index} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 rounded" />
                        ))
                    ) : (
                        data.map((product) => {
                            const productDetails = product?.productId || {};
                            return (
                                <div key={product._id} className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                                    <div className="w-32 h-32 bg-slate-200">
                                        <img src={productDetails.productImage?.[0]} className="w-full h-full object-scale-down mix-blend-multiply" alt="Product" />
                                    </div>
                                    <div className="px-4 py-2 relative">
                                        <div
                                            className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                                            onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{productDetails.productName}</h2>
                                        <p className="capitalize text-slate-500">{productDetails.category || "No Category"}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-red-600 font-medium text-lg">{displayINRCurrency(productDetails.sellingPrice)}</p>
                                            <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency((productDetails.sellingPrice || 0) * product.quantity)}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <button
                                                className="border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded"
                                                onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                                -
                                            </button>
                                            <span>{product?.quantity}</span>
                                            <button
                                                className="border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded"
                                                onClick={() => increaseQty(product?._id, product?.quantity)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="mt-5 lg:mt-0 w-full max-w-sm">
                    {loading ? (
                        <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
                        </div>
                    ) : (
                        <div className="h-36 bg-white">
                            <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className="bg-blue-600 p-2 text-white w-full mt-2">Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
