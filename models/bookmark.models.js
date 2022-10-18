const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Bookmark", BookmarkSchema, "Bookmark");