const addToCartModel = require("../../models/cartProductModel");

const updateAddToCartProduct = async (req, res) => {
    try {
        const { _id, quantity } = req.body;

        if (!_id || quantity === undefined) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                success: false,
                error: true,
            });
        }

        const updateProduct = await addToCartModel.updateOne({ _id }, { quantity });

        res.status(200).json({
            message: "Product updated successfully",
            data: updateProduct,
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

module.exports = updateAddToCartProduct;
