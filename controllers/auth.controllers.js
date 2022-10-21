const userModels = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer")
const login = async(req, res) => {
    try {
        const userExist = await userModels.findOne({ email: req.body.email });
        if (!userExist)
            return res.status(403).json({ message: "Wrong email/password" });

        const validPassword = bcrypt.compare(req.body.password, userExist.password);
        if (!validPassword)
            return res.status(403).json({ message: "Wrong email/password" });

        const token = jwt.sign({ _id: userExist._id, isAdmin: userExist.isAdmin, isEmailVerified: userExist.isEmailVerified },
            process.env.TOKEN_KEY, {
                expiresIn: "2 days",
            }
        );
        return res.status(200).json({ token: token, user: userExist });
    } catch (err) {
        return res.status(500).json(err);
    }
};
const register = async(req, res) => {
    try {
        const userExist = await userModels.findOne({ email: req.body.email });
        if (userExist)
            return res.status(403).json({ message: "Email already exist" });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModels({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ _id: savedUser._id },
            process.env.TOKEN_KEY, {
                expiresIn: "1h",
            }
        );
        await transporter.sendMail({
            from: "wattpad@clone-wattpad.com",
            to: savedUser.email,
            subject: "verify email",
            body: `<p>${token}</p>`,
        })

        return res.status(200).json({ message: "verify ur account" });
    } catch (err) {
        return res.status(500).json(err);
    }
};

const verifyEmail = async(req, res) => {
    try {
        if (!req.body.token) {
            return res.status(403).json("no verification token");
        }
        const data = jwt.verify(req.body.token, process.env.TOKEN_KEY);
        const user = await userModels.findById(data._id);
        user.isEmailVerified = true;
        await user.save();
        return res.status(200).json("account verified");
    } catch (err) {
        return res.status(500).json(err);
    }
};

const forgotPassword = async(req, res) => {
    try {
        const userExist = await userModels.findOne({ email: req.body.email });
        if (!userExist)
            return res.status(200).json({ message: "if ur email valid check your inbox to reset password " });
        const token = jwt.sign({ email: userExist.email },
            process.env.TOKEN_KEY, {
                expiresIn: "1h",
            }
        );
        await transporter.sendMail({
            from: "wattpad@clone-wattpad.com",
            to: savedUser.email,
            subject: "reset password",
            body: `<p>${token}</p>`,
        })
        return res.status(200).json({ message: "if ur email valid check your inbox to reset password " });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const resetPassword = async(req, res) => {
    try {
        if (!req.body.token) {
            return res.status(403).json("no verificarion token provided");
        }
        const data = jwt.verify(req.body.token, process.env.TOKEN_KEY);
        const user = await userModels.findOne({ email: data.email });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "your password was changed" });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.login = login;
module.exports.register = register;
module.exports.verifyEmail = verifyEmail;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;