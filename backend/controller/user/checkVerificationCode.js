const jwt = require("jsonwebtoken");


const generateToken = (email, expiresIn = "15m") =>
    jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn });


const checkVerificationCode = async (req, res) => {
    try {
        const { code } = req.body;
        const token = req.cookies?.token;

        if (!code || !token) {
            return res.status(400).json({
                message: "Verification code and token are required",
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

        if (decoded.verificationCode !== code) {
            return res.status(400).json({
                message: "Invalid verification code",
                error: true,
                success: false
            });
        }

        const newToken = generateToken(decoded.email);

        res.cookie("token", newToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 }).status(200).json({
            message: "Verification successful",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = checkVerificationCode;
