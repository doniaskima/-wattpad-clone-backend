const mongoose = require("mongoose");
const slug = require("slug");
const StorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    cover: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    targetAudience: { type: String },
    language: { type: String, default: "ar" },
    rating: { type: Number },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

StorySchema.pre("validate", function(next) {
    if (!this.slug) {
        this.slugify(this.title);
    }
    next();
});
StorySchema.methods.slugify = function(text) {
    this.slug =
        slug(text) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Story", StorySchema, "Story");