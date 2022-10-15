const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true,
    },
    order: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("Chapter", ChapterSchema, "Chapter");