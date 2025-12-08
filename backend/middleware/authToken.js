const jwt = require("jsonwebtoken");


const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                message: "Please login",
                error: true,
                success: false,
            });
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
        });

        req.userId = decoded._id;
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message === "jwt malformed" ? "Invalid token" : err.message,
            error: true,
            success: false,
        });
    }
}


module.exports = authToken;
