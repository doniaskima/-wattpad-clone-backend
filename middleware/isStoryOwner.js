module.exports = function(req, res, next) {
    if (req.verifiedUser._id === req.story.author.toString()) {
        next();
    } else {

        return res
            .status(403)
            .json({ message: "you are not the owner of the story" });
    }

};