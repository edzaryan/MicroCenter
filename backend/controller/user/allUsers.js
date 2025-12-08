const userModel = require("../../models/userModel");

async function allUsers(req, res) {
    try {
        const allUsers = await userModel.find({});

        res.status(200).json({
            message: "All Users",
            data: allUsers,
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

module.exports = allUsers;
