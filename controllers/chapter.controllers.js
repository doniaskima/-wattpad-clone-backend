const chapterModel = require("../models/chapter.models");
const readModels = require("../models/read.models");
const mongoose = require("mongoose");
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
    try {
        const readExist = await readModels.findOne({
            chapter: chapter._id,
            reader: req.verifiedUser._id,
        });
        if (!readExist) {
            const newRead = new readModels({
                chapter: chapter._id,
                reader: req.verifiedUser._id,
            });
            await newRead.save();
        }
        const chap = await chapterModel.aggregate([
            { $match: { _id: req.chapter._id } },
            {
                $lookup: {
                    from: "Vote",
                    localField: "_id",
                    foreignField: "chapter",
                    as: "votes",
                },
            },
            {
                $lookup: {
                    from: "Read",
                    localField: "_id",
                    foreignField: "chapter",
                    as: "reads",
                },
            },
            {
                $lookup: {
                    from: "Comment",
                    localField: "_id",
                    foreignField: "chapter",
                    as: "comments",
                },
            },
            ...(req.verifiedUser ?
                [{
                        $lookup: {
                            from: "Vote",
                            let: {
                                chapterId: "$_id",
                            },
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: {
                                            $eq: ["$$chapterId", "$chapter"],
                                            $eq: [
                                                "$voter",
                                                mongoose.Types.ObjectId(req.verifiedUser._id),
                                            ],
                                        },
                                    },
                                },
                            }, ],
                            as: "voters",
                        },
                    },
                    {
                        $addFields: {
                            voters: { $size: "$voters" },
                        },
                    },

                    {
                        $addFields: {
                            reads: { $size: "$reads" },
                            votes: { $size: "$votes" },
                            comments: { $size: "$comments" },
                            canVote: {
                                $switch: {
                                    branches: [
                                        { case: { $ne: ["$voters", 0] }, then: false },
                                        { case: { $eq: ["$voters", 0] }, then: true },
                                    ],
                                },
                            },
                        },
                    },
                    { $unset: "voters" },
                ] :
                []),
        ]);
        return res.status(200).json(chap[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

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