import {
    fetchCategoryWiseProduct,
    displayINRCurrency,
    FaAngleRight,
    FaAngleLeft,
    useContext,
    useEffect,
    addToCart,
    useState,
    Context,
    useRef,
    Button,
    Link,
} from "../utils/imports";


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
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none" ref={scrollElement}>
                <button 
                    className="bg-white shadow-sm rounded-full p-2 absolute -left-2 text-lg hidden md:block z-10 hover:bg-gray-50 transition duration-200" 
                    onClick={scrollLeft}>
                    <FaAngleLeft size={26} />
                </button>
                <button 
                    className="bg-white shadow-sm rounded-full p-2 absolute -right-2 text-lg hidden md:block z-10 hover:bg-gray-50 transition duration-200" 
                    onClick={scrollRight}>
                    <FaAngleRight size={26} />
                </button>
                {
                    loading ? (
                        loadingList.map((product, index)=> (
                            <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                                <div className="p-4 grid w-full gap-2">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                                    <div className="flex gap-3 w-full">
                                        <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                        <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                    </div>
                                    <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                                </div>
                            </div>
                        ))) : (
                        data.map(product => (
                            <Link to={`product/${product?._id}`} key={product?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                                    <img src={product.productImage[0]} className="h-full hover:scale-110 transition-all" />
                                </div>
                                <div className="p-4 grid">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                    <p className="capitalize text-slate-500">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <Button
                                        shape="rounded"
                                        variant="danger"
                                        size="sm"
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                        danger>Add to Cart</Button>
                                </div>
                            </Link>
                        )))
                }
            </div>
        </div>
    )
}


export default HorizontalCardProduct;