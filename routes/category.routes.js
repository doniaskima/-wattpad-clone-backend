const {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
} = require("../controllers/category.controllers");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/verifyToken");
const categoryModels = require("../models/category.models");

const router = require("express").Router();
router.param("category", async(req, res, next, id) => {
    try {
        const category = await categoryModels.findById(id);
        if (!category) {
            return res.status(404).json("category not found");
        }
        req.category = category;
        next();
    } catch (err) {
        return res.status(500).status.json(err);
    }
});
router.get("/", getCategories);
router.get("/:category", getCategory);
router.post("/", verifyToken, isAdmin, createCategory);
router.delete("/:category", verifyToken, isAdmin, deleteCategory);
router.put("/:category", verifyToken, isAdmin, updateCategory);

module.exports = router;