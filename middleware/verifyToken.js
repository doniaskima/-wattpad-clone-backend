const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ message: "no token provided" });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.verifiedUser = verified;
        next();
    } catch (err) {
        return res.status(403).json({ message: "invalid token" });
    }
};