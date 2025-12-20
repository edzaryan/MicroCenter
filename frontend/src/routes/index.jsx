import CategoryProductPage from "../pages/CategoryProductPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import SearchProductPage from "../pages/SearchProductPage";
import { createBrowserRouter } from "react-router-dom";
import AllProductsPage from "../pages/AllProductsPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import AllUsersPage from "../pages/AllUsersPage";
import SigninPage from "../pages/auth/SigninPage";
import SignUpPage from "../pages/auth/SignUpPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import App from "../App";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "", element: <HomePage /> },
                { path: "signin", element: <SigninPage /> },
                { path: "signup", element: <SignUpPage /> },
                { path: "forgot-password", element: <ForgotPasswordPage /> },
                { path: "product-category", element: <CategoryProductPage /> },
                { path: "cart", element: <CartPage /> },
                { path: "product/:id", element: <ProductDetailsPage /> },
                { path: "search", element: <SearchProductPage /> },
                {
                    path: "admin-panel",
                    element: <AdminPanelPage />,
                    children: [
                        { path: "all-users", element: <AllUsersPage /> },
                        { path: "all-products", element: <AllProductsPage /> }
                    ]
                }
            ]
        }
    ]
);

export default router;
