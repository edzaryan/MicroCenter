import {
    useLocation,
    SummaryApi,
    useEffect,
    useState,
    VerticalCard
} from "../utils/imports";


const SearchProductPage = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [query]);

    const fetchProduct = async () => {
        setLoading(true);
        const response = await fetch(`${SummaryApi.searchProduct.url + query.search}`);
        const dataResponse = await response.json();
        setData(dataResponse.data);
        setLoading(false);
    }

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-lg text-center">Loading...</p>}
            <p className="text-lg font-semibold my-3">Search Results: { data.length }</p>
            {data.length === 0 && !loading && <p className="bg-white text-lg text-center p-4">No Data Found...</p>}
            {data.length !== 0 && !loading && <VerticalCard loading={loading} data={data} />}
        </div>
    );
};


export default SearchProductPage;