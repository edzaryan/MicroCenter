const backendDomain = "http://localhost:8080";

const createApiEndpoint = (path, method) => ({
  url: `${backendDomain}/api/${path}/`,
  method,
});

const SummaryApi = {
  // AUTH
  signUp: createApiEndpoint("auth/signup", "post"),
  signIn: createApiEndpoint("auth/signin", "post"),
  logout_user: createApiEndpoint("auth/logout", "post"),
  forgotPassword: createApiEndpoint("forgot-password", "post"),

  // USERS
  current_user: createApiEndpoint("users/details", "get"),
  allUser: createApiEndpoint("users", "get"),
  updateUser: createApiEndpoint("users/update", "patch"),

  // PRODUCTS
  allProduct: createApiEndpoint("products", "get"),
  productDetails: createApiEndpoint("products/details", "post"),
  searchProduct: createApiEndpoint("products/search", "get"),
  categoryProduct: createApiEndpoint("products/category-one", "get"),
  categoryWiseProduct: createApiEndpoint("products/category-product", "post"),
  filterProduct: createApiEndpoint("products/filter", "post"),
  updateProduct: createApiEndpoint("products/update", "post"),
  uploadProduct: createApiEndpoint("products/upload", "post"),

  // CART
  addToCartProduct: createApiEndpoint("cart", "post"),
  addToCartProductView: createApiEndpoint("cart", "get"),
  addToCartProductCount: createApiEndpoint("cart/count", "get"),
  updateCartProduct: createApiEndpoint("cart/update", "post"),
  deleteCartProduct: createApiEndpoint("cart/delete", "post"),
};

export default SummaryApi;
