const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Vote", VoteSchema, "Vote");