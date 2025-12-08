const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const token = req.cookies?.token;

        if (!newPassword || !token) {
            return res.status(400).json({
                message: "New password and token are required",
                error: true,
                success: false
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        } catch (err) {
            return res.status(401).json({
                message: "Invalid or expired token",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.status(200).json({
            message: "Password successfully changed",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
};


module.exports = changePassword;
