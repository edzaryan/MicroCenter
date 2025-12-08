const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const category = req.body.category || req.query.category;

        if (!category) {
            return res.status(400).json({
                message: "Category is required",
                success: false,
                error: true,
            });
        }

        const products = await productModel.find({ category });

        res.status(200).json({
            data: products,
            message: "Products retrieved successfully",
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

module.exports = getCategoryWiseProduct;
