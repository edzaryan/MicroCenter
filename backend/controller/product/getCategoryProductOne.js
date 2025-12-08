const productModel = require("../../models/productModel");

const getCategoryProductOne = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category");

        const productByCategory = await Promise.all(
            productCategory.map(async (category) => {
                return await productModel.findOne({ category });
            })
        );

        const filteredProductByCategory = productByCategory.filter(Boolean);

        res.status(200).json({
            message: "Category products retrieved successfully",
            data: filteredProductByCategory,
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

module.exports = getCategoryProductOne;
