const mongoose = require("mongoose");

const ReadSchema = new mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    reader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Read", ReadSchema, "Read");