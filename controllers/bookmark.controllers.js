const bookmarkModels = require("../models/bookmark.models");

const bookmarkStory = async(req, res) => {
    const story = req.story;
    try {
        const bookmarkExist = await bookmarkModels.findOne({
            story: story._id,
            user: req.verifiedUser._id,
        });
        if (bookmarkExist) return res.status(204).json();
        const newBookmark = new bookmarkModels({
            story: story._id,
            user: req.verifiedUser._id,
        });

        await newBookmark.save();
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json(err);
    }
};
const unbookmarkStory = async(req, res) => {
    const story = req.story;
    try {
        await bookmarkModels.findOneAndDelete({
            story: story._id,
            user: req.verifiedUser._id,
        });
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.bookmarkStory = bookmarkStory;
module.exports.unbookmarkStory = unbookmarkStory;