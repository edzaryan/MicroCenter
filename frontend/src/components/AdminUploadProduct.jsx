import {useState} from "react";
import uploadImage from "../utils/helpers/uploadImage";
import SummaryApi from "../common";
import {toast} from "react-toastify";
import {CgClose} from "react-icons/cg";
import productCategory from "../utils/helpers/productCategory";
import {FaCloudUploadAlt} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import DisplayImage from "./DisplayImage";


const AdminUploadProduct = ({ onClose, fetchData }) => {
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const { url } = await uploadImage(file);
        setData(prev => ({ ...prev, productImage: [...prev.productImage, url] }));
    }

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData(prev => ({ ...prev, productImage: newProductImage }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.uploadProduct.url, {
                method: SummaryApi.uploadProduct.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success(responseData?.message);
                fetchData();
                onClose();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            toast.error("Error uploading product. Please try again.");
        }
    }

    return (
        <div
            onClick={onClose}
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35 z-50">
            <div
                className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center pb-3">
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className="grid p-4 gap-4 overflow-y-auto h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={data.productName}
                        onChange={handleOnChange}
                        placeholder="Enter product name"
                        required
                        className="p-2 bg-slate-100 border rounded"
                    />

                    <label htmlFor="brandName">Brand Name</label>
                    <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={data.brandName}
                        onChange={handleOnChange}
                        placeholder="Enter brand name"
                        required
                        className="p-2 bg-slate-100 border rounded"
                    />

                    <label htmlFor="productCategory">Category</label>
                    <select
                        id="productCategory"
                        name="category"
                        value={data.category}
                        onChange={handleOnChange}
                        required
                        className="p-2 bg-slate-100 border rounded"
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el) => (
                            <option key={el.id} value={el.value}>
                                {el.label}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="productImage">Product Image</label>
                    <div className="flex items-center gap-2">
                        <label htmlFor="uploadImageInput" className="relative">
                            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                                <div className="text-slate-500 flex flex-col items-center gap-2">
                                    <span className="text-4xl">
                                        <FaCloudUploadAlt />
                                    </span>
                                    <p className="text-sm">Upload Product Image</p>
                                    <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>
                        {data.productImage.length > 0 ? (
                            data.productImage.map((el, index) => (
                                <div key={el} className="relative group">
                                    <img
                                        src={el}
                                        alt={el}
                                        width="80"
                                        height="80"
                                        className="bg-slate-100 border cursor-pointer"
                                        onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(el);
                                        }}
                                    />
                                    <div
                                        onClick={() => handleDeleteProductImage(index)}
                                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer group-hover:block"
                                    >
                                        <MdDelete />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-red-600 text-sm">*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleOnChange}
                        placeholder="Enter price"
                        required
                        className="p-2 bg-slate-100 border rounded"
                    />

                    <label htmlFor="sellingPrice">Selling Price</label>
                    <input
                        type="number"
                        id="sellingPrice"
                        name="sellingPrice"
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        placeholder="Enter selling price"
                        required
                        className="p-2 bg-slate-100 border rounded"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                        placeholder="Enter product description"
                        required
                        className="h-28 bg-slate-100 border rounded p-2 resize-none"
                        rows="3"
                    />

                    <button type="submit" className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                        Add Product
                    </button>
                </form>
            </div>

            {openFullScreenImage && <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />}
        </div>
    );
};

export default AdminUploadProduct;
