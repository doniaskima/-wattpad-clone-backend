const userModels = require("../models/user.models");

const createUser = async(req, res) => {
    const newUser = new userModels({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getUsers = async(req, res) => {
    try {
        const users = await userModels.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getUser = async(req, res) => {
    const user = req.user;
    try {
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteUser = async(req, res) => {
    const id = req.user._id;
    try {
        const user = await userModels.findByIdAndDelete(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateUser = async(req, res) => {
    const id = req.user._id;
    try {
        const user = await userModels.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.createUser = createUser;