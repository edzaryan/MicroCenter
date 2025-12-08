const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const { category, sortBy } = req.body;
        const sortOption = sortBy === "asc" ? { sellingPrice: 1 } : { sellingPrice: -1 };

        const products = await productModel.find({
            category: { "$in": category },
        }).sort(sortOption);

        res.status(200).json({
            data: products,
            message: "Products retrieved successfully",
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = filterProductController;
