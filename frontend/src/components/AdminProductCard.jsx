import { useState } from "react";
import displayINRCurrency from "../utils/helpers/displayCurrency";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({data, fetchData}) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className="bg-white p-4 rounded shadow-md relative group w-48 overflow-hidden">
            <div className="w-32 h-32 mx-auto flex justify-center items-center">
                <img src={data.productImage[0]} className="object-cover h-full w-full" alt={data.productName} />
            </div>
            <h1 className="mt-2 text-lg font-semibold truncate">{data.productName}</h1>
            <p className="font-semibold mt-1">{displayINRCurrency(data.sellingPrice)}</p>
            <div
                onClick={() => setEditProduct(true)}
                className="absolute top-2 right-2 p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer hidden group-hover:block"
            >
                <MdModeEditOutline />
            </div>

            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchData={fetchData}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
