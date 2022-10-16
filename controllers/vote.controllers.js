const voteModels = require("../models/vote.models");

const voteChapter = async(req, res) => {
    const chapter = req.chapter;
    try {
        const voteExist = await voteModels.findOne({
            chapter: chapter._id,
            voter: req.verifiedUser._id,
        });
        if (voteExist) return res.status(204).json();
        const newVote = new voteModels({
            chapter: chapter._id,
            voter: req.verifiedUser._id,
        });

        await newVote.save();
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.voteChapter = voteChapter;