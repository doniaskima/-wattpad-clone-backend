const readModels = require("../models/read.models");
const readChapter = async(req, res) => {
    const chapter = req.chapter;
    try {
        const readExist = await readModels.findOne({
            chapter: chapter._id,
            reader: req.verifiedUser._id,
        });
        if (readExist) return res.status(204).json();
        const newRead = new readModels({
            chapter: chapter._id,
            reader: req.verifiedUser._id,
        });

        await newRead.save();
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.readChapter = readChapter;