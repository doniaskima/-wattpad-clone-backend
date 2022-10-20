const chapterModel = require("../models/chapter.models");
const readModels = require("../models/read.models");
const createChapter = async(req, res) => {
    const newChapter = new chapterModel({
        title: req.body.title,
        content: req.body.content,
        story: req.story._id,
        order: req.body.order,
    });
    try {
        const savedChapter = await newChapter.save();
        return res.status(201).json(savedChapter);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getStoryChapters = async(req, res) => {
    try {
        const chapters = await chapterModel.find({ story: req.story._id });
        return res.status(200).json(chapters);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getChapter = async(req, res) => {
    const chapter = req.chapter;
}


const deleteChapter = async(req, res) => {
    const chapter = req.chapter;
    try {
        const deletedChapter = await chapterModel.findByIdAndDelete(chapter._id);
        return res.status(200).json(deletedChapter);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateChapter = async(req, res) => {
    const chapter = req.chapter;
    try {
        const updatedChapter = await chapterModel.findByIdAndUpdate(
            chapter._id,
            req.body, {
                new: true,
            }
        );
        return res.status(200).json(updatedChapter);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.getChapter = getChapter;
module.exports.getStoryChapters = getStoryChapters;
module.exports.createChapter = createChapter;
module.exports.deleteChapter = deleteChapter;
module.exports.updateChapter = updateChapter;