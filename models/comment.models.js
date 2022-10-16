const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: { type: String },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema, "Comment");