import {
    useEffect,
    useState,
    AdminUploadProduct,
    SummaryApi,
    AdminProductCard,
    Button
} from "../utils/imports";


const AllProductsPage = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = async () => {
        try {
            const response = await fetch(SummaryApi.allProduct.url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const dataResponse = await response.json();
            setAllProducts(dataResponse.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <div className="grid gap-3">
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Products</h2>
                <Button
                    onClick={() => setOpenUploadProduct(true)}
                    variant="danger"
                    size="md"
                    shape="rounded"
                    outline
                >
                    Add Product
                </Button>
            </div>
            <div className="h-[calc(100vh-190px)] overflow-y-scroll">
                <div className="flex items-start flex-wrap gap-5">
                    {
                        allProducts?.map((product, index) => (
                            <AdminProductCard
                                key={index}
                                data={product}
                                fetchData={fetchAllProduct}
                            />
                        ))
                    }
                </div>
            </div>
            {
                openUploadProduct && (
                    <AdminUploadProduct
                        onClose={() => setOpenUploadProduct(false)}
                        fetchData={fetchAllProduct}
                    />
                )
            }
        </div>
    );
};


export default AllProductsPage;
