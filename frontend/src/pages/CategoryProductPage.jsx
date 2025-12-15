import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import Radio from "../components/Radio";
import productCategory from "../utils/helpers/productCategory";
import Checkbox from "../components/Checkbox";
import VerticalCard from "../components/VerticalCard";

const CategoryProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const initialCategories = params.getAll("category");
    const initialSort = params.get("sortBy") || "asc";

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const [sortBy, setSortBy] = useState(initialSort);

    useEffect(() => {
        const query = new URLSearchParams();
        selectedCategories.forEach((c) => query.append("category", c));
        query.set("sortBy", sortBy);

        const newQueryString = query.toString();
        if (newQueryString !== location.search.substring(1)) {
            navigate({ search: newQueryString }, { replace: true });
        }
    }, [selectedCategories, sortBy, navigate, location.search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(SummaryApi.filterProduct.url, {
                    method: SummaryApi.filterProduct.method,
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        category: selectedCategories,
                        sortBy: sortBy,
                    }),
                });

                const json = await response.json();
                setData(json?.data || []);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [selectedCategories, sortBy]);

    const handleSelectCategory = ({ target: { value, checked } }) => {
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((c) => c !== value)
        );
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
                <div className="bg-white rounded-lg shadow p-4 h-fit">
                    <div className="mb-6">
                        <h3 className="uppercase font-medium text-sm text-slate-600 border-b pb-1">
                            Sort by
                        </h3>

                        <div className="text-sm flex flex-col gap-2 py-2">
                            <Radio
                                id="sort-asc"
                                name="sortBy"
                                value="asc"
                                label="Price - Low to High"
                                checked={sortBy === "asc"}
                                onChange={handleSortChange}
                            />
                            <Radio
                                id="sort-dsc"
                                name="sortBy"
                                value="dsc"
                                label="Price - High to Low"
                                checked={sortBy === "dsc"}
                                onChange={handleSortChange}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="uppercase font-medium text-sm text-slate-600 border-b pb-1">
                            Category
                        </h3>

                        <div className="text-sm flex flex-col gap-2 py-2">
                            {productCategory.map((cat) => (
                                <Checkbox
                                    key={cat.value}
                                    id={cat.value}
                                    name="category"
                                    value={cat.value}
                                    label={cat.label}
                                    checked={selectedCategories.includes(cat.value)}
                                    onChange={handleSelectCategory}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {!loading && (
                        <p className="text-lg font-semibold my-3">
                            {data.length === 0
                                ? "No products match your filters"
                                : `${data.length} items available`}
                        </p>
                    )}

                    {loading && <p className="text-center py-4">Loading...</p>}

                    {!loading && data.length > 0 && (
                        <VerticalCard data={data} loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryProductPage;