import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProductPage = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${SummaryApi.searchProduct.url + query.search}`);
        const dataResponse = await response.json();
        setData(dataResponse.data);
        setLoading(false);
    }, [query.search]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <div className="container mx-auto">
            {loading && <p className="text-lg text-center">Loading...</p>}

            {data.length === 0 && !loading && (
                <p className="bg-white text-lg text-center p-4">No Data Found...</p>
            )}

            {!loading && data.length !== 0 && (
                <VerticalCard 
                    loading={loading} 
                    data={data} 
                    heading={`Search Results: ${data.length}`} 
                />
            )}
        </div>
    );
}

export default SearchProductPage;
