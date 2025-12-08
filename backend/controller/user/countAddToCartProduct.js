const addToCartProductModel = require("../../models/cartProductModel");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        const count = await addToCartProductModel.countDocuments({ userId });

        res.status(200).json({
            data: { count },
            message: "ok",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;
