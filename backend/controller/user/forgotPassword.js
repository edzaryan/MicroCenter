const userModel = require("../../models/userModel");
const sendEmail = require("../../helpers/emailSender");
const jwt = require("jsonwebtoken");


const generateVerificationCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (email, verificationCode, expiresIn = "15m") =>
    jwt.sign({ email, verificationCode }, process.env.TOKEN_SECRET_KEY, { expiresIn });


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `No user found with email: ${email}`,
                error: true,
                success: false
            });
        }

        const verificationCode = generateVerificationCode();

        const token = generateToken(email, verificationCode, generateVerificationCode());

        const emailSent = await sendEmail(
            email,
            verificationCode,
            "Password Reset Verification Code",
            `Your verification code is: ${verificationCode}`
        );

        if (!emailSent) {
            return res.status(500).json({
                message: "Failed to send password reset email",
                error: true,
                success: false
            });
        }

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 2 * 60 * 1000 }).status(200).json({
            message: `Password reset instructions sent to ${email}`,
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


module.exports = forgotPassword;

