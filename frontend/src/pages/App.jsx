import { useEffect, useState } from "react";
import SummaryApi from "../common/index";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import UserContext from "../context/userContext";
import Context from "../context";

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
    };

    // Fetch cart product count
    const fetchUserAddToCart = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
                method: SummaryApi.addToCartProductCount.method,
                credentials: "include",
            });

            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                setCartProductCount(dataApi?.data?.count);
            }
        } catch (error) {
            console.error("Error fetching cart product count:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserDetails();
            await fetchUserAddToCart();
        };

        fetchData();
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
