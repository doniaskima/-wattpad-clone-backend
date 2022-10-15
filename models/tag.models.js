const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    name: { type: String, unique: true, lowercase: true },
}, { timestamps: true });

module.exports = mongoose.model("Tag", TagSchema, "Tag");