

async function userLogout(req, res) {
    try {
        res.clearCookie("token").status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
