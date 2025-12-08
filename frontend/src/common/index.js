const backendDomain = "http://localhost:8080";


const createApiEndpoint = (path, method) => ({
    url: `${backendDomain}${path}`,
    method,
});


const SummaryApi = {
    signUp: createApiEndpoint("/api/signup", "post"),
    signIn: createApiEndpoint("/api/signin", "post"),
    current_user: createApiEndpoint("/api/user-details", "get"),
    logout_user: createApiEndpoint("/api/userLogout", "get"),
    allUser: createApiEndpoint("/api/all-users", "get"),
    updateUser: createApiEndpoint("/api/update-user", "post"),
    uploadProduct: createApiEndpoint("/api/upload-product", "post"),
    allProduct: createApiEndpoint("/api/get-product", "get"),
    updateProduct: createApiEndpoint("/api/update-product", "post"),
    categoryProduct: createApiEndpoint("/api/get-categoryProduct", "get"),
    categoryWiseProduct: createApiEndpoint("/api/category-product", "post"),
    productDetails: createApiEndpoint("/api/product-details", "post"),
    addToCartProduct: createApiEndpoint("/api/addtocart", "post"),
    addToCartProductCount: createApiEndpoint("/api/countAddToCartProduct", "get"),
    addToCartProductView: createApiEndpoint("/api/view-card-product", "get"),
    updateCartProduct: createApiEndpoint("/api/update-cart-product", "post"),
    deleteCartProduct: createApiEndpoint("/api/delete-cart-product", "post"),
    searchProduct: createApiEndpoint("/api/search", "get"),
    filterProduct: createApiEndpoint("/api/filter-product", "post"),
    forgotPassword: createApiEndpoint("/api/forgot-password", "post"),
    checkVerificationCode: createApiEndpoint("/api/check-verification-code", "post"),
    changePassword: createApiEndpoint("/api/change-password", "post")
};


export default SummaryApi;
