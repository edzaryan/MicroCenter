const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const { email, name, role } = req.body;

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        const payload = {};
        if (email) payload.email = email;
        if (name) payload.name = name;
        if (role) payload.role = role;

        const updatedUser = await userModel.findByIdAndUpdate(req.userId, payload, { new: true });

        res.status(200).json({
            data: updatedUser,
            message: "User updated successfully",
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

module.exports = updateUser;
