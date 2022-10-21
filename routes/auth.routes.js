const {
    login,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verifyEmail)
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
module.exports = router;