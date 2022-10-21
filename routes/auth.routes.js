const { login, register, verifyEmail } = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verifyEmail)
module.exports = router;