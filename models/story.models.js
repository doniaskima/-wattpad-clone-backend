const mongoose = require("mongoose");

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
    reads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
    readTime: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });



StorySchema.pre("validate", function(next) {
    if (!this.slug) {
        this.slugify(this.title)
    }
    next();
});

StorySchema.methods.slugify = function(text) {
    this.slug = slug(text) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};


module.exports = mongoose.model("Story", StorySchema, "Story");