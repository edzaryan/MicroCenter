const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.v;

        if (!query) {
            return res.status(400).json({
                message: "Query parameter is required",
                error: true,
                success: false,
            });
        }

        const regex = new RegExp(query, "i");

        const products = await productModel.find({
            $or: [
                { productName: regex },
                { category: regex },
            ],
        });

        res.status(200).json({
            data: products,
            message: "Search product list",
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

module.exports = searchProduct;
