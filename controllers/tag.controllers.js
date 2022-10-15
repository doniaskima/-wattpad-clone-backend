const tagModel = require("../models/tag.models");

const createTag = async(req, res) => {
    const newTag = new tagModel({
        name: req.body.name,
    });
    try {
        const savedTag = await newTag.save();
        return res.status(201).json(savedTag);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getTags = async(req, res) => {
    try {
        const tags = await tagModel.find();
        return res.status(200).json(tags);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getTag = async(req, res) => {
    const tag = req.tag;
    try {
        return res.status(200).json(tag);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteTag = async(req, res) => {
    const tag = req.tag;
    try {
        const deletedTag = await tagModel.findByIdAndDelete(tag._id);
        return res.status(200).json(deletedTag);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateTag = async(req, res) => {
    const tag = req.tag;
    try {
        const updatedTag = await tagModel.findByIdAndUpdate(tag._id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedTag);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.getTag = getTag;
module.exports.getTags = getTags;
module.exports.createTag = createTag;
module.exports.deleteTag = deleteTag;
module.exports.updateTag = updateTag;