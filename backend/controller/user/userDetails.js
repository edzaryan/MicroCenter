const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
}

module.exports = userDetailsController;
