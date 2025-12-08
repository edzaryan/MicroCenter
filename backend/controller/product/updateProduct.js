const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
    try {
        const hasPermission = await uploadProductPermission(req.userId);
        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                success: false,
                error: true,
            });
        }

        const { _id, ...updateData } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true,
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
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
}

module.exports = updateProductController;
