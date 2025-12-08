const addToCartModel = require("../../models/cartProductModel");


const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        const allProducts = await addToCartModel.find({ userId: currentUser }).populate("productId");

        res.status(200).json({
            data: allProducts,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartViewProduct;
