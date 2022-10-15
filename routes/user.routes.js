const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require("../controllers/user.controllers");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();
router.param("user", async(req, res, next, id) => {
    try {
        const user = await userModels.findById(id);
        if (!user) {
            return res.status(404).json("user not found");
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).status.json(err);
    }
});
router.get("/", verifyToken, isAdmin, getUsers);
router.get("/:user", verifyToken, isAdmin, getUser);
router.post("/", verifyToken, isAdmin, createUser);
router.delete("/:user", verifyToken, isAdmin, deleteUser);
router.put("/:user", verifyToken, isAdmin, updateUser);

module.exports = router;