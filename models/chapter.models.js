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
    readTime: { type: Number, default: 0 },
}, { timestamps: true });
ChapterSchema.pre("validate", function(next) {
    this.calculateReadTime();
    next();
});

ChapterSchema.methods.calculateReadTime = function() {
    const wordsPerMinutes = 200;
    const numberOfWords = this.content.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinutes;
    const readTime = Math.ceil(minutes);
    this.readTime = readTime;
};
module.exports = mongoose.model("Chapter", ChapterSchema, "Chapter");