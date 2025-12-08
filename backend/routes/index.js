const express = require("express");
const router = express.Router();


const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const updateUser = require("../controller/user/updateUser");
const allUsers = require("../controller/user/allUsers");
const userLogout = require("../controller/user/userLogout");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCardViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const forgotPassword = require("../controller/user/forgotPassword");
const checkVerificationCode = require("../controller/user/checkVerificationCode");
const authToken = require("../middleware/authToken");
const changePassword = require("../controller/user/changePassword");


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// product
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// user add to cart
router.post("/addToCart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// password
router.post("/forgot-password", forgotPassword);
router.post("/check-verification-code", checkVerificationCode);
router.post("/change-password", changePassword);


module.exports = router;