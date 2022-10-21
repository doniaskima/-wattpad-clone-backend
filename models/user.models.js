const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, maxlength: 128 },
    lastName: { type: String, maxlength: 128 },
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true,
    },
    password: { type: String },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema, "User");