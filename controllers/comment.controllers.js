const commentModels = require("../models/comment.models");
const createComment = async(req, res) => {
    const chapter = req.chapter;
    try {
        const newComment = new commentModels({
            chapter: chapter._id,
            author: req.verifiedUser._id,
            content: req.body.content,
        });

        const savedComment = await newComment.save();
        return res.status(201).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createComment = createComment;