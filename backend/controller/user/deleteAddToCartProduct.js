const cartProductModel = require("../../models/cartProductModel");


const deleteAddToCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body._id;

        const deleteProduct = await cartProductModel.deleteOne({ _id: addToCartProductId });

        res.json({
            message: "Product Deleted From CartPage",
            error: false,
            success: true,
            data: deleteProduct
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};


module.exports = deleteAddToCartProduct;