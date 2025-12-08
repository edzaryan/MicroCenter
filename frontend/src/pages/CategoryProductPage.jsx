import {
    useLocation,
    useNavigate,
    productCategory,
    useEffect,
    useState,
    VerticalCard,
    SummaryApi
} from "../utils/imports";


const CategoryProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");
    const [sortBy, setSortBy] = useState(urlSearch.get("sortBy") || "asc");

    useEffect(() => {
        if (urlCategoryListInArray.length > 0) {
            setSelectedCategories(urlCategoryListInArray);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedCategories, sortBy]);

    useEffect(() => {
        const searchParams = new URLSearchParams();
        selectedCategories.forEach(category => searchParams.append("category", category));
        searchParams.set("sortBy", sortBy);
        navigate({ search: searchParams.toString() });
    }, [selectedCategories, sortBy]);

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.filterProduct.url, {
                method: SummaryApi.filterProduct.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    category: selectedCategories,
                    sortBy: sortBy
                })
            });

            const dataResponse = await response.json();
            setData(dataResponse?.data || []);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    const handleSelectCategory = ({ target: { value, checked } }) => {
        setSelectedCategories(prev => (
            checked ? [...prev, value] : prev.filter(category => category !== value)
        ));
    }

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
                    <div>
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="asc"
                                    checked={sortBy === "asc"}
                                    onChange={handleOnChangeSortBy}
                                />
                                <label>Price - Low to High</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="dsc"
                                    checked={sortBy === "dsc"}
                                    onChange={handleOnChangeSortBy}
                                />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            {
                                productCategory.map(categoryName => (
                                    <div key={categoryName.value} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id={categoryName?.value}
                                            value={categoryName?.value}
                                            checked={selectedCategories.includes(categoryName?.value)}
                                            onChange={handleSelectCategory}
                                        />
                                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                </div>
                <div className="px-4">
                    <p className="font-medium text-slate-800 text-lg my-2">Search Results : {data.length}</p>
                    <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CategoryProductPage;
