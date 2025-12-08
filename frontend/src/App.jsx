import { useEffect, useState, Outlet, Header, Footer, ToastContainer, SummaryApi, Context, UserContext } from "./utils/imports";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const App = () => {
    const [cartProductCount, setCartProductCount] = useState(0);
    const [user, setUser] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: "include",
            });

            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                setUser(dataApi.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    const fetchUserAddToCart = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
                method: SummaryApi.addToCartProductCount.method, // Corrected method key
                credentials: "include",
            });

            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                setCartProductCount(dataApi?.data?.count);
            }
        } catch (error) {
            console.error("Error fetching cart product count:", error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
        fetchUserAddToCart();
    }, []);

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}>
                    <ToastContainer position="top-center" />
                    <Header />
                    <main className="min-h-[calc(100vh-120px)] pt-16">
                        <Outlet />
                    </main>
                    <Footer />
                </Context.Provider>
            </UserContext.Provider>
        </>
    );
};

export default App;
