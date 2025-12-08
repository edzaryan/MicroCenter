const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "All products retrieved successfully",
            success: true,
            error: false,
            data: allProducts,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = getProductController;
