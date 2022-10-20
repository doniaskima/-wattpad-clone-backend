const verifyToken = require("./verifyToken");

module.exports = function(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        req.verifiedUser = null;
        next();
    } else {
        return verifyToken(req, res, next);
    }
}