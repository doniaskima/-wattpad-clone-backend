const {
    getStoryChapters,
    getChapter,
    createChapter,
    deleteChapter,
    updateChapter,
} = require("../controllers/chapter.controllers");
const {
    getStory,
    getStories,
    createStory,
    updateStory,
    deleteStory,
} = require("../controllers/story.controllers");
const verifyToken = require("../middleware/verifyToken");
const isStoryOwner = require("../middleware/isStoryOwner");
const chapterModels = require("../models/chapter.models");
const storyModels = require("../models/story.models");
const { voteChapter } = require("../controllers/vote.controllers");
const { createComment } = require("../controllers/comment.controllers");
const router = require("express").Router();
router.param("story", async(req, res, next, id) => {
    try {
        const story = await storyModels.findById(id);
        if (!story) {
            return res.status(404).json("story not found");
        }
        req.story = story;
        next();
    } catch (err) {
        return res.status(500).status.json(err);
    }
});
router.param("chapter", async(req, res, next, id) => {
    try {
        const chapter = await chapterModels.findById(id);
        if (!chapter) {
            return res.status(404).json("chapter not found");
        }
        req.chapter = chapter;
        next();
    } catch (err) {
        return res.status(500).status.json(err);
    }
});
router.post("/", verifyToken, createStory);
router.put("/:story", verifyToken, isStoryOwner, updateStory);
router.delete("/:story", verifyToken, isStoryOwner, deleteStory);
router.get("/", getStories);
router.get("/:story", getStory);

router.post("/:story/chapters/:chapter/vote", verifyToken, voteChapter);
router.post("/:story/chapters/:chapter/comments", verifyToken, createComment);

router.get("/:story/chapters", getStoryChapters);
router.get("/:story/chapters/:chapter", verifyToken, getChapter);
router.post("/:story/chapters", verifyToken, isStoryOwner, createChapter);
router.delete(
    "/:story/chapters/:chapter",
    verifyToken,
    isStoryOwner,
    deleteChapter
);
router.put(
    "/:story/chapters/:chapter",
    verifyToken,
    isStoryOwner,
    updateChapter
);

module.exports = router;