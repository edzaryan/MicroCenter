import {
    useState,
    CgClose,
    FaCloudUploadAlt,
    MdDelete,
    DisplayImage,
    toast,
    productCategory,
    uploadImage,
    SummaryApi
} from "../utils/imports"
import Button from "./Button";


const AdminEditProduct = ({ onClose, productData, fetchData }) => {
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [data, setData] = useState({
      ...productData,
      productName: productData?.productName,
      brandName: productData?.brandName,
      category: productData?.category,
      productImage: productData?.productImage || [],
      description: productData?.description,
      price: productData?.price,
      sellingPrice: productData?.sellingPrice
    });


    const handleOnChange = e => {
      const { name, value } = e.target;
      setData(prev => ({...prev, [name]: value}));
    }

    const handleUploadProduct = async e => {
      const file = e.target.files[0];
      const {url} = await uploadImage(file);
      setData(prev => ({...prev, productImage: [...prev.productImage, url]}));
    }

    const handleDeleteProductImage = async index => {
      const newProductImage = [...data.productImage];
      newProductImage.splice(index, 1);
      setData(prev => { return {...prev, productImage: [...newProductImage]}});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if(response.ok) {
        toast.success(responseData?.message);
        fetchData();
      } else {
        toast.error(responseData?.message);
      }

      onClose();
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
                    <h2 className="font-bold text-lg">Edit Product</h2>
                    <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className="grid p-4 gap-4 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        required
                        type="text"
                        id="productName"
                        placeholder="Enter product name"
                        name="productName"
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                    />
                    <label htmlFor="brandName" className="mt-3">Brand Name</label>
                    <input
                        required
                        type="text"
                        id="brandName"
                        placeholder="Enter brand name"
                        name="brandName"
                        value={data.brandName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                    />
                    <label htmlFor="productCategory" className="mt-3">Category</label>
                    <select
                        required
                        name="category"
                        onChange={handleOnChange}
                        id="productCategory"
                        value={data.category}
                        className="p-2 bg-slate-100 border rounded"
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el) => (
                            <option key={el.id} value={el.value}>{el.label}</option>
                        ))}
                    </select>
                    <label htmlFor="productImage" className="mt-3">Product Image</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                <span className="text-4xl"><FaCloudUploadAlt /></span>
                                <p className="text-sm">Upload Product Image</p>
                                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data?.productImage[0] ? (
                            <div className="flex items-center gap-2">
                                {data.productImage.map((el, index) => (
                                    <div className="relative group" key={el}>
                                        <img
                                            src={el}
                                            alt={el}
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }}
                                            width={80}
                                            height={80}
                                            className="bg-slate-100 border cursor-pointer"
                                        />
                                        <div
                                            onClick={() => handleDeleteProductImage(index)}
                                            className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-red-600 text-sm">*Please upload product image</p>
                        )}
                    </div>
                    <label htmlFor="price" className="mt-3">Price</label>
                    <input
                        required
                        type="number"
                        id="price"
                        placeholder="Enter price"
                        name="price"
                        value={data.price}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                    />
                    <label htmlFor="sellingPrice" className="mt-3">Selling Price</label>
                    <input
                        required
                        type="number"
                        id="sellingPrice"
                        placeholder="Enter selling price"
                        name="sellingPrice"
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                    />
                    <label htmlFor="description" className="mt-3">Description</label>
                    <textarea
                        required
                        placeholder="Enter product description"
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                        className="h-28 bg-slate-100 border resize-none p-2"
                        rows={3}
                    />
                    <Button block variant="danger" size="lg">Upload Product</Button>
                </form>
                {openFullScreenImage && <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />}
            </div>
        </div>
    );
};


export default AdminEditProduct;