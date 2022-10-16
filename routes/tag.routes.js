const {
    getTags,
    getTag,
    createTag,
    deleteTag,
    updateTag,
} = require("../controllers/tag.controllers");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/verifyToken");
const tagModels = require("../models/tag.models");

const router = require("express").Router();
router.param("tag", async(req, res, next, id) => {
    try {
        const tag = await tagModels.findById(id);
        if (!tag) {
            return res.status(404).json("tag not found");
        }
        req.tag = tag;
        next();
    } catch (err) {
        return res.status(500).status.json(err);
    }
});
router.get("/", getTags);
router.get("/:tag", getTag);
router.post("/", verifyToken, isAdmin, createTag);
router.delete("/:tag", verifyToken, isAdmin, deleteTag);
router.put("/:tag", verifyToken, isAdmin, updateTag);

module.exports = router;