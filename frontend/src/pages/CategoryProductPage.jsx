import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import Radio from "../components/Radio";
import productCategory from "../utils/helpers/productCategory";
import Checkbox from "../components/Checkbox";
import VerticalCard from "../components/VerticalCard";

const CategoryProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState("asc");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoriesFromURL = params.getAll("category");
        const sortFromURL = params.get("sortBy");

        if (categoriesFromURL.length > 0) {
            setSelectedCategories(categoriesFromURL);
        }
        if (sortFromURL) {
            setSortBy(sortFromURL);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        selectedCategories.forEach((c) => params.append("category", c));
        params.set("sortBy", sortBy);

        const newQuery = params.toString();

        if (newQuery !== location.search.substring(1)) {
            navigate({ search: newQuery }, { replace: true });
        }
    }, [selectedCategories, sortBy, navigate, location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(SummaryApi.filterProduct.url, {
                    method: SummaryApi.filterProduct.method,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        category: selectedCategories,
                        sortBy: sortBy,
                    }),
                });

                const dataResponse = await response.json();
                setData(dataResponse?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategories, sortBy]);

    const handleSelectCategory = ({ target: { value, checked } }) => {
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-[220px,1fr] items-start">
                <div className="grid content-start gap-4 bg-white px-4 py-5">
                    <div className="grid gap-2">
                        <h3 className="uppercase font-medium text-sm text-slate-600 border-b pb-1 border-slate-300">
                            Sort by
                        </h3>

                        <div className="text-sm flex flex-col gap-2 py-2">
                            <Radio
                                id="sort-asc"
                                name="sortBy"
                                value="asc"
                                label="Price - Low to High"
                                checked={sortBy === "asc"}
                                onChange={handleOnChangeSortBy}
                            />

                            <Radio
                                id="sort-dsc"
                                name="sortBy"
                                value="dsc"
                                label="Price - High to Low"
                                checked={sortBy === "dsc"}
                                onChange={handleOnChangeSortBy}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <h3 className="uppercase font-medium text-sm text-slate-600 border-b pb-1 border-slate-300">
                            Category
                        </h3>

                        <div className="text-sm flex flex-col gap-2 py-2">
                            {productCategory.map((categoryName) => (
                                <Checkbox
                                    key={categoryName.value}
                                    id={categoryName.value}
                                    name="category"
                                    value={categoryName.value}
                                    label={categoryName.label}
                                    checked={selectedCategories.includes(categoryName.value)}
                                    onChange={handleSelectCategory}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <p className="font-medium text-slate-800 text-lg my-2">
                        Search Results : {data.length}
                    </p>

                    {!loading && data.length !== 0 && (
                        <VerticalCard data={data} loading={loading} />
                    )}

                    {!loading && data.length === 0 && (
                        <p className="text-center py-4 text-slate-500">
                            No products found.
                        </p>
                    )}

                    {loading && (
                        <p className="text-center py-4">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryProductPage;
